const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Submission = require('../models/Submission');
const Feedback = require('../models/Feedback'); // 引入Feedback模型
const { authenticate, generateToken } = require('../middleware/auth');

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
      .limit(limit)
      .select('submittedAt language'); // 只选择列表需要展示的字段

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

// 4. 获取仪表盘统计数据
router.get('/dashboard/stats', authenticate, async (req, res) => {
  try {
    const totalSubmissions = await Submission.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySubmissions = await Submission.countDocuments({ submittedAt: { $gte: today } });
    
    res.json({
      success: true,
      stats: { totalSubmissions, todaySubmissions }
    });
  } catch (error) {
    res.status(500).json({ error: '获取统计数据失败' });
  }
});

// 5. 获取所有问题的数据统计，用于图表
router.get('/stats/all-questions', authenticate, async (req, res) => {
    try {
        const questionKeys = [
            'q1_dampness', 'q2_preference', 'q3a_reasons', 'q4_practicality',
            'q6_material', 'q7_load', 'q8_weight', 'q9_lifespan',
            'q10_price', 'q11_recyclable'
        ];

        const facetPipeline = {};
        questionKeys.forEach(key => {
            facetPipeline[key] = [
                { '$unwind': `$answers.${key}` },
                { '$group': { _id: `$answers.${key}`, count: { '$sum': 1 } } }
            ];
        });

        const results = await Submission.aggregate([{ '$facet': facetPipeline }]);
        
        const formattedResults = {};
        if (results[0]) {
            for (const [key, value] of Object.entries(results[0])) {
                formattedResults[key] = value.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {});
            }
        }

        res.json({ success: true, data: formattedResults });

    } catch (error) {
        console.error("获取图表数据失败:", error);
        res.status(500).json({ error: '获取图表数据失败' });
    }
});


// 6. 验证token有效性
router.get('/verify', authenticate, (req, res) => {
  res.json({
    success: true,
    admin: { id: req.admin._id, username: req.admin.username, role: req.admin.role }
  });
});

// 7. 清空所有数据 (新功能)
router.delete('/submissions/all', authenticate, async (req, res) => {
  try {
    const submissionResult = await Submission.deleteMany({});
    const feedbackResult = await Feedback.deleteMany({});

    res.json({
      success: true,
      message: '所有问卷数据已成功清空。',
      deletedSubmissions: submissionResult.deletedCount,
      deletedFeedbacks: feedbackResult.deletedCount
    });
  } catch (error) {
    console.error('清空数据失败:', error);
    res.status(500).json({ error: '服务器错误，清空数据失败。' });
  }
});

module.exports = router;

