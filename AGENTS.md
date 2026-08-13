# 项目协作指南 / AGENTS.md

蔡杰个人作品集网站（React + Vite）的 AI 协作约定。

## 常用命令

```bash
# 开发
npm run dev          # http://localhost:5173（host:true, 局域网可访问）

# 构建
npm run build        # 输出到 dist/
npm run preview      # 预览构建产物

# Git
git add -A
git commit -m "描述"
git push origin main # 国内网络可能需 VPN
```

## 关键约定

- **文案唯一来源**：`src/data/content.js`，改文案只改此文件，不要散落到组件里
- **样式**：全部在 `src/index.css`，使用 CSS 变量（`--bg`, `--accent`, `--accent-2` 等），不要内联样式或引入 CSS 框架
- **图片**：放在 `public/images/`，用 webp 格式，最长边 ≤2400px，quality 82
- **视频**：放在 `public/videos/`，Hero 背景视频需 muted + autoplay + loop + playsInline
- **组件命名**：PascalCase，功能单一；新组件放 `src/components/`
- **Hooks**：放 `src/hooks/`，use 开头
- **版心**：`.container` max-width 1700px，padding 0 48px，不要随意改
- **响应式断点**：1200px（平板）、960px（移动单列）

## 设计风格约束

- 暗色系（`--bg #07080a`），蓝青强调色（`--accent #5b9dff` / `--accent-2 #38bdf8`）
- 高级、克制、科技感，**禁止**模板化设计、彩虹色、大圆角卡片堆叠
- 标题用 Space Grotesk，正文用 Inter
- 动效要克制：缓动用 `var(--ease)`，时长 0.3-1s，支持 `prefers-reduced-motion`

## 部署

- push 到 `main` 分支自动触发 Vercel 部署
- 构建命令 `npm run build`，输出目录 `dist`
- `.gitignore` 已排除 node_modules 和 dist

## 已知坑

- Windows PowerShell 用 `;` 分隔命令，不用 `&&`
- `curl` 是 Invoke-WebRequest 别名，不支持 `-L`，用 `Invoke-WebRequest -Uri -OutFile`
- 无 ffmpeg/ffprobe，视频压缩需其他方式
- GitHub 国内网络可能连不上 443 端口，push 失败时提示用户开 VPN
- dev server 监听 src 目录文件变更，不要在 src 里创建临时文件后删除（会触发 EBUSY 崩溃）
