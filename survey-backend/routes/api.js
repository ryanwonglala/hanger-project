const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const Feedback = require('../models/Feedback');
const { analyzeWordsByLength } = require('../utils/wordAnalysis');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 1. Submit survey data
router.post('/submit', [
  body('answers').isObject().withMessage('Answers must be an object'),
  body('language').notEmpty().withMessage('Language code is required'),
  validate
], async (req, res) => {
  try {
    const { answers, openEndedAnswers, language } = req.body;

    const submission = new Submission({
      answers,
      openEndedAnswers: openEndedAnswers || [],
      language,
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
            language: language
          }).save();
        }
      });
      await Promise.all(feedbackPromises.filter(Boolean));
    }

    res.status(201).json({
      success: true,
      message: 'Survey submitted successfully',
      submissionId: submission._id
    });
  } catch (error) {
    console.error('Submission failed:', error);
    res.status(500).json({ error: 'Submission failed, please try again later' });
  }
});

// 2. Get total participant count
router.get('/stats/total', async (req, res) => {
  try {
    const totalParticipants = await Submission.countDocuments({ isValid: true });
    res.json({ totalParticipants });
  } catch (error) {
    console.error('Failed to get total count:', error);
    res.status(500).json({ error: 'Failed to get data' });
  }
});

// 3. Get demographic stats (remains for potential future use)
router.get('/stats/demographics', async (req, res) => {
    // This route can remain for analyzing any data that does include demographics
    try {
        const submissions = await Submission.find({ isValid: true, 'demographics.gender': { $exists: true } });
        const genderStats = {}, ageStats = {}, occupationStats = {};

        submissions.forEach(sub => {
            const { gender, age, occupation } = sub.demographics;
            if(gender) genderStats[gender] = (genderStats[gender] || 0) + 1;
            if(age) ageStats[age] = (ageStats[age] || 0) + 1;
            if(occupation) occupationStats[occupation] = (occupationStats[occupation] || 0) + 1;
        });

        res.json({ gender: genderStats, age: ageStats, occupation: occupationStats, total: submissions.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get data' });
    }
});

// 4. Get stats for a single question
router.get('/results/question/:questionId', [
  param('questionId').notEmpty(),
  validate
], async (req, res) => {
  try {
    const { questionId } = req.params;
    // Use aggregation for better performance
    const results = await Submission.aggregate([
      { $match: { isValid: true } },
      { $project: { answer: `$answers.${questionId}` } },
      { $unwind: '$answer' },
      { $group: { _id: '$answer', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const totalAnswers = results.reduce((sum, item) => sum + item.count, 0);
    const formattedResults = {};
    results.forEach(item => {
        formattedResults[item._id] = {
            count: item.count,
            percentage: totalAnswers > 0 ? ((item.count / totalAnswers) * 100).toFixed(1) : "0.0"
        }
    });

    res.json({ questionId, totalAnswers, results: formattedResults });
  } catch (error) {
    console.error('Failed to get question stats:', error);
    res.status(500).json({ error: 'Failed to get data' });
  }
});

// 5. Get public feedback (for blackboard wall)
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
    res.json({ success: true, count: feedbacks.length, feedbacks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get data' });
  }
});

// 6. Get keyword stats
router.get('/stats/keywords', async (req, res) => {
    // ... This route remains unchanged
    try {
        const wordLength = parseInt(req.query.length) || 2;
        const minFrequency = parseInt(req.query.minFreq) || 3;
        const feedbacks = await Feedback.find({ status: 'approved' });
        const texts = feedbacks.map(f => f.content);
        const keywords = analyzeWordsByLength(texts, wordLength, minFrequency);
        res.json({ success: true, keywords, totalFeedbacks: texts.length });
    } catch (error) {
        res.status(500).json({ error: 'Analysis failed' });
    }
});

module.exports = router;
