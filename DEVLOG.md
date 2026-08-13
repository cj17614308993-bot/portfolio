# 开发日志 / DEVLOG

记录蔡杰个人作品集网站的完整开发历程、设计决策和迭代过程。

---

## 2026-08-12 · 项目启动与第一轮开发

### 需求确认

用户（蔡杰，比亚迪 3D 设计师，8 年经验）要求基于简历 PDF 和作品集 PPTX 从零搭建个人作品集网站：

- **技术栈**：React + Vite（明确要求）
- **风格**：暗色系、高级、克制、有科技感、不要像模板网站
- **展示端**：PC 端，版心约 1700px
- **目标**：先做可运行预览的基础版本，后续根据截图和参考网站继续优化

### 素材提取

从用户提供的原始文件中提取内容：

- **简历 PDF**：`蔡杰_17614308993_20260530.pdf`
  - 提取个人信息、工作经历、个人优势
  - 提取头像图片（戴眼镜自拍照，黑外套白衬衫）
- **作品集 PPTX**：`作品集20260812.pptx`（137MB，21 页，16:9）
  - 提取 21 页全部内容文案
  - 提取项目图片（Octane 渲染、HDRP、ADAS、360 全景、NOA 导航、硬表面建模等）
  - 提取视频素材（开机动画 1.9MB、UE4 实机录屏 01.mp4 9.6MB、02.mp4 20.6MB）

### 第一轮实现内容

**项目初始化**
- 创建 Vite + React 项目，配置 `host:true, port:5173`
- 引入 Google Fonts：Space Grotesk（标题）+ Inter（正文）
- 建立 CSS 变量体系（暗色配色、蓝青强调色、字体、间距）

**页面模块（5 大区块）**
1. **Navbar**：固定顶部，毛玻璃效果，胶囊导航（中英双行），CJ logo，联系按钮，滚动高亮当前区块
2. **Hero**：全屏视频背景 + 渐变遮罩 + 网格，大标题两行（第二行渐变），双 CTA 按钮，滚动指示器
3. **About**：左侧头像名片 + 右侧介绍/数据/履历时间轴，grid 布局 440px + 1fr
4. **Projects**：8 个项目大卡片左右交替布局，含序号/分类/描述/标签/指标
5. **Strengths**：6 项优势卡片，3 列网格
6. **Contact**：整屏收尾，大标题 + 联系卡片 + CTA + 页脚

**图片处理**
- 用 Pillow 压缩所有项目图为 webp，最长边 2400px，quality 82
- 头像压缩至 720x720
- Hero 视频使用开机动画（1.9MB，体积最小）

**项目迁移**
- 初始创建在 C 盘，后按用户要求迁移到 `D:\work\portfolio`
- C 盘旧目录已删除

### 部署

- 初始化 Git 仓库，远程 `origin` 指向 GitHub
- 首次部署 Vercel 失败：node_modules 被提交，Linux 上 vite 无执行权限（exit 127）
- 修复：创建 `.gitignore`，`git rm -r --cached node_modules`，重新 commit push
- **部署成功**（用户确认）

---

## 2026-08-13 · 第二轮交互优化

### 用户反馈

"部署成功，让我们继续优化页面"

### 优化目标

在第一轮基础视觉之上，增加交互细节和动效，提升高级感和完成度。

### 新增组件

| 组件 | 路径 | 功能 |
|------|------|------|
| `ScrollProgress` | `src/components/ScrollProgress.jsx` | 顶部滚动进度条，蓝青渐变 + 发光 |
| `BackToTop` | `src/components/BackToTop.jsx` | 回到顶部浮动按钮，滚动 >600px 显示 |
| `Lightbox` | `src/components/Lightbox.jsx` | 图片灯箱，点击项目图放大查看 |
| `useCountUp` | `src/hooks/useCountUp.js` | 数字滚动动画 hook，进入视口触发 |

### 更新组件

- **App.jsx**：引入 ScrollProgress、BackToTop、噪点质感层
- **Hero.jsx**：新增鼠标跟随光晕（`onMouseMove` 更新 radial-gradient 位置）
- **About.jsx**：StatItem 子组件使用 useCountUp 数字动画
- **Projects.jsx**：点击图片打开 Lightbox，新增"点击查看"hover 提示
- **content.js**：修复"量产量产项目"笔误为"量产项目"

### 新增样式（index.css 追加约 350 行）

- 滚动进度条样式（固定顶部 2px，transform scaleX）
- 噪点质感（SVG feTurbulence，固定全屏，opacity 3.5%）
- 回到顶部按钮（圆形 48px，毛玻璃，hover 渐变）
- 灯箱（fixed 全屏，blur 20px，缩放动画，关闭按钮旋转效果）
- Hero 鼠标光晕（pointer-events none，transition 0.15s）
- 按钮光泽扫过（`::after` 伪元素，skewX，left 动画）
- 项目卡片 zoom 提示（hover 显示，translateY 动画）
- 项目卡片边框高亮（hover 蓝色边框）
- 数据卡片顶部渐变线（hover 显示）
- 导航下划线（active 链接底部 2px 蓝线）
- 优势卡片编号变色（hover 变蓝）
- 联系卡片图标动效（hover 放大 + 渐变填充）
- Hero 标题入场动画（opacity + translateY，依次 delay）
- `prefers-reduced-motion` 支持
- 窄屏适配（960px 断点）

### 验证

- 本地开发服务器运行正常（http://localhost:5173）
- 浏览器逐区域验证：Hero/About/Projects(8卡片)/Strengths/Contact 全部正常
- 灯箱功能验证：点击打开、背景/按钮关闭正常
- 数字动画验证：滚动到 About 区域触发
- 回到顶部按钮验证：滚动后显示，点击回顶
- 生产构建通过：`npm run build` 成功，CSS 25KB(gzip 5.6KB)、JS 164KB(gzip 55KB)

### Git 状态

- 已 commit：`feat: 第二轮交互优化 - 滚动进度条/数字动画/灯箱/回到顶部/按钮光效/噪点质感`
- 10 文件变更，545 行新增，9 行删除
- **push 失败**：github.com 443 端口连接超时（国内网络问题，需 VPN）
- 本地 commit 已保存，网络恢复后执行 `git push origin main` 即可触发 Vercel 重新部署

---

## 技术决策记录

### 为什么用原生 CSS 而非 Tailwind/CSS-in-JS？
- 项目体量小（单页作品集），原生 CSS 变量 + 类名足够
- 避免额外构建依赖，保持构建体积小
- 暗色主题用 CSS 变量统一管理，修改方便
- 用户代码能力较弱，原生 CSS 可读性更好，便于后续维护

### 为什么图片用 webp？
- 体积比 jpg/png 小约 30-50%
- 现代浏览器全支持
- Pillow 可直接转换，质量 82 兼顾体积和画质

### 为什么 Hero 用开机动画而非 UE4 录屏？
- 开机动画仅 1.9MB，UE4 录屏 9.6MB，首屏加载更快
- 开机动画是深蓝科技风粒子汇聚，与暗色主题契合
- UE4 录屏内容更丰富但体积大，后续可压缩后替换

### 为什么项目卡片左右交替？
- 避免单列重复的单调感
- 大卡片（16:10 图片）左右交替形成节奏感
- 版心 1700px 足够宽，交替布局视觉更平衡

### 为什么文案集中在 content.js？
- 单一数据源，修改文案不需要找组件
- 用户代码能力弱，改一个文件即可更新所有内容
- 数据与视图分离，符合 React 最佳实践

---

## 待办 / 未来迭代方向

- [ ] 替换 Hero 视频为更精彩的 UE4 实机录屏（需压缩）
- [ ] 调整 p01 图片 object-position 消除顶部白边
- [ ] 考虑更换头像为职业照
- [ ] 增加项目详情模态页（点击项目展开更多内容）
- [ ] 增加视频展示区（嵌入 01.mp4 / 02.mp4）
- [ ] 增加技能进度条或软件熟练度可视化
- [ ] 增加页面加载动画（Loading Screen）
- [ ] 增加自定义光标（科技感）
- [ ] 暗色/亮色主题切换
- [ ] SEO 优化（meta 标签、Open Graph、结构化数据）
- [ ] 性能优化（图片懒加载、视频预加载策略）
- [ ] 等待用户提供参考网站和截图进行第三轮针对性优化

---

## 环境信息

- **操作系统**：Windows
- **Node**：v24.17.0
- **npm**：11.13.0
- **Python**：3.13.13（用于素材提取：python-pptx, pypdf, Pillow）
- **项目路径**：`D:\work\portfolio`
- **开发端口**：5173
- **Git 远程**：`https://github.com/cj17614308993-bot/portfolio.git`
- **部署平台**：Vercel
