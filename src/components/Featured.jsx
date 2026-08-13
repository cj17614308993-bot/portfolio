import DepthCarousel from './DepthCarousel'
import { projects } from '../data/content'

// 精选作品 3D 深度轮播展示区
export default function Featured() {
  // 取每个项目的第一张封面图
  const items = projects.map((p) => ({
    image: p.images[0],
    alt: p.title,
  }))

  return (
    <section className="featured" id="featured">
      <div className="container">
        <div className="section-head">
          <span className="section-head__tag">精选作品</span>
          <h2 className="section-head__title">
            Featured <span className="text-accent">Works</span>
          </h2>
          <p className="section-head__desc">
            从离线渲染到实时交互，从硬表面建模到智能驾驶可视化 —— 拖动、滚轮或点击探索作品。
          </p>
        </div>
        <div className="featured__carousel">
          <DepthCarousel
            items={items}
            cardWidth={340}
            cardHeight={440}
            radius={16}
            tint="#07080a"
            depth={220}
            spread={80}
            tilt={18}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.25}
            blur={8}
            duration={700}
            ease="power3.out"
            autoplay
            autoplayDelay={4000}
            loop
            showControls
            showIndicators
          />
        </div>
      </div>
    </section>
  )
}
