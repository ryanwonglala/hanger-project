// API配置
const API_CONFIG = {
    // 🔧 开发阶段：临时硬编码为 localhost
    // 部署时再修改为自动检测
    BASE_URL: 'https://survey-backend-beta.vercel.app',
    
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
    // survey-frontend/config/api.js

async request(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    // 自动从 localStorage 获取 token
    const token = localStorage.getItem('admin_token');

    // 准备默认的 headers
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    // 如果 token 存在，就自动添加到 headers 中
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            // 先展开 options，再覆盖 headers，确保认证信息总是被正确添加
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers, // 也允许在调用时传入额外的 header
            },
        });

        if (!response.ok) {
            // 抛出更明确的错误
            throw new Error(`HTTP ${response.status}`);
        }

        // 优雅地处理可能没有返回内容的成功请求 (例如 DELETE)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return; // 如果不是 JSON，则不返回任何内容

    } catch (error) {
        console.error(`API请求失败于 ${endpoint}:`, error.message);
        // 如果是认证错误，自动触发登出
        if (error.message.includes('401')) {
            // 检查这是否是 admin 页面
            if (window.location.pathname.includes('admin.html')) {
                // 避免在非 admin 页面意外清除 token
                localStorage.removeItem('admin_token');
                window.location.hash = '';
                window.location.reload(); // 强制刷新到登录页
            }
        }
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
