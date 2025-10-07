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
    const admin = await Admin.findOne({ username, isActive: true });
    if (!admin) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin._id);
    res.json({
      success: true,
      token,
      admin: { id: admin._id, username: admin.username, role: admin.role }
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
      pagination: { total, page, pages: Math.ceil(total / limit), limit }
    });
  } catch (error) {
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
    const submission = await Submission.findByIdAndUpdate(req.params.id, 
        { demographics, answers, isValid, notes },
        { new: true, runValidators: true }
    );
    if (!submission) {
      return res.status(404).json({ error: '提交记录不存在' });
    }
    res.json({ success: true, message: '更新成功', data: submission });
  } catch (error) {
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
    await Feedback.deleteMany({ submissionId: req.params.id });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    res.status(500).json({ error: '删除失败' });
  }
});

// 6. 获取所有反馈（聚合用户）
router.get('/feedback', authenticate, async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = status ? { status } : {};
    
    const feedbacks = await Feedback
      .find(query)
      .populate('submissionId', 'demographics submittedAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // 按 submissionId 聚合
    const groupedByUser = feedbacks.reduce((acc, feedback) => {
      if (!feedback.submissionId) return acc;
      const userId = feedback.submissionId._id.toString();
      if (!acc[userId]) {
        acc[userId] = {
          submission: feedback.submissionId,
          items: []
        };
      }
      acc[userId].items.push(feedback);
      return acc;
    }, {});

    const total = Object.keys(groupedByUser).length;

    res.json({
      success: true,
      data: Object.values(groupedByUser),
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)), limit: parseInt(limit) }
    });
  } catch (error) {
    console.error('获取反馈失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 7. 更新反馈审核状态
router.put('/feedback/:id/status', authenticate, [
  param('id').isMongoId(),
  body('status').isIn(['approved', 'rejected']),
  validate
], async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: '反馈不存在' });
    }
    feedback.status = status;
    feedback.reviewedBy = req.admin._id;
    feedback.reviewedAt = new Date();
    await feedback.save();
    res.json({ success: true, message: '审核状态已更新', data: feedback });
  } catch (error) {
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
    const { ids, status } = req.body;
    const result = await Feedback.updateMany(
      { _id: { $in: ids } },
      { $set: { status, reviewedBy: req.admin._id, reviewedAt: new Date() } }
    );
    res.json({ success: true, message: `成功审核 ${result.modifiedCount} 条反馈`, modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: '批量审核失败' });
  }
});

// 9. 获取统计分析数据（仪表盘）
router.get('/dashboard/stats', authenticate, async (req, res) => {
  try {
    const totalSubmissions = await Submission.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySubmissions = await Submission.countDocuments({ submittedAt: { $gte: today } });
    const feedbackStats = await Feedback.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
    const feedbackByStatus = feedbackStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});
    res.json({
      success: true,
      stats: { totalSubmissions, todaySubmissions, feedbackByStatus }
    });
  } catch (error) {
    res.status(500).json({ error: '获取统计数据失败' });
  }
});

// 10. 验证token有效性
router.get('/verify', authenticate, (req, res) => {
  res.json({
    success: true,
    admin: { id: req.admin._id, username: req.admin.username, role: req.admin.role }
  });
});

module.exports = router;
