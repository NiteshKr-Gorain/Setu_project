import { useEffect, useMemo, useState } from 'react';
import './DepthCarousel.css';

const normalizeItem = (item) => (typeof item === 'string' ? { image: item, alt: '' } : item);

export default function DepthCarousel({
  items = [], cardWidth = 280, cardHeight = 350, depth = 135, spread = 42, tilt = 14,
  tiltDirection = 'right', visibleCards = 3, autoplay = true, autoplayDelay = 3200,
  loop = true, showControls = true, className = '',
}) {
  const slides = useMemo(() => items.map(normalizeItem), [items]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const goTo = (index) => count && setActive(loop ? (index + count) % count : Math.max(0, Math.min(index, count - 1)));

  useEffect(() => {
    if (!autoplay || paused || count < 2) return undefined;
    const timer = window.setInterval(() => goTo(active + 1), autoplayDelay);
    return () => window.clearInterval(timer);
  }, [active, autoplay, autoplayDelay, count, paused]);

  const offsetFor = (index) => {
    let offset = index - active;
    if (loop && count > 1) {
      if (offset > count / 2) offset -= count;
      if (offset < -count / 2) offset += count;
    }
    return offset;
  };
  const direction = tiltDirection === 'left' ? -1 : 1;

  return (
    <div className={`depth-carousel ${className}`.trim()} role="region" aria-roledescription="carousel" aria-label="Stories and traditions" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="depth-carousel__stage">
        {slides.map((slide, index) => {
          const offset = offsetFor(index);
          const distance = Math.abs(offset);
          const visible = distance <= visibleCards;
          return (
            <button
              key={slide.image}
              type="button"
              className="depth-carousel__card"
              style={{
                width: cardWidth, height: cardHeight, opacity: visible ? Math.max(0.22, 1 - distance * 0.24) : 0,
                zIndex: 100 - distance,
                transform: `translate(-50%, -50%) translateX(${direction * offset * spread}px) translateZ(${-distance * depth}px) rotateY(${direction * offset * tilt}deg) scale(${1 - distance * 0.06})`,
                filter: `brightness(${1 - distance * 0.14}) blur(${Math.max(0, distance - 1) * 1.2}px)`,
              }}
              onClick={() => goTo(index)}
              aria-label={`Show image ${index + 1}: ${slide.alt || 'Story'}`}
              aria-current={active === index ? 'true' : undefined}
              tabIndex={visible ? 0 : -1}
            >
              <img src={slide.image} alt={slide.alt || ''} draggable="false" />
            </button>
          );
        })}
      </div>
      {showControls && count > 1 && <div className="depth-carousel__controls"><button type="button" onClick={() => goTo(active - 1)} aria-label="Previous image">‹</button><button type="button" onClick={() => goTo(active + 1)} aria-label="Next image">›</button></div>}
      {count > 1 && <div className="depth-carousel__dots" aria-label="Carousel pages">{slides.map((slide, index) => <button key={slide.image} type="button" className={active === index ? 'is-active' : ''} onClick={() => goTo(index)} aria-label={`Go to image ${index + 1}`} />)}</div>}
    </div>
  );
}
