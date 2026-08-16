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

---

## 2026-08-16 · 第五轮：页面结构重组 + DriftWall 集成 + 项目经历重构

### 概述

本轮围绕页面结构合理性、作品区视觉升级和内容质量三个方向展开。将 Gallery 从 Hero/About 之间移至 About/Projects 之间形成连贯作品区，用 React Bits 的 DriftWall 3D 漂移墙替换原手风琴图库，将 About 区的「工作经历」重构为「项目经历」，并完成全面体检与冗余清理。

### 一、页面结构与导航重组

**问题**：原页面顺序为 Hero → Gallery → About → Projects，导航「作品」指向 `#works`（Projects），用户点击会跳过 Gallery 直接到精选项目，Gallery 夹在 Hero 和 About 之间缺乏导航入口。

**方案**：
- `App.jsx` 组件顺序调整为：Hero → About → Gallery → Projects → Strengths → Contact
- `content.js` 中 `navLinks` 的「作品」href 从 `#works` 改为 `#gallery`
- Gallery 与 Projects 连续排列，形成完整的作品展示大区
- 点击导航「作品」先到 DriftWall 作品长廊，向下滚动自然进入精选项目卡片

### 二、About 区：工作经历 → 项目经历重构

**需求**：用户提供项目经历参考图，要求将「工作经历」改为「项目经历」，按从新到旧排序并润色。

**改动**：
- `content.js`：`experience` 数组从 5 条工作履历替换为 6 条项目经历
  - 泊车影像项目（2025.06—至今）
  - 软件可售智能驾驶答题项目
  - DiLink 3.0–6.0 3D ADAS 项目
  - 3D 全景倒车项目
  - 上海车展 · 比亚迪唐车模
  - 《使命召唤》游戏场景
- 每条新增 `description` 字段（项目职责与成果列表）
- `About.jsx`：标题改为「项目经历 · Project Experience」，时间线增加 description 列表渲染
- `index.css`：新增 `.timeline-item__desc` 及 `li::before` 样式

**后续调整**：用户反馈精选项目区少了「泊车影像项目」和「上海车展项目」，曾在 `projects` 数组新增 2 项（index 05、10），后用户要求撤回，恢复为 11 项（01–11）。

### 三、视频模块标题修复与重设计

**问题**：Projects 区视频模块标题使用了 `.section-head__tag` / `.section-head__title` / `.section-head__desc` 三个 CSS 中**完全未定义**的类名，导致文字在暗色背景上不可见。

**方案**：
- `Projects.jsx`：标题结构改为左右布局的 `.videos__header`（左侧 eyebrow + heading「视频作品展示」，右侧 lead 描述）
- `index.css`：新增 `.videos__header` 系列样式（含 1200px/960px 响应式）
- `.videos` padding 从 `120px 0 0` 改为 `0`，由标题自身 padding-top + 边框控制间距

### 四、Gallery 标题不可见 Bug 修复

**问题**：Gallery 标题同样使用了上述三个未定义的 CSS 类名，文字不可见。

**方案**：`Gallery.jsx` 标题结构改为与其他区块统一的 `.section-label` 风格（编号 + 标题 + 描述）。

### 五、DriftWall 3D 漂移墙集成（替换手风琴图库）

**需求**：用户要求用 React Bits 的 DriftWall 组件替换原 AccordionGallery 手风琴图库。

**改动**：
- 新增组件：`src/components/DriftWall.jsx`（React Bits 官方源码，支持 `onTileClick` 回调）
- 新增样式：`src/components/DriftWall.css`
- `Gallery.jsx` 重写：用 DriftWall 替换 AccordionGallery + Lightbox
- 配置参数：columns=5，tileWidth=280，tileHeight=132，gap=18，tilt=16，turn=-14，perspective=1200，depth=120，speed=42，direction=up，variance=0.45，roll=-2
- 点击图片触发 Lightbox 放大查看该项目完整图集（`onTileClick` 回调）
- 悬停时暂停漂移（`pauseOnHover={true}`），方便点击查看

**参数迭代过程**：
1. 初始配置（tileWidth=220, tilt=12, turn=-10, overlayColor=#07080a）
2. 用户要求用官方示例参数 → 改为 tileWidth=280, tilt=16, turn=-14, overlayColor=#060010, roll=-2
3. 用户反馈长廊上方空余多 → 多次调整间距
4. 最终：去掉 Gallery 标题和描述，DriftWall 直接充满区域，高度 680px

### 六、Gallery 区域间距优化

**问题**：用户多次反馈长廊上方空余太大。

**根因分析**：
1. About 区块继承 `.section { padding: 160px 0 }`，底部 160px + Gallery 顶部间距过大
2. Gallery 标题与 DriftWall 之间有 section-head margin-bottom + 容器 margin-top 双重间距

**优化步骤**：
1. 标题与 DriftWall 间距：从 136px（88+48）压缩到 40px
2. Gallery 顶部 padding：从 120px 减到 48px
3. About 底部 padding：从 160px 覆盖为 56px
4. 最终方案：**移除 Gallery 标题和描述**，DriftWall 直接从区域顶端开始，Gallery 顶部 padding 归零，高度 680px

### 七、全面体检与优化清单

对项目进行全面检查，输出 6 项优化建议：
1. ✅ Gallery 标题不可见（已修复）
2. ✅ 页面结构与导航不匹配（已重组）
3. ⬜ 区块编号顺序被打破（Gallery 去编号后已解决）
4. ⬜ 项目经历时间线空档（2022.12–2025.06 之间视觉空档，实际 DiLink 项目覆盖）
5. ✅ 冗余组件清理（已完成）
6. ⬜ 空字段（待处理）

### 八、冗余组件与临时文件清理

**删除未引用组件**（4个）：
- `src/components/VideoShowcase.jsx`（视频模块已整合进 Projects）
- `src/components/AccordionGallery.jsx`（已被 DriftWall 替代）
- `src/components/Featured.jsx`（深度轮播包裹组件，已弃用）
- `src/components/DepthCarousel.jsx`（深度轮播，已弃用）

**删除临时参考截图**（6个）：
- `ref1.png`、`ref2.png`、`ref_a.png`、`ref_b.png`
- `video_section.png`、`video_section2.png`

### 九、Hero 按钮锚点修正

- Hero「查看作品」按钮 href 从 `#works` 改为 `#gallery`，与导航一致

### 当前页面结构

```
Navbar（固定导航）
├── Hero（WebThreads WebGL 光丝背景 + DESIGN/PORTFOLIO 标题）
├── About（个人介绍 + 数字动画 + 项目经历时间线）
├── Gallery（DriftWall 3D 漂移墙 + Lightbox 放大，无标题）
├── Projects（11 项目卡片 + 视频作品展示）
├── Strengths（6 项能力卡片）
└── Contact（联系方式 + Footer）
```

### 构建体积变化

| 阶段 | CSS | JS (gzip) |
|------|-----|-----------|
| 第四轮结束 | 33.4 KB | 296 KB (103 KB) |
| 第五轮结束 | 37.2 KB | 227 KB (76.9 KB) |

JS 体积下降约 70KB，主要因为移除了 `gsap` 依赖（AccordionGallery/DepthCarousel 不再引用，tree-shaking 生效）。CSS 小幅增加来自 DriftWall 样式和时间线描述样式。

### 变更文件汇总

**修改**：
- `src/App.jsx`（组件顺序重组）
- `src/data/content.js`（navLinks 锚点调整 + experience 重构为项目经历）
- `src/components/About.jsx`（项目经历标题 + description 渲染）
- `src/components/Gallery.jsx`（DriftWall 替换手风琴 + 去标题充满布局）
- `src/components/Projects.jsx`（视频模块标题重设计）
- `src/components/Hero.jsx`（查看作品按钮锚点 #gallery）
- `src/index.css`（时间线样式 + 视频标题样式 + Gallery 间距优化 + About 底部 padding）
- `DEVLOG.md`（本日志）

**新增**：
- `src/components/DriftWall.jsx`
- `src/components/DriftWall.css`

**删除**：
- `src/components/VideoShowcase.jsx`
- `src/components/AccordionGallery.jsx`
- `src/components/Featured.jsx`
- `src/components/DepthCarousel.jsx`
- 6 个临时参考截图（根目录）

### Git 状态

- 工作区有未提交修改（上述所有变更文件）
- 尚未 commit/push，待用户确认后执行
- 国内网络 push 可能需 VPN（AGENTS.md 已知坑）

---

## 2026-08-16 · 第六轮：Grainient 动态渐变背景集成尝试（最终移除）

### 概述

尝试集成 React Bits 的 `Grainient` WebGL 动态渐变组件作为页面背景，先后测试了 Hero 背景和内容区背景两种方案，最终用户决定移除效果，恢复原样。组件文件保留以备后续使用。

### 一、Grainient 组件集成

**组件来源**：React Bits（reactbits.dev），基于 ogl 的 WebGL 动态渐变背景，支持颜色混合、透视扭曲、噪点颗粒、对比度/饱和度调节等参数。

**新增文件**：
- `src/components/Grainient.jsx`（完整组件源码，含 ctxMap WeakMap、resize/visibility 处理）
- `src/components/Grainient.css`（基础容器样式）

**依赖**：`ogl`（已在第三轮 WebThreads 集成时安装，无需新增）

### 二、方案一：Hero 背景

- 将 Grainient 以 wrapper div 方式放入 Hero 背景层（z-index 0，pointer-events none）
- 配色：color1 `#00e5ff`（青）、color2 `#3b82f6`（蓝）、color3 `#0c1929`（深蓝黑）
- 同步降低 hero__overlay 遮罩强度以透出渐变
- 用户确认效果可见

### 三、方案二：内容区背景（About → Strengths）

**用户反馈**：Hero 背景不合适，要求将 Grainient 移到「个人经历到个人优势」整块内容区域。

**实现方案**：
- `App.jsx`：用 `.content-bg` wrapper 包裹 About → Gallery → Projects → Strengths
- wrapper 内添加 `.content-bg__layer` 绝对定位层（inset 0, z-index 0）放置 Grainient
- 各 section 设置 `position: relative; z-index: 1` 确保内容在背景之上
- `index.css`：新增 `.content-bg` / `.content-bg__layer` 样式，将 About/Projects/Strengths 背景设为 transparent 透出渐变
- 配色调整为更低调的暗色：color1 `#1e3a5f`（深蓝）、color2 `#0c4a6e`（深青）、color3 `#07080a`（黑），saturation 0.7

### 四、最终决定：移除效果

用户反馈"算了还是删除这个效果吧"，执行回滚：

- `App.jsx`：移除 `.content-bg` wrapper 和 Grainient 引用，恢复各 section 直接渲染
- `index.css`：删除 `.content-bg` 全部样式，About/Projects/Strengths 背景自动恢复为原始定义
- `Hero.jsx`：此前已移除 Grainient，hero__overlay 已恢复原始遮罩强度
- `Grainient.jsx` / `Grainient.css`：组件文件保留在 `src/components/`，未被引用，不影响构建体积（tree-shaking），后续可随时恢复

### 变更文件

**修改**：
- `src/App.jsx`（添加后移除 content-bg wrapper）
- `src/components/Hero.jsx`（添加后移除 Grainient）
- `src/index.css`（添加后移除 content-bg 样式 + hero__overlay 调整后恢复）
- `DEVLOG.md`（本日志）

**新增（保留）**：
- `src/components/Grainient.jsx`
- `src/components/Grainient.css`

### 构建验证

- `npm run build` 通过
- CSS 37.2 KB（gzip 7.84 KB），JS 226.75 KB（gzip 76.69 KB）
- 与第五轮结束时体积基本一致（Grainient 未被引用，tree-shaking 生效）

### 当前页面结构（与第五轮一致）

```
Navbar（固定导航）
├── Hero（WebThreads WebGL 光丝背景 + DESIGN/PORTFOLIO 标题）
├── About（个人介绍 + 数字动画 + 项目经历时间线）
├── Gallery（DriftWall 3D 漂移墙 + Lightbox 放大，无标题）
├── Projects（11 项目卡片 + 视频作品展示）
├── Strengths（6 项能力卡片）
└── Contact（联系方式 + Footer）
```
