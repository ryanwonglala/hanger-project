const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Submission = require('../models/Submission');
const Feedback = require('../models/Feedback');
const { authenticate, generateToken } = require('../middleware/auth');
const { analyzeHighFrequencyWords } = require('../utils/wordAnalysis');

// 验证结果处理
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 1. 管理员登录
router.post('/login', [
  body('username').notEmpty().withMessage('用户名不能为空'),
  body('password').notEmpty().withMessage('密码不能为空'),
  validate
], async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找管理员
    const admin = await Admin.findOne({ username, isActive: true });
    
    if (!admin) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 验证密码
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 更新最后登录时间
    admin.lastLogin = new Date();
    await admin.save();

    // 生成JWT令牌
    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ error: '登录失败' });
  }
});

// 2. 获取所有问卷提交 (需要认证)
router.get('/submissions', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Submission.countDocuments();
    const submissions = await Submission
      .find()
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: submissions,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('获取提交记录失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 3. 获取单个提交详情
router.get('/submissions/:id', authenticate, [
  param('id').isMongoId(),
  validate
], async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ error: '提交记录不存在' });
    }

    res.json({ success: true, data: submission });
  } catch (error) {
    console.error('获取提交详情失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 4. 更新问卷提交数据
router.put('/submissions/:id', authenticate, [
  param('id').isMongoId(),
  validate
], async (req, res) => {
  try {
    const { demographics, answers, isValid, notes } = req.body;

    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ error: '提交记录不存在' });
    }

    // 更新字段
    if (demographics) submission.demographics = demographics;
    if (answers) submission.answers = answers;
    if (typeof isValid === 'boolean') submission.isValid = isValid;
    if (notes !== undefined) submission.notes = notes;

    await submission.save();

    res.json({
      success: true,
      message: '更新成功',
      data: submission
    });
  } catch (error) {
    console.error('更新提交失败:', error);
    res.status(500).json({ error: '更新失败' });
  }
});

// 5. 删除问卷提交
router.delete('/submissions/:id', authenticate, [
  param('id').isMongoId(),
  validate
], async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ error: '提交记录不存在' });
    }

    // 同时删除相关的反馈
    await Feedback.deleteMany({ submissionId: req.params.id });

    res.json({
      success: true,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除提交失败:', error);
    res.status(500).json({ error: '删除失败' });
  }
});

// 6. 获取所有反馈（含审核状态）
router.get('/feedback', authenticate, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = status ? { status } : {};
    
    const total = await Feedback.countDocuments(query);
    const feedbacks = await Feedback
      .find(query)
      .populate('submissionId', 'demographics submittedAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: feedbacks,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('获取反馈失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 7. 更新反馈审核状态
router.put('/feedback/:id/status', authenticate, [
  param('id').isMongoId(),
  body('status').isIn(['pending', 'approved', 'rejected']),
  validate
], async (req, res) => {
  try {
    const { status, reviewNote, displayOrder } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ error: '反馈不存在' });
    }

    feedback.status = status;
    feedback.reviewedBy = req.admin._id;
    feedback.reviewedAt = new Date();
    
    if (reviewNote) feedback.reviewNote = reviewNote;
    if (displayOrder !== undefined) feedback.displayOrder = displayOrder;

    await feedback.save();

    res.json({
      success: true,
      message: '审核状态已更新',
      data: feedback
    });
  } catch (error) {
    console.error('更新审核状态失败:', error);
    res.status(500).json({ error: '更新失败' });
  }
});

// 8. 批量审核反馈
router.post('/feedback/batch-review', authenticate, [
  body('ids').isArray(),
  body('status').isIn(['approved', 'rejected']),
  validate
], async (req, res) => {
  try {
    const { ids, status, reviewNote } = req.body;

    const result = await Feedback.updateMany(
      { _id: { $in: ids } },
      {
        $set: {
          status,
          reviewedBy: req.admin._id,
          reviewedAt: new Date(),
          ...(reviewNote && { reviewNote })
        }
      }
    );

    res.json({
      success: true,
      message: `成功审核 ${result.modifiedCount} 条反馈`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('批量审核失败:', error);
    res.status(500).json({ error: '批量审核失败' });
  }
});

// 9. 获取统计分析数据（仪表盘）
router.get('/dashboard/stats', authenticate, async (req, res) => {
  try {
    // 总提交数
    const totalSubmissions = await Submission.countDocuments();
    
    // 今日提交数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySubmissions = await Submission.countDocuments({
      submittedAt: { $gte: today }
    });

    // 反馈统计
    const feedbackStats = await Feedback.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const feedbackByStatus = {};
    feedbackStats.forEach(stat => {
      feedbackByStatus[stat._id] = stat.count;
    });

    // 最近7天趋势
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentTrend = await Submission.aggregate([
      {
        $match: {
          submittedAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // 高频词分析
    const allFeedbacks = await Feedback.find({ status: 'approved' });
    const texts = allFeedbacks.map(f => f.content);
    const keywords = analyzeHighFrequencyWords(texts, 2, 3);

    res.json({
      success: true,
      stats: {
        totalSubmissions,
        todaySubmissions,
        feedbackByStatus,
        recentTrend,
        topKeywords: Object.entries(keywords).slice(0, 10)
      }
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({ error: '获取统计数据失败' });
  }
});

// 10. 验证token有效性
router.get('/verify', authenticate, (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      role: req.admin.role
    }
  });
});

module.exports = router;