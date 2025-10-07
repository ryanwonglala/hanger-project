const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // 用户画像数据
  demographics: {
    gender: {
      type: String,
      enum: ['男', '女', '其他', '不愿透露'],
      required: true
    },
    age: {
      type: String,
      enum: ['18岁以下', '18-25', '26-30', '31-40', '41-50', '50岁以上'],
      required: true
    },
    occupation: {
      type: String,
      required: true
    }
  },

  // 问卷答案 (使用灵活的结构存储不同题目的答案)
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },

  // 开放式回答
  openEndedAnswers: [{
    questionId: String,
    questionText: String,
    answer: String
  }],

  // 提交信息
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String,

  // 数据状态
  isValid: {
    type: Boolean,
    default: true
  },
  notes: String // 管理员备注
}, {
  timestamps: true
});

// 索引优化
submissionSchema.index({ submittedAt: -1 });
submissionSchema.index({ 'demographics.gender': 1 });
submissionSchema.index({ 'demographics.age': 1 });

module.exports = mongoose.model('Submission', submissionSchema);