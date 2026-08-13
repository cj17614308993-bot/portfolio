import { videos } from '../data/content'

// 视频展示模块：静音自动循环播放，支持 controls 取消静音 / 全屏
export default function VideoShowcase() {
  return (
    <section className="videos" id="videos">
      <div className="container">
        <div className="section-head">
          <span className="section-head__tag">动态演示</span>
          <h2 className="section-head__title">
            Motion <span className="text-accent">Showcase</span>
          </h2>
          <p className="section-head__desc">
            从车机开机动画到 UI 交互、从实时渲染到 3D 可视化 —— 点击视频可取消静音、全屏观看。
          </p>
        </div>

        <div className="videos__grid">
          {videos.map((v) => (
            <article className={`video-card video-card--${v.size || 'medium'}`} key={v.id}>
              <div className="video-card__player">
                <video
                  src={v.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  controls
                  loading="lazy"
                  preload="metadata"
                  aria-label={v.title}
                />
              </div>
              <div className="video-card__info">
                <h3 className="video-card__title">{v.title}</h3>
                <span className="video-card__subtitle">{v.titleEn}</span>
                <p className="video-card__desc">{v.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
