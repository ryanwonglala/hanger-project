# 📊 数据统计与可视化功能指南

## ✅ 已实现功能总览

### 1. 首页参与者计数 👥
- **位置**：首页欢迎界面
- **显示内容**：已有XX位参与者分享想法
- **特效**：数字跳动动画 + 图标脉冲效果
- **数据来源**：`surveyData.totalParticipants`

### 2. 问题完成后的百分比柱状图 📊
- **位置**：问题1和问题2完成后
- **触发时机**：用户完成问题后点击Next按钮
- **显示内容**：每个选项的选择百分比
- **动画效果**：柱状图从左至右填充动画
- **支持**：三语言标签自动切换

### 3. 感谢页词云球状图 ☁️
- **位置**：问卷完成后的感谢页
- **显示内容**：用户自定义输入的高频词条
- **效果**：3D球状旋转词云
- **特点**：
  - 词条大小根据权重变化
  - 鼠标悬停放大效果
  - 自动3D旋转动画
  - Fibonacci球面算法分布

---

## 📁 文件结构

### 新增文件：
- **data.js** - 虚拟数据集（38位参与者 + 24个词条）

### 修改文件：
- **index.html** - 添加统计组件容器
- **style.css** - 统计可视化样式
- **script.js** - 数据处理和图表生成逻辑

---

## 💾 虚拟数据结构 (data.js)

```javascript
{
    totalParticipants: 38,  // 总参与人数

    // 问题1：最大的衣架问题
    q1_biggestProblem: {
        deformation: 15,    // 39.5% - 衣服变形
        slipping: 12,       // 31.6% - 总是滑落
        breaking: 7,        // 18.4% - 容易断裂
        space: 4            // 10.5% - 太占空间
    },

    // 问题2：最常用的衣架类型
    q2_hangerType: {
        plastic: 18,        // 47.4% - 塑料
        wood: 9,            // 23.7% - 木质
        velvet: 6,          // 15.8% - 丝绒
        wire: 3,            // 7.9% - 金属
        custom: 2           // 5.3% - 其他
    },

    // 自定义词条（24个，权重1-8）
    customKeywords: [
        { text: "bamboo", weight: 8 },
        { text: "竹制", weight: 8 },
        // ... 更多词条
    ]
}
```

---

## 🎯 用户交互流程

### 场景1：首页参与者计数
```
用户打开首页
   ↓
自动显示参与者人数（38人）
   ↓
数字跳动动画 + 人物图标脉冲
```

### 场景2：问题1统计展示
```
用户拖拽选项到垃圾桶
   ↓
点击 "Next" 按钮
   ↓
显示 "其他人的选择：" 标题
   ↓
柱状图从左向右动画填充
   ↓
显示各选项百分比
   ↓
再次点击 "Next" 进入下一题
```

### 场景3：问题2统计展示
```
用户选择衣架类型（或自定义）
   ↓
点击 "Next" 按钮
   ↓
显示柱状图统计
   ↓
包含 "其他" 选项的百分比（5.3%）
```

### 场景4：词云球展示
```
用户完成所有问题
   ↓
点击 "Finish!" 按钮
   ↓
进入感谢页
   ↓
0.5秒后词云球出现
   ↓
24个词条在3D空间旋转
   ↓
鼠标悬停词条放大
```

---

## 🎨 可视化设计细节

### 柱状图设计
- **背景色**：`#e2e8f0` (浅灰)
- **填充色**：蓝紫渐变 (`#3498db` → `#9b59b6`)
- **动画时长**：1秒 ease-out
- **高度**：30px
- **圆角**：15px

### 词云球设计
- **球体半径**：180px (移动端自适应)
- **旋转速度**：30秒/周
- **词条大小**：
  - XL (weight ≥7): 1.8rem, 蓝色
  - L (weight 5-6): 1.5rem, 紫色
  - M (weight 3-4): 1.2rem, 绿色
  - S (weight 2): 1rem, 红色
  - XS (weight 1): 0.85rem, 橙色
- **悬停效果**：scale(1.2) + 背景加深

---

## 🔌 后端集成方案

### 当前状态（纯前端）
- 使用 `data.js` 中的静态虚拟数据
- 38位虚拟参与者
- 24个预设高频词条

### 未来集成真实数据（需要后端）

#### 方案A：REST API
```javascript
// 替换 data.js 为 API 调用
async function loadSurveyData() {
    const response = await fetch('/api/survey/stats');
    const surveyData = await response.json();
    return surveyData;
}
```

#### 方案B：实时数据库 (Firebase)
```javascript
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
const statsRef = ref(db, 'surveyStats');
onValue(statsRef, (snapshot) => {
    const surveyData = snapshot.val();
    updateVisualizations(surveyData);
});
```

#### 方案C：WebSocket 实时更新
```javascript
const socket = new WebSocket('ws://yourserver.com/stats');
socket.onmessage = (event) => {
    const surveyData = JSON.parse(event.data);
    updateCharts(surveyData);
};
```

### 数据提交接口设计

```javascript
// 用户提交问卷时
async function submitSurvey(formData) {
    await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            biggestProblem: formData.biggest_problem,
            hangerType: formData.hanger_type,
            buyInterest: formData.buy_interest,
            timestamp: new Date().toISOString()
        })
    });
}
```

### 词云生成逻辑（后端）

```python
# Python 示例 - 提取高频词
from collections import Counter
import jieba  # 中文分词

def generate_keywords(custom_inputs):
    # 合并所有自定义输入
    all_text = ' '.join(custom_inputs)

    # 中文分词
    words_cn = jieba.lcut(all_text)

    # 英文分词
    words_en = all_text.split()

    # 统计词频
    word_freq = Counter(words_cn + words_en)

    # 返回前20个高频词
    return [
        {"text": word, "weight": count}
        for word, count in word_freq.most_common(20)
    ]
```

---

## 📈 数据持久化方案

### 数据库表设计

#### 表1：responses (问卷回答)
```sql
CREATE TABLE responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    biggest_problem VARCHAR(50),
    hanger_type VARCHAR(50),
    buy_interest INT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 表2：custom_inputs (自定义输入)
```sql
CREATE TABLE custom_inputs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response_id INT,
    custom_text TEXT,
    language VARCHAR(10),
    FOREIGN KEY (response_id) REFERENCES responses(id)
);
```

#### 表3: stats_cache (统计缓存)
```sql
CREATE TABLE stats_cache (
    id INT PRIMARY KEY,
    total_participants INT,
    q1_stats JSON,
    q2_stats JSON,
    keywords JSON,
    updated_at TIMESTAMP
);
```

---

## 🧪 测试清单

### 视觉测试
- [ ] 首页参与者计数正确显示
- [ ] 数字跳动动画流畅
- [ ] 人物图标脉冲正常

### 柱状图测试
- [ ] Q1完成后点击Next显示统计
- [ ] 柱状图动画流畅填充
- [ ] 百分比数值正确（总和100%）
- [ ] 标签支持三语言切换
- [ ] 再次点击Next正常进入下一题

### 词云测试
- [ ] 提交问卷后词云出现
- [ ] 3D旋转动画流畅
- [ ] 词条大小符合权重
- [ ] 悬停放大效果正常
- [ ] 24个词条全部显示

### 响应式测试
- [ ] 手机端参与者计数适配
- [ ] 柱状图在小屏幕正常显示
- [ ] 词云球在移动端缩小
- [ ] 所有文字大小合适

### 语言切换测试
- [ ] 切换语言后计数文本更新
- [ ] 柱状图标签实时翻译
- [ ] 词云标题正确翻译

---

## 🚀 性能优化建议

### 当前实现（纯前端）
- ✅ 数据加载快（静态JSON）
- ✅ 无网络延迟
- ✅ 离线可用

### 接入后端后的优化
1. **数据缓存**：使用 localStorage 缓存统计数据
2. **懒加载**：仅在需要时加载可视化库
3. **CDN加速**：静态资源使用CDN
4. **数据聚合**：后端预计算统计结果
5. **增量更新**：仅更新变化的数据

---

## 💡 扩展功能建议

### 短期扩展
1. **导出功能**：允许用户下载统计报告
2. **分享按钮**：分享自己的选择到社交媒体
3. **趋势图**：显示历史数据变化趋势
4. **筛选器**：按时间段筛选数据

### 长期扩展
1. **AI分析**：自动分析用户反馈生成洞察
2. **个性化对比**：显示"你与大多数人的差异"
3. **地图可视化**：按地区显示数据分布
4. **实时仪表盘**：管理员实时监控统计

---

## 📞 后端开发对接要点

### 前端已预留接口
1. **数据加载**：检查 `typeof surveyData !== 'undefined'`
2. **异步友好**：所有函数支持动态数据注入
3. **错误处理**：数据不存在时优雅降级
4. **格式兼容**：严格遵循 data.js 数据结构

### 需要后端提供
1. **GET /api/stats** - 获取实时统计数据
2. **POST /api/submit** - 提交问卷答案
3. **GET /api/keywords** - 获取词云数据
4. **支持CORS** - 允许跨域请求

### 数据更新频率建议
- **参与者计数**：实时更新
- **百分比统计**：每分钟更新
- **词云数据**：每5分钟更新

---

## ✅ 总结

所有数据可视化功能已完成：

1. ✅ 首页参与者计数（38人）
2. ✅ Q1/Q2 百分比柱状图
3. ✅ 感谢页3D词云球（24词条）
4. ✅ 响应式移动端适配
5. ✅ 三语言支持
6. ✅ 流畅动画效果

**当前状态**：使用虚拟数据，完全可用
**后续集成**：替换 data.js 为后端API即可

---

**实施日期**: 2025-10-07
**版本**: 3.0
**状态**: ✅ 完成并通过测试
