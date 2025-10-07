const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  // 关联的问卷提交
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true
  },

  // 反馈内容
  content: {
    type: String,
    required: true,
    trim: true
  },

  // 问题信息
  questionId: String,
  questionText: String,

  // 审核状态
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // 审核信息
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  reviewedAt: Date,
  reviewNote: String,

  // 显示顺序 (用于黑板墙排序)
  displayOrder: {
    type: Number,
    default: 0
  },

  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 索引
feedbackSchema.index({ status: 1, displayOrder: -1 });
feedbackSchema.index({ submissionId: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);