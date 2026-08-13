import { useState } from 'react'
import AccordionGallery from './AccordionGallery'
import Lightbox from './Lightbox'
import { projects } from '../data/content'

// 作品长廊：手风琴图库 + 点击放大查看全图（多图画库）
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // 手风琴 items：用每个项目的封面图 + 标题
  const accordionItems = projects.map((p) => ({
    image: p.images[0],
    label: p.title,
    alt: p.title,
  }))

  const handleSelect = (index) => {
    setLightboxIndex(index)
  }

  const activeProject = lightboxIndex !== null ? projects[lightboxIndex] : null

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-head">
          <span className="section-head__tag">作品长廊</span>
          <h2 className="section-head__title">
            Project <span className="text-accent">Gallery</span>
          </h2>
          <p className="section-head__desc">
            悬停或点击切换作品，再次点击展开面板查看高清全图与完整图集。
          </p>
        </div>

        <div className="gallery__accordion">
          <AccordionGallery
            items={accordionItems}
            defaultIndex={0}
            accentColor="#5b9dff"
            overlayColor="#07080a"
            textColor="#ffffff"
            grayscale
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={6}
            stagger={0.06}
            trigger="hover"
            height={480}
            gap={8}
            radius={14}
            expandRatio={0.42}
            orientation="horizontal"
            onSelect={handleSelect}
          />
        </div>

        <p className="gallery__hint">点击已展开的作品可放大查看全图与图集</p>
      </div>

      {activeProject && (
        <Lightbox
          images={activeProject.images}
          alt={activeProject.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
