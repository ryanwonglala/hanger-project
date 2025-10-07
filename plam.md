AI 编码提示词：交互式网页问卷后端及数据可视化系统

1. 项目概述 (Project Overview)

应用名称: 交互式网页问卷数据后端系统

核心目标: 为一个已完成前端开发的静态网页问卷，构建一个功能完整的后端服务。该后端需实现数据收集、存储、分析、可视化，并通过 API 为前端提供实时数据反馈，以增强用户互动性。

目标用户:

问卷参与者 (访客): 访问网页、填写并提交问卷，并能看到实时的趣味性数据统计。

管理员 (您): 通过安全的后台登录，查看、管理和分析所有收集到的问卷数据。

关键特性列表:

问卷数据提交: 接收并安全存储前端发送的问卷数据。

管理员安全认证: 提供账号密码登录的后台仪表盘。

后台数据可视化:

统计总参与人数。

以饼图展示核心用户画像 (如年龄, 性别, 职业)。

以柱状图展示各选择题选项的占比。

对开放题进行中文分词，统计高频词 (2个字，出现3次以上) 并以饼图展示。

数据管理: 管理员能够查看所有提交的原始问卷，并拥有修改数据的权限。

前端实时交互:

在问卷首页以“计数板”样式展示总参与人数。

用户选择选项后，该选项条动态变为“进度条”显示选择占比。

在问卷末尾展示一个经过管理员审核的“黑板墙”，显示精选的开放式回答。

内容审核: 管理员可以审核开放式回答，决定是否在“黑板墙”上公开显示。

2. 模块逐步分解 (Step-by-step Module Breakdown)

模块一: 后端 API 服务 (The Brain)

这是整个系统的核心，负责处理所有数据逻辑。

API 端点设计 (API Endpoints):

POST /api/submit: 数据提交。接收前端发来的 JSON 格式问卷数据，验证后存入数据库。

GET /api/stats/total: 获取总人数。返回一个 JSON 对象，如 { "totalParticipants": 123 }。

GET /api/stats/demographics: 获取画像数据。返回用于生成饼图的数据，如 { "gender": {"男": 60, "女": 40}, "age": {"20-30": 50, "30-40": 30} }。

GET /api/results/question/:id: 获取单题统计。根据问题 ID，返回各选项的选择人数或百分比。

GET /api/feedback/public: 获取公开反馈。返回所有被管理员审核通过的开放式回答，用于“黑板墙”。

POST /api/admin/login: 管理员登录。接收用户名和密码，成功后返回一个用于后续验证的 Token。

GET /api/admin/submissions: (需认证) 获取所有问卷提交的列表。

PUT /api/admin/submissions/:id: (需认证) 更新指定 ID 的问卷数据。

GET /api/admin/feedback: (需认证) 获取所有开放式回答及其审核状态。

PUT /api/admin/feedback/:id/status: (需认证) 更新指定反馈的状态（例如 { "status": "approved" }）。

关键逻辑实现 - 高频词分析 (Pseudo-code):

function analyzeOpenEndedFeedback():
  all_feedback_texts = database.findAllOpenEndedAnswers()
  word_counts = {}
  // 使用中文分词库 (如 node-jieba)
  for text in all_feedback_texts:
    words = segment(text) // 分词
    for word in words:
      if length(word) == 2:
        word_counts[word] = (word_counts[word] or 0) + 1

  high_frequency_words = {}
  for word, count in word_counts.items():
    if count >= 3:
      high_frequency_words[word] = count

  return high_frequency_words
模块二: 前端集成 (Connecting to the existing UI)

修改您已有的前端 HTML/JavaScript 文件，使其能够与后端 API 通信。

示例: 页面加载时获取总人数

JavaScript
document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/stats/total')
    .then(response => response.json())
    .then(data => {
      // 假设你有一个 id 为 'participant-counter' 的元素
      document.getElementById('participant-counter').textContent = data.totalParticipants;
    });
});
示例: 用户选择选项后获取占比

JavaScript
function handleOptionSelect(questionId, optionValue) {
  // 当用户点击一个选项时调用
  fetch(`/api/results/question/${questionId}`)
    .then(response => response.json())
    .then(data => {
      // data 结构应为 { "optionA": 45, "optionB": 30, ... }
      const percentage = data[optionValue];
      // 在这里更新你的 UI，将选项条变为进度条并显示 percentage
    });
}
示例: 提交整个问卷

JavaScript
const form = document.getElementById('survey-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => {
    // 提交成功后，跳转到“黑板墙”页面或显示感谢信息
  });
});
3. 优先顺序 (Priority Order)

建议按以下步骤进行开发，从核心功能到完善功能。

第一阶段 (MVP):

搭建 Node.js + Express 后端服务器框架。

设计并连接 MongoDB 数据库 Schema。

实现 POST /api/submit 接口，能够成功接收并存储数据。

修改前端，使其能将数据成功提交到此接口。

第二阶段 (管理员核心功能):

实现管理员登录 (/api/admin/login) 和认证机制。

创建后台页面，实现 GET /api/admin/submissions，以简单表格形式展示所有提交的数据。

第三阶段 (前端实时交互):

实现所有 /api/stats/... 和 /api/results/... 的只读接口。

在前端集成“计数板”和“选项进度条”功能。

第四阶段 (高级功能与审核):

实现“黑板墙”相关接口 (/api/feedback/...)。

在后台管理系统中加入内容审核界面。

在前端问卷末尾或单独页面上展示“黑板墙”。

实现后台的数据修改和高频词分析图表功能。

4. UI 设计 (UI Design)

后台仪表盘 (Admin Dashboard):

布局: 采用经典的左侧导航栏 + 右侧主内容区的布局。导航栏包含“主页”、“问卷管理”、“反馈审核”等链接。

组件:

在主页使用“卡片式”设计，每个卡片承载一个图表（总人数、性别饼图、高频词饼图等）。

“问卷管理”页使用功能强大的数据表格，支持排序、搜索和分页。每行数据后有“编辑”按钮。

“反馈审核”页使用列表展示每条开放性回答，并附有“通过”和“拒绝”按钮。

前端交互组件:

计数板: 在页面顶部设计一个醒目的区域，数字可以使用动画效果，从0滚动到实际参与人数。

进度条选项: 当用户选择后，选项的背景色平滑地延展至相应百分比的宽度，同时在右侧显示百分比数字。

黑板墙: 使用 CSS Grid 布局。每个反馈都放在一个类似便利贴的卡片上，可以给卡片一个微小的、随机的旋转角度 (transform: rotate(-2deg);)，使其看起来更自然、生动。

5. 技术栈选择 (Technology Stack Selection)

前端: 您已有的 HTML, CSS, JavaScript。

后端: Node.js + Express.js 框架。

理由: 使用 JavaScript，与前端语言统一，降低了学习和开发成本。生态系统成熟，非常适合构建高效的 API 服务。

数据库: MongoDB 配合 Mongoose (ODM)。

理由: 其灵活的文档模型非常适合存储结构可能不固定的问卷数据。Mongoose 库能极大地简化数据库操作。

管理员认证: JWT (JSON Web Tokens)。

理由: 无状态、安全、行业标准。非常适合在前后端分离的架构中进行用户认证。

中文分词库: node-jieba。

理由: 针对开放题的高频词统计需求，这是一个成熟可靠的 Node.js 中文分词解决方案。

数据可视化库 (后台): Chart.js 或 ECharts。

理由: 轻量、易用，可以轻松在后台管理页面中生成各种动态图表。

部署建议: Vercel 或 Heroku。

理由: 它们都提供慷慨的免费套餐，能与您的 GitHub 仓库无缝集成，实现自动化部署。这解决了 GitHub Pages 无法运行后端程序的限制，并极大地简化了上线流程。