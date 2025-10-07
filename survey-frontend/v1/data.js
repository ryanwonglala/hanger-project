// Mock data for visualization (30-40 participants)
// 虚拟数据用于可视化展示（30-40位参与者）

const surveyData = {
    // Total participants
    totalParticipants: 38,

    // Question 1: Biggest hanger problem
    q1_biggestProblem: {
        deformation: 15,    // 39.5%
        slipping: 12,       // 31.6%
        breaking: 7,        // 18.4%
        space: 4            // 10.5%
    },

    // Question 2: Hanger type most used
    q2_hangerType: {
        plastic: 18,        // 47.4%
        wood: 9,            // 23.7%
        velvet: 6,          // 15.8%
        wire: 3,            // 7.9%
        custom: 2           // 5.3% (other custom answers)
    },

    // Question 3: Buy interest (1-5 scale)
    q3_buyInterest: {
        1: 2,               // 5.3%
        2: 5,               // 13.2%
        3: 11,              // 28.9%
        4: 14,              // 36.8%
        5: 6                // 15.8%
    },

    // Custom input keywords from Q2 (when users select "Other")
    // 用户自定义输入的高频词条
    customKeywords: [
        { text: "bamboo", weight: 8 },
        { text: "竹制", weight: 8 },
        { text: "stainless steel", weight: 6 },
        { text: "不锈钢", weight: 6 },
        { text: "foldable", weight: 5 },
        { text: "可折叠", weight: 5 },
        { text: "clip", weight: 4 },
        { text: "夹子式", weight: 4 },
        { text: "padded", weight: 3 },
        { text: "加厚", weight: 3 },
        { text: "rotating", weight: 3 },
        { text: "旋转", weight: 3 },
        { text: "multi-tier", weight: 2 },
        { text: "多层", weight: 2 },
        { text: "heavy-duty", weight: 2 },
        { text: "加固", weight: 2 },
        { text: "space-saving", weight: 2 },
        { text: "省空间", weight: 2 },
        { text: "adjustable", weight: 1 },
        { text: "可调节", weight: 1 },
        { text: "leather", weight: 1 },
        { text: "皮革", weight: 1 }
    ]
};

// Function to calculate percentage
function calculatePercentage(value, total) {
    return ((value / total) * 100).toFixed(1);
}

// Function to get stats for a specific question
function getQuestionStats(questionKey) {
    const data = surveyData[questionKey];
    const total = surveyData.totalParticipants;
    const stats = [];

    for (let option in data) {
        stats.push({
            option: option,
            count: data[option],
            percentage: calculatePercentage(data[option], total)
        });
    }

    return stats;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { surveyData, calculatePercentage, getQuestionStats };
}
