import { useState, useEffect, useCallback } from 'react'

// 图片灯箱：支持多图画库，左右箭头 / 键盘翻页，ESC 关闭
export default function Lightbox({ images = [], alt = '', initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const total = images.length
  const hasMultiple = total > 1

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev()
      if (e.key === 'ArrowRight' && hasMultiple) goNext()
    },
    [onClose, hasMultiple, goPrev, goNext],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const currentSrc = images[index] || ''

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="关闭">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {hasMultiple && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          aria-label="上一张"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {hasMultiple && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          aria-label="下一张"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      <img
        key={index}
        className="lightbox__img"
        src={currentSrc}
        alt={`${alt} - ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="lightbox__meta" onClick={(e) => e.stopPropagation()}>
        {alt && <p className="lightbox__caption">{alt}</p>}
        {hasMultiple && (
          <span className="lightbox__counter">
            {index + 1} / {total}
          </span>
        )}
      </div>
    </div>
  )
}
