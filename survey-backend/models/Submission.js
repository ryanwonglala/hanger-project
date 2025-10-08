const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // User profile data (now optional)
  demographics: {
    gender: String,
    age: String,
    occupation: String
  },

  // Survey answers (flexible structure)
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },

  // Open-ended answers
  openEndedAnswers: [{
    questionId: String,
    questionText: String,
    answer: String
  }],
  
  // Submission language
  language: String,

  // Submission info
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String,

  // Data status
  isValid: {
    type: Boolean,
    default: true
  },
  notes: String // Admin notes
}, {
  timestamps: true
});

// Index optimization
submissionSchema.index({ submittedAt: -1 });
submissionSchema.index({ 'demographics.age': 1 });

module.exports = mongoose.model('Submission', submissionSchema);
