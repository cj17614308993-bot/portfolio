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

## 2026-08-14 · 资源优化：p01 图片白边裁剪 + demo-02 视频压缩

### p01_01.webp 白边处理

- **问题**：Octane 渲染图顶部有约 20% 纯白色区域，与暗色主题冲突
- **原计划**：用 CSS `object-position` 偏移，但发现图片 16:9 比项目卡片容器 16:10 更宽，`object-fit: cover` 模式下左右裁剪、上下填满，垂直方向偏移无效
- **最终方案**：直接用 Pillow 裁剪顶部 236px（216px 纯白边 + 20px 渐变过渡区），1920×1080 → 1920×844，webp quality 82，顶部亮度从 255 降至 100（稳定灰色）
- **影响**：项目卡片封面 + 手风琴图库第一个面板 + Lightbox 图集首图均自动生效，无需改代码

### demo-02.mp4 视频压缩

- **工具**：imageio-ffmpeg（内置 ffmpeg 二进制，无需系统安装）
- **参数**：H.264 CRF 28 + preset medium + AAC 96k + faststart
- **结果**：19.71 MB → 9.80 MB，压缩率 50.3%，视频码率 362 kb/s
- **画质**：960×544 @ 25fps，CRF 28 在该分辨率下肉眼可接受，适合网页展示
- **原文件**：已替换，文件名不变，content.js 引用无需修改

### 变更文件

- `public/images/projects/p01_01.webp`（裁剪覆盖）
- `public/videos/demo-02.mp4`（压缩替换）
- `DEVLOG.md`（本日志 + 待办更新）

---

## 2026-08-14 · UE4 / Unity 项目拆分

### 背景

原项目 02「汽车实时渲染 · UE4 / Unity HDRP」将两个引擎的作品混在一起，图片和描述不够聚焦。用户提供 UE4 参考图（银/红/蓝/黑四款车型海边场景），要求拆分为两个独立项目。

### 拆分方案

- **项目 02 — UE4 汽车实时渲染**（id: `ue4-realtime`）
  - 4 张图：白色车、黑色车（从参考图裁剪）+ 原 p02_03（红）、p02_04（蓝）
  - 描述参考用户提供的 UE4 作品文案：四款车型、车漆 Shader、暗部死黑优化、Sequencer 动画
  - 标签：UE4 / 光线追踪、PBR 材质实例、车漆 Shader、Sequencer 动画
  - size: large

- **项目 03 — Unity HDRP 汽车实时渲染**（id: `unity-hdrp-realtime`）
  - 2 张图：原 p02_01、p02_02（现代建筑露台场景）
  - 描述聚焦 Unity HDRP 管线、PBR 材质、体积光、车规级性能
  - size: medium

- 后续项目序号顺延：原 03→04、04→05、05→06、06→07、07→08、08→09
- 项目总数从 8 个增至 9 个，手风琴图库与 Projects 组件均为动态遍历，无需改代码

### 新增图片

- `public/images/projects/ue4_white.webp`（543×278，从参考图裁剪）
- `public/images/projects/ue4_black.webp`（543×278，从参考图裁剪）

### 变更文件

- `src/data/content.js`（拆分项目 + 序号顺延）
- `public/images/projects/ue4_white.webp`（新增）
- `public/images/projects/ue4_black.webp`（新增）
- `DEVLOG.md`（本日志）

---

## 2026-08-15 · 第四轮：项目图片全面替换 + 内容扩充 + 结构重组

### 概述

本轮以用户提供的高清原图为主线，逐项目替换低质量配图，新增两个泊车相关项目，按「自研 / 量产 / 历史」重新排列项目顺序，并将视频模块整合进作品区域，最后更换头像。项目总数从 9 增至 11。

### 一、UE4 项目图片替换（4 张高清车型图）

- **背景**：此前 UE4 项目的白色/黑色车图是从参考截图中裁剪的低质量图（543×278）
- **替换**：用户提供 4 张高清原图（银/红/蓝/黑四款车型海边场景），转换为 webp 后覆盖
  - `ue4_silver.webp`（1006×579，58 KB）
  - `ue4_red.webp`（957×541，57 KB）
  - `ue4_blue.webp`（1024×526，56 KB）
  - `ue4_black.webp`（1027×541，59 KB，覆盖旧同名文件）
- 删除旧的 `ue4_white.webp`、`p02_03.webp`、`p02_04.webp`
- size 保持 large

### 二、DiLink 3D ADAS 项目更新（6 张图 + 文案融合）

- **图片**：用户分两轮提供 6 张图
  - 模型库 3 张：完整网格 + 2 张侧视图 → `adas_grid.webp`、`adas_lineup_01.webp`、`adas_lineup_02.webp`
  - 实车界面 3 张：2 张仪表 3D ADAS 界面 + 1 张泊车场景车内实拍 → `adas_dashboard_01.webp`、`adas_dashboard_02.webp`、`adas_parking.webp`
- **文案**：将用户提供的 DiLink 4.0→6.0 迭代段落与原有描述融合，强调：
  - 5.0 阶段建立标准化车辆模型库（50+ 车型），解决模型粗糙、场景还原度低问题
  - 6.0 引入实车级 3D 模型与实时环境渲染，摄像头画面与 3D 车模虚实融合
  - 全场景仿真建模库支持昼夜/雨雪/雾天切换，为 HIL 测试提供虚拟验证环境
  - 相比传统 2D 仪表做到所见即所得
- 标签：UE / Unity、3D 模型库 50+、全场景仿真、虚实融合
- 指标：车辆模型 50+ · 场景类型 20+ · 测试效率提升 300%
- 删除旧的 6 张 `p04_*.webp`

### 三、360° 全景倒车项目图片替换（2 张图）

- **替换**：原 6 张 `p05_*.webp` 替换为 2 张实车界面图
  - `surround_3d_ui.webp`（1142×323，58 KB）— 车机 3D 全景倒车界面
  - `surround_real_effect.webp`（1152×369，46 KB）— 车内实拍全景倒车效果
- size 从 wide 改为 medium（2 张图）
- 文案/标签/指标保持不变

### 四、高德导航 NOA 项目图片替换（2 张图）

- **替换**：原 3 张 `p07_*.webp` 替换为 2 张实车场景图
  - `noa_main.webp`（1490×834，104 KB）— 城市道路 NOA 变道场景（车内实拍）
  - `noa_tunnel.webp`（675×785，49 KB）— 隧道场景 NOA 车道级导航
- size 从 tall 改为 medium

### 五、新增两个泊车项目（5 张图）

在 360° 全景倒车之后、Unity 多场景之前插入两个新项目：

**项目 — 泊车考试题设计**（id: `parking-quiz`）
- 3 张图：`parking_quiz_01~03.webp`（车机功能学习及测试界面，多选题）
- 文案：标准化考题体系，覆盖垂直/平行/斜列/窄泊位等工况，分级考题，车机端可视化，自动评分与数据记录
- 标签：记忆泊车、考题体系、车机可视化、分级考题
- 指标：考题覆盖 20+ 泊车场景 · 明确功能边界 · 规范操作行为

**项目 — 自动泊车测试**（id: `auto-parking-test`）
- 2 张图：`auto_parking_01~02.webp`（车机自动泊车界面，3D 车辆模型 + 俯视摄像头）
- 文案：毫米波雷达 + 高清视觉感知 + AI 决策算法，车位检测、路径规划、车辆动力学控制，垂直/侧方/斜向车位自主泊入
- 标签：毫米波雷达、视觉感知、AI 决策、路径规划
- 指标：车位识别 99.2% · 平均入位 38 秒 · 最小间距 2.4 米

### 六、项目顺序重新排列（自研 / 量产 / 历史）

按用户要求将 11 个项目分为三组重新排序：

| 序号 | 项目 | 分组 |
|------|------|------|
| 01 | Octane 影视级汽车渲染 | 自研 |
| 02 | UE4 汽车实时渲染 | 自研 |
| 03 | Unity HDRP 汽车实时渲染 | 自研 |
| 04 | 自动泊车测试 | 量产 |
| 05 | DiLink 3D ADAS 智能驾驶可视化 | 量产 |
| 06 | 高德导航 NOA 智能驾驶 | 量产 |
| 07 | 泊车考试题设计 | 量产 |
| 08 | 360° 全景倒车影像系统 | 量产 |
| 09 | Unity 多场景 3D 可视化 | 历史 |
| 10 | 次世代生物建模全流程 | 历史 |
| 11 | 汽车硬表面建模 · 内饰与引擎 | 历史 |

- 所有项目的 `index` 字段同步更新
- 手风琴图库与 Projects 组件动态遍历，无需改代码

### 七、视频模块整合进作品区域

- **原结构**：VideoShowcase 是独立 section（`#videos`），位于 Projects 之后、Strengths 之前
- **新结构**：将视频网格整合进 Projects 组件内部，放在 11 个项目卡片之后，作为作品区域的一部分
- `App.jsx` 移除独立的 `<VideoShowcase />` 引用
- `Projects.jsx` 引入 `videos` 数据并渲染视频网格 + 子标题
- CSS 调整：`.videos` 去掉独立 section 的上下 padding，仅保留顶部间距；新增 `.section-head--sub` 子标题样式（margin-bottom 减小至 48px）
- 响应式断点同步调整
- `VideoShowcase.jsx` 组件文件保留（未被引用，tree-shaking 不影响构建）

### 八、头像替换

- 原头像：从简历 PDF 提取的戴眼镜自拍照（黑外套白衬衫）
- 新头像：`生成简历人像图.png`（2048×2048，正装证件照，蓝灰背景）
- 转换为 `public/images/avatar.webp`（quality 82，171 KB），直接覆盖
- About 组件引用路径不变，无需改代码

### 变更文件汇总

**修改**：
- `src/data/content.js`（项目拆分/新增/重排 + 文案融合 + index 更新）
- `src/components/Projects.jsx`（整合视频模块）
- `src/App.jsx`（移除独立 VideoShowcase）
- `src/index.css`（视频模块样式调整 + section-head--sub）
- `public/images/avatar.webp`（头像替换）
- `public/images/projects/p01_01.webp`（此前裁剪白边）
- `public/videos/demo-02.mp4`（此前压缩）
- `DEVLOG.md`（本日志）
- `.gitignore`（新增临时文件排除）

**新增**（20 张 webp）：
- UE4：`ue4_silver.webp`、`ue4_red.webp`、`ue4_blue.webp`、`ue4_black.webp`
- ADAS：`adas_grid.webp`、`adas_lineup_01~02.webp`、`adas_dashboard_01~02.webp`、`adas_parking.webp`
- 全景倒车：`surround_3d_ui.webp`、`surround_real_effect.webp`
- NOA：`noa_main.webp`、`noa_tunnel.webp`
- 泊车考试题：`parking_quiz_01~03.webp`
- 自动泊车：`auto_parking_01~02.webp`

**删除**（旧图片）：
- `ue4_white.webp`、`p02_03.webp`、`p02_04.webp`
- `p04_01~06.webp`（旧 ADAS 图）
- `p05_01~06.webp`（旧全景倒车图）
- `p07_01~03.webp`（旧 NOA 图）

### 当前页面结构

```
Navbar（固定导航）
├── Hero（WebThreads WebGL 光丝背景）
├── Gallery（AccordionGallery 手风琴图库 + Lightbox 放大）
├── About（个人介绍 + 数字动画 + 履历）
├── Projects（11 项目卡片 + 动态演示 Motion Showcase 3 视频）
├── Strengths（6 项能力卡片）
└── Contact（联系方式 + Footer）
```

### 构建验证

- `npm run build` 通过，构建时间约 1.2s
- CSS 33.4 KB（gzip 7.2 KB），JS 296 KB（gzip 103 KB）

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
- [x] 调整 p01 图片消除顶部白边（实际方案：直接裁剪图片顶部 216px 白边，因图片 16:9 比容器 16:10 宽，object-position 垂直方向无效）
- [x] 考虑更换头像为职业照（已替换为 2048×2048 正装证件照）
- [ ] 增加项目详情模态页（点击项目展开更多内容）
- [x] 增加视频展示区（嵌入 01.mp4 / 02.mp4 / 开机动画）
- [ ] 增加技能进度条或软件熟练度可视化
- [ ] 增加页面加载动画（Loading Screen）
- [ ] 增加自定义光标（科技感）
- [ ] 暗色/亮色主题切换
- [ ] SEO 优化（meta 标签、Open Graph、结构化数据）
- [x] 性能优化（视频懒加载已完成；图片懒加载待补充）
- [x] 压缩 demo-02.mp4（19.71MB → 9.80MB，H.264 CRF 28 + AAC 96k，压缩率 50.3%）
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

---

## 2026-08-15 · Hero 区域文案调整

### 需求

用户提供参考图（作品集封面风格），要求将 Hero 区域文字改为参考图的风格。

### 改动

**主标题**：
- 原：`3D 可视化` / `定义智能出行`（两行，第二行蓝青渐变）
- 新：`DESIGN` / `PORTFOLIO`（两行，第二行蓝青渐变）

**副标题**：
- 原：`以 3D 可视化与实时渲染，重塑智能出行的每一个像素。` + 英文副标题
- 新：`建模 · 材质 · 渲染 · 动画`（单行中文关键词）
- 移除英文副标题

**数据层**：
- `content.js`：`profile` 新增 `heroTitle: ['DESIGN', 'PORTFOLIO']` 和 `heroKeywords: '建模 · 材质 · 渲染 · 动画'`
- `tagline` / `taglineEn` 保留但不再被 Hero 引用

**组件层**：
- `Hero.jsx`：主标题改为遍历 `profile.heroTitle` 渲染，副标题引用 `profile.heroKeywords`，移除英文副标题 `<p>` 节点

### 变更文件

- `src/data/content.js`（新增 heroTitle / heroKeywords 字段）
- `src/components/Hero.jsx`（标题数据驱动 + 移除英文副标题）
- `DEVLOG.md`（本日志）
