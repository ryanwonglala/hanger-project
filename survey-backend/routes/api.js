const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const Feedback = require('../models/Feedback');
const { analyzeWordsByLength } = require('../utils/wordAnalysis');

// 验证结果处理中间件
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 1. 提交问卷数据
router.post('/submit', [
  body('demographics.gender').notEmpty().withMessage('性别不能为空'),
  body('demographics.age').notEmpty().withMessage('年龄不能为空'),
  body('demographics.occupation').notEmpty().withMessage('职业不能为空'),
  body('answers').isObject().withMessage('答案必须是对象格式'),
  body('language').notEmpty().withMessage('语言环境不能为空'),
  validate
], async (req, res) => {
  try {
    const { demographics, answers, openEndedAnswers, language } = req.body;

    const submission = new Submission({
      demographics,
      answers,
      openEndedAnswers: openEndedAnswers || [],
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    await submission.save();

    if (openEndedAnswers && openEndedAnswers.length > 0) {
      const feedbackPromises = openEndedAnswers.map(item => {
        if (item.answer && item.answer.trim()) {
          return new Feedback({
            submissionId: submission._id,
            content: item.answer,
            questionId: item.questionId,
            questionText: item.questionText,
            language: language // 保存语言
          }).save();
        }
      });
      await Promise.all(feedbackPromises.filter(Boolean));
    }

    res.status(201).json({
      success: true,
      message: '问卷提交成功',
      submissionId: submission._id
    });
  } catch (error) {
    console.error('提交失败:', error);
    res.status(500).json({ error: '提交失败，请稍后重试' });
  }
});

// 2. 获取总参与人数
router.get('/stats/total', async (req, res) => {
  try {
    const totalParticipants = await Submission.countDocuments({ isValid: true });
    res.json({ totalParticipants });
  } catch (error) {
    console.error('获取总人数失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 3. 获取用户画像统计数据
router.get('/stats/demographics', async (req, res) => {
  try {
    const submissions = await Submission.find({ isValid: true });
    const genderStats = {}, ageStats = {}, occupationStats = {};

    submissions.forEach(sub => {
      const { gender, age, occupation } = sub.demographics;
      genderStats[gender] = (genderStats[gender] || 0) + 1;
      ageStats[age] = (ageStats[age] || 0) + 1;
      occupationStats[occupation] = (occupationStats[occupation] || 0) + 1;
    });

    res.json({ gender: genderStats, age: ageStats, occupation: occupationStats, total: submissions.length });
  } catch (error) {
    console.error('获取画像数据失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 4. 获取单题统计结果
router.get('/results/question/:questionId', [
  param('questionId').notEmpty(),
  validate
], async (req, res) => {
  try {
    const { questionId } = req.params;
    const submissions = await Submission.find({ isValid: true });

    const optionCounts = {};
    let totalAnswers = 0;

    submissions.forEach(sub => {
      const answer = sub.answers.get(questionId);
      if (answer != null) { // Use != null to catch both undefined and null
        totalAnswers++;
        if (Array.isArray(answer)) {
          answer.forEach(option => {
            optionCounts[option] = (optionCounts[option] || 0) + 1;
          });
        } else {
          optionCounts[answer] = (optionCounts[answer] || 0) + 1;
        }
      }
    });

    const results = {};
    Object.entries(optionCounts).forEach(([option, count]) => {
      results[option] = {
        count,
        percentage: totalAnswers > 0 ? ((count / totalAnswers) * 100).toFixed(1) : "0.0"
      };
    });

    res.json({ questionId, totalAnswers, results });
  } catch (error) {
    console.error('获取题目统计失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 5. 获取公开的反馈（黑板墙） - 已更新
router.get('/feedback/public', [
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
    query('lang').optional().isString().isIn(['en', 'zh-CN', 'zh-TW']),
    validate
], async (req, res) => {
  try {
    const { limit = 10, lang } = req.query;
    
    let query = { status: 'approved' };
    if (lang) {
        query.language = lang;
    }

    const feedbacks = await Feedback
      .find(query)
      .sort({ displayOrder: -1, createdAt: -1 })
      .limit(limit)
      .select('content');

    res.json({
      success: true,
      count: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('获取公开反馈失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});


// 6. 获取高频词统计
router.get('/stats/keywords', async (req, res) => {
  try {
    const wordLength = parseInt(req.query.length) || 2;
    const minFrequency = parseInt(req.query.minFreq) || 3;

    const feedbacks = await Feedback.find({ status: 'approved' });
    const texts = feedbacks.map(f => f.content);
    const keywords = analyzeWordsByLength(texts, wordLength, minFrequency);

    res.json({ success: true, keywords, totalFeedbacks: texts.length });
  } catch (error) {
    console.error('获取高频词失败:', error);
    res.status(500).json({ error: '分析失败' });
  }
});

module.exports = router;
