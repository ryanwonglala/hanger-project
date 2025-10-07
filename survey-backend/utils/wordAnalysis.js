const nodejieba = require('nodejieba');

/**
 * 分析开放式回答，提取高频词
 * @param {Array} feedbackTexts - 所有开放式回答的文本数组
 * @param {Number} minLength - 最小词长度 (默认2)
 * @param {Number} minFrequency - 最小出现次数 (默认3)
 * @returns {Object} 高频词及其出现次数
 */
function analyzeHighFrequencyWords(feedbackTexts, minLength = 2, minFrequency = 3) {
  const wordCounts = {};
  
  // 停用词列表（可以根据需要扩展）
  const stopWords = new Set([
    '的', '了', '是', '在', '我', '有', '和', '就', '不', '人', 
    '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去',
    '你', '会', '着', '没有', '看', '好', '自己', '这', '那'
  ]);

  // 对每个文本进行分词
  feedbackTexts.forEach(text => {
    if (!text || typeof text !== 'string') return;
    
    // 使用nodejieba进行中文分词
    const words = nodejieba.cut(text);
    
    words.forEach(word => {
      // 过滤条件：
      // 1. 词长度符合要求
      // 2. 不在停用词列表中
      // 3. 不是纯数字或标点符号
      if (word.length >= minLength && 
          !stopWords.has(word) && 
          !/^[\d\W]+$/.test(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });

  // 筛选出高频词
  const highFrequencyWords = {};
  Object.entries(wordCounts).forEach(([word, count]) => {
    if (count >= minFrequency) {
      highFrequencyWords[word] = count;
    }
  });

  // 按频率排序
  return Object.fromEntries(
    Object.entries(highFrequencyWords)
      .sort(([, a], [, b]) => b - a)
  );
}

/**
 * 获取指定长度的高频词
 * @param {Array} feedbackTexts - 文本数组
 * @param {Number} wordLength - 词的长度
 * @param {Number} minFrequency - 最小频率
 * @returns {Object} 高频词统计
 */
function analyzeWordsByLength(feedbackTexts, wordLength = 2, minFrequency = 3) {
  const wordCounts = {};
  const stopWords = new Set(['的', '了', '是', '在', '我', '有', '和', '就', '不', '人']);

  feedbackTexts.forEach(text => {
    if (!text || typeof text !== 'string') return;
    
    const words = nodejieba.cut(text);
    
    words.forEach(word => {
      if (word.length === wordLength && 
          !stopWords.has(word) && 
          !/^[\d\W]+$/.test(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });

  const result = {};
  Object.entries(wordCounts).forEach(([word, count]) => {
    if (count >= minFrequency) {
      result[word] = count;
    }
  });

  return Object.fromEntries(
    Object.entries(result).sort(([, a], [, b]) => b - a)
  );
}

module.exports = {
  analyzeHighFrequencyWords,
  analyzeWordsByLength
};