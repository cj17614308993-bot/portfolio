# 蔡杰 · 3D / AI Designer 个人作品集网站

> 基于 React + Vite 构建的暗色系高级个人作品集，面向汽车行业 3D 可视化与智能驾驶 HMI 领域。

## 项目信息

- **作者**：蔡杰（3D 设计师 / AI 设计师，比亚迪，8 年经验）
- **技术栈**：React 18 + Vite 5 + 原生 CSS（无 UI 框架）
- **设计风格**：暗色系、克制、科技感、非模板化
- **适配**：PC 端优先，版心 1700px，含 1200px / 960px 响应式断点
- **部署**：Vercel（GitHub 自动部署）

## 快速开始

```bash
# 安装依赖（首次）
npm install

# 开发模式（http://localhost:5173）
npm run dev

# 生产构建（输出到 dist/）
npm run build

# 预览构建产物
npm run preview
```

## 页面模块

| 模块 | 说明 |
|------|------|
| **Navbar** | 固定顶部 76px，滚动后毛玻璃；胶囊导航（关于/作品/能力/联系，中英双行）；CJ logo；联系合作按钮；IntersectionObserver 高亮当前区块 |
| **Hero** | 全屏视频背景（开机动画）+ 暗色渐变遮罩 + 网格；鼠标跟随光晕；大标题"3D 可视化 / 定义智能出行"（第二行蓝青渐变）；入场动画；查看作品/联系我按钮；滚动指示器 |
| **About** | 左侧头像名片（头像+姓名+角色+联系方式）；右侧个人介绍 + 4 项数据统计（数字滚动动画）+ 工作履历时间轴（5 段经历） |
| **Projects** | 8 个精选项目大卡片，左右交替布局；点击图片打开灯箱放大查看；项目序号、分类标签、描述、技术标签、核心指标 |
| **Strengths** | 6 项个人优势卡片（3 列网格），含图标、编号、中英文标题、描述 |
| **Contact** | 整屏收尾页；大标题"让我们一起创造点什么。"；3 个联系卡片（电话/邮箱/坐标）；发送邮件 CTA；页脚版权 |

## 交互特性（第二轮优化）

- 顶部滚动进度条（蓝青渐变 + 发光）
- 数字滚动动画（进入视口触发，easeOutCubic 缓动）
- 项目图片灯箱（点击放大，ESC/背景/按钮关闭）
- 回到顶部浮动按钮（滚动 >600px 显示）
- Hero 鼠标跟随径向光晕
- 按钮光泽扫过效果
- 项目卡片 hover 边框高亮 + "点击查看"提示
- 导航当前项下划线动画
- 数据卡片 hover 顶部渐变线
- 优势卡片编号 hover 变色
- 联系卡片图标 hover 放大渐变
- Hero 标题/副标题/按钮依次入场动画
- 全屏噪点质感（SVG feTurbulence，3.5% 透明度）
- 滚动渐入动画（IntersectionObserver）
- 支持 `prefers-reduced-motion` 无障碍

## 项目结构

```
portfolio/
├── index.html                  # 入口 HTML（Google Fonts: Space Grotesk + Inter）
├── package.json
├── vite.config.js              # host:true, port:5173
├── public/
│   ├── images/
│   │   ├── avatar.webp         # 简历头像（720x720）
│   │   └── projects/           # 8 张项目图（webp，最长边 2400px，quality 82）
│   │       ├── p01.webp        # Octane 奔驰 AMG GT
│   │       ├── p02.webp        # Unity HDRP 奥迪
│   │       ├── p03.webp        # 次世代生物建模（独角仙）
│   │       ├── p04.webp        # ADAS 白模车阵
│   │       ├── p05.webp        # 360° 全景倒车
│   │       ├── p06.webp        # Unity 多场景（农业）
│   │       ├── p07.webp        # 高德 NOA 导航
│   │       └── p08.webp        # 汽车硬表面建模（引擎）
│   └── videos/
│       └── hero.mp4            # Hero 背景视频（开机动画，1.9MB）
└── src/
    ├── main.jsx                # React 入口
    ├── App.jsx                 # 组件组装 + 噪点层
    ├── index.css               # 全部样式（~35KB，CSS 变量，暗色科技风）
    ├── data/
    │   └── content.js          # 所有文案数据（改文案只改此文件）
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Projects.jsx
    │   ├── Strengths.jsx
    │   ├── Contact.jsx
    │   ├── Icon.jsx            # SVG 图标组件
    │   ├── ScrollProgress.jsx  # 滚动进度条
    │   ├── BackToTop.jsx       # 回到顶部按钮
    │   └── Lightbox.jsx        # 图片灯箱
    └── hooks/
        ├── useReveal.js        # 滚动渐入（IntersectionObserver）
        └── useCountUp.js       # 数字滚动动画
```

## 设计规范

### 配色（CSS 变量）

| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg` | `#07080a` | 页面底色 |
| `--bg-2` | `#0a0c10` | 次级背景（Projects/Contact） |
| `--bg-elev` | `#0e1116` | 悬浮层 |
| `--bg-card` | `#11141a` | 卡片背景 |
| `--bg-card-2` | `#151922` | 卡片 hover |
| `--line` | `rgba(255,255,255,0.08)` | 分割线 |
| `--line-2` | `rgba(255,255,255,0.14)` | 强调边框 |
| `--text` | `#eef1f6` | 主文字 |
| `--text-dim` | `#9aa2b0` | 次级文字 |
| `--text-mute` | `#5d6573` | 辅助文字 |
| `--accent` | `#5b9dff` | 主强调色（蓝） |
| `--accent-2` | `#38bdf8` | 次强调色（青） |

### 字体

- 标题：`Space Grotesk`（Google Fonts）
- 正文：`Inter` + `PingFang SC` + `Microsoft YaHei`

### 布局

- 版心 `.container`：`max-width: 1700px`，`padding: 0 48px`
- 区块间距：`padding: 160px 0`
- 响应式断点：1200px（平板）、960px（移动端单列）

## 文案修改

所有文案集中在 `src/data/content.js`，包含：
- `profile`：个人信息、联系方式、统计数据、工作履历
- `projects`：8 个项目的标题、描述、标签、指标、图片路径
- `strengths`：6 项个人优势
- `navLinks`：导航链接

修改文案后 Vite 热更新自动生效。

## 部署

- Git 仓库：`https://github.com/cj17614308993-bot/portfolio.git`
- 分支：`main`
- 部署平台：Vercel（push 到 main 自动部署）
- 构建命令：`npm run build`，输出目录 `dist`
- 生产构建体积：CSS 25KB（gzip 5.6KB）、JS 164KB（gzip 55KB）

## 已知问题与待优化

1. **Hero 视频**：当前用开机动画（1.9MB），偏暗偏简单；可考虑用 UE4 实机录屏（01.mp4，9.6MB）但需压缩
2. **p01 图片**：Octane 图顶部有白色区域，与暗色主题略冲突，可用 `object-position` 调整
3. **p04/p05 分辨率**：源图分辨率较低，放大略糊
4. **头像**：当前为生活自拍照，可考虑换职业照
5. **GitHub 推送**：国内网络可能需 VPN 才能 push 到 github.com
6. **可扩展方向**：项目详情模态页、更多视频展示、技能进度条、暗色/亮色切换、自定义光标、页面加载动画

## 开发记录

详见 [DEVLOG.md](./DEVLOG.md)
