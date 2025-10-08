// API配置
const API_CONFIG = {
    // 🔧 开发阶段：临时硬编码为 localhost
    // 部署时再修改为自动检测
    BASE_URL: 'https://hanger-project.vercel.app',
    
    // 生产环境配置（暂时不用）
    // BASE_URL: window.location.hostname === 'localhost' 
    //     ? 'http://localhost:3000' 
    //     : 'https://your-backend.vercel.app',
    
    ENDPOINTS: {
        // 公共接口
        SUBMIT: '/api/submit',
        STATS_TOTAL: '/api/stats/total',
        STATS_DEMOGRAPHICS: '/api/stats/demographics',
        QUESTION_RESULTS: '/api/results/question',
        FEEDBACK_PUBLIC: '/api/feedback/public',
        KEYWORDS: '/api/stats/keywords',
        
        // 管理员接口（暂时不用）
        ADMIN_LOGIN: '/api/admin/login',
        ADMIN_SUBMISSIONS: '/api/admin/submissions'
    }
};

// API工具函数
const API = {
    /**
     * 通用请求方法
     */
    async request(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API请求失败:', error);
            throw error;
        }
    },
    
    /**
     * 获取总参与人数
     */
    async getTotalParticipants() {
        try {
            const data = await this.request(API_CONFIG.ENDPOINTS.STATS_TOTAL);
            return data.totalParticipants || 0;
        } catch (error) {
            console.error('获取参与人数失败:', error);
            return 0;
        }
    },
    
    /**
     * 提交问卷数据
     */
    async submitSurvey(surveyData) {
        return await this.request(API_CONFIG.ENDPOINTS.SUBMIT, {
            method: 'POST',
            body: JSON.stringify(surveyData)
        });
    },
    
    /**
     * 获取单题统计结果
     */
    async getQuestionResults(questionId) {
        try {
            const data = await this.request(`${API_CONFIG.ENDPOINTS.QUESTION_RESULTS}/${questionId}`);
            return data.results || {};
        } catch (error) {
            console.error('获取题目统计失败:', error);
            return {};
        }
    },
    
    /**
     * 获取用户画像统计
     */
    async getDemographics() {
        try {
            return await this.request(API_CONFIG.ENDPOINTS.STATS_DEMOGRAPHICS);
        } catch (error) {
            console.error('获取画像数据失败:', error);
            return {};
        }
    },
    
    /**
     * 获取高频词
     */
    async getKeywords(wordLength = 2, minFrequency = 3) {
        try {
            const data = await this.request(
                `${API_CONFIG.ENDPOINTS.KEYWORDS}?length=${wordLength}&minFreq=${minFrequency}`
            );
            return data.keywords || {};
        } catch (error) {
            console.error('获取高频词失败:', error);
            return {};
        }
    },
    
    /**
     * 获取公开反馈（黑板墙）
     */
    async getPublicFeedback(limit = 50) {
        try {
            const data = await this.request(
                `${API_CONFIG.ENDPOINTS.FEEDBACK_PUBLIC}?limit=${limit}`
            );
            return data.feedbacks || [];
        } catch (error) {
            console.error('获取公开反馈失败:', error);
            return [];
        }
    }
};

// 导出配置和API对象
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, API };
}
