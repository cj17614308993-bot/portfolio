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

## 2026-08-14 · 第三轮：动态视觉升级 + 多图画库 + 视频模块

### 概述

本轮围绕"动态视觉效果"和"内容丰富度"两个方向展开，集成了多个 React Bits 开源组件，将作品集从静态展示升级为具备 WebGL 动效、手风琴交互、多图画库和视频演示的完整作品。

### 一、Hero 背景升级：WebThreads WebGL 光丝

**需求**：用户希望 Hero 区域更有科技感和动态效果。

**方案**：集成 React Bits 的 `WebThreads` 组件（基于 ogl 的 WebGL 动态发光线条编织效果），替换原有的视频背景。

**改动**：
- 新增依赖：`ogl`
- 新增组件：`src/components/WebThreads.jsx`
- `Hero.jsx`：移除 `<video>`，替换为 `<WebThreads>`
- 配置参数：8 条光丝，蓝青配色（`#5b9dff` / `#38bdf8` / `#ffffff`），speed 0.15，支持鼠标交互
- 组件内置：IntersectionObserver（不可见时暂停渲染）、页面可见性处理、resize 自适应
- z-index 层级：WebThreads(0) → overlay/grid(1) → content(2)，鼠标事件穿透

### 二、作品集多图画库（31 张）

**需求**：用户反馈"作品集显示的图片不够"，提供了 PPT 和资料目录，要求以 PPT 图片为主扩充。

**方案**：每个项目配置多张展示图，卡片只显示封面，点击进入 Lightbox 左右翻页浏览。

**改动**：
- `Lightbox.jsx` 重写：支持 `images` 数组、左右箭头翻页、键盘 `←→` 切换、底部序号 `当前/总数`、`ESC` 关闭
- `Projects.jsx`：封面取 `images[0]`，点击传入完整数组
- `content.js`：8 个项目的 `image` 字段改为 `images` 数组，共 31 张图
- 图片全部转换为 webp，最长边 ≤2400px，quality 82

**图片配置明细**：

| 项目 | 编号 | 图片数 | 内容 |
|------|------|--------|------|
| Octane 影视级渲染 | p01 | 3 | 正面/前45°/后45° |
| 汽车实时渲染 UE4/HDRP | p02 | 4 | Unity HDRP + UE4 红蓝轿车 |
| 次世代生物建模 | p03 | 3 | 瓢虫/叩头虫/犀金龟 |
| DiLink 3D ADAS | p04 | 5 | 模型库/界面/实拍/3D ADAS |
| 360° 全景倒车 | p05 | 6 | 全景效果/泊车界面/考试题 |
| Unity 多场景可视化 | p06 | 3 | 办公/居住/农业园区 |
| 高德导航 NOA | p07 | 3 | 主图/隧道场景/PPT内嵌 |
| 汽车硬表面建模 | p08 | 4 | 内饰与引擎（PPT 第17页） |

- p02 标题调整为"汽车实时渲染 · UE4 / Unity HDRP"，涵盖两种引擎
- 旧的单张主图 `p01.webp ~ p08.webp` 已删除

### 三、AccordionGallery 手风琴图库

**需求**：用户要求集成手风琴图库组件，并且可以放大看全图。

**方案**：集成 React Bits 的 `AccordionGallery`，点击已展开面板时打开 Lightbox 查看该项目完整图集。

**改动**：
- 新增依赖：`gsap`（手风琴 + 深度轮播共用）
- 新增组件：`src/components/AccordionGallery.jsx`（基于官方源码，新增 `onSelect` 回调）
- 新增组件：`src/components/Gallery.jsx`（包裹手风琴 + Lightbox 放大）
- 配置：8 个项目封面图，hover 切换，expandRatio 0.42，tilt 6°，蓝青强调色
- 交互：悬停/点击切换展开面板，再次点击已展开面板 → 打开 Lightbox 多图画库
- 放置位置：Hero 之后、About 之前

### 四、DepthCarousel 深度轮播（已集成后移除）

**过程**：曾集成 React Bits 的 `DepthCarousel` 3D 深度轮播组件，创建 `Featured.jsx` 放在 Hero 之后。后用户决定保留手风琴图库、移除深度轮播，从 `App.jsx` 中移除引用。

**现状**：`DepthCarousel.jsx` 和 `Featured.jsx` 组件文件保留在 `src/components/`，未被引用，不影响构建体积（tree-shaking），后续可随时恢复。

### 五、VideoShowcase 视频展示模块

**需求**：用户上传 3 个视频文件，要求增加视频模块。

**方案**：创建响应式视频卡片网格，静音自动循环播放，支持 controls 交互。

**改动**：
- 新增组件：`src/components/VideoShowcase.jsx`
- 视频文件复制到 `public/videos/`，重命名为英文：
  - `boot-animation.mp4`（1.85 MB）— 车机开机动画
  - `demo-01.mp4`（9.22 MB）— UI 动效与交互演示
  - `demo-02.mp4`（19.71 MB）— 3D 可视化作品演示
- `content.js` 新增 `videos` 数组统一管理
- 播放配置：`muted + autoplay + loop + playsInline + controls`，`loading="lazy"` + `preload="metadata"`
- 视觉：3 列网格，卡片 hover 上浮 + 蓝青边框光晕，16:9 视频比例
- 放置位置：Projects 之后、Strengths 之前

### 六、Git 与部署

- 本轮共产生 2 个 commit：
  - `ff87860`：作品集视觉升级 — WebThreads + 手风琴图库 + 多图画库
  - `ca5cba3`：新增视频展示模块 VideoShowcase
- 加上之前未推送的 `a0c5308`、`692e9d6`，共 4 个 commit 分批推送
- 国内网络连接 GitHub 不稳定，多次出现 443 端口超时，最终全部推送成功
- Vercel 自动部署触发

### 当前页面结构

```
Navbar（固定导航）
├── Hero（WebThreads WebGL 光丝背景）
├── Gallery（AccordionGallery 手风琴图库 + Lightbox 放大）
├── About（个人介绍 + 数字动画 + 履历）
├── Projects（8 项目卡片网格 + 多图画库 Lightbox）
├── VideoShowcase（3 视频演示网格）
├── Strengths（6 项能力卡片）
└── Contact（联系方式 + Footer）
```

### 构建体积变化

| 阶段 | CSS | JS (gzip) |
|------|-----|-----------|
| 第二轮结束 | 25 KB | 164 KB (55 KB) |
| 第三轮结束 | 33 KB | 295 KB (102 KB) |

主要增量来自 `gsap`（约 80KB）和 `ogl`（WebThreads 依赖）。

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

- [x] 替换 Hero 视频为动态背景（已用 WebThreads WebGL 光丝替代）
- [ ] 调整 p01 图片 object-position 消除顶部白边
- [ ] 考虑更换头像为职业照
- [ ] 增加项目详情模态页（点击项目展开更多内容）
- [x] 增加视频展示区（嵌入 01.mp4 / 02.mp4 / 开机动画）
- [ ] 增加技能进度条或软件熟练度可视化
- [ ] 增加页面加载动画（Loading Screen）
- [ ] 增加自定义光标（科技感）
- [ ] 暗色/亮色主题切换
- [ ] SEO 优化（meta 标签、Open Graph、结构化数据）
- [x] 性能优化（视频懒加载已完成；图片懒加载待补充）
- [ ] 压缩 demo-02.mp4（当前 19.71MB，建议压至 10MB 以内）
- [ ] 等待用户提供参考网站和截图进行第四轮针对性优化

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
