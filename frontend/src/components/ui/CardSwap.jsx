import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export function Card({
  category,
  heading,
  description,
  number = '01 / 05',
  actionLabel = 'Explore Knowledge',
  ambientGradient = 'linear-gradient(135deg, rgba(255, 253, 249, 0.95) 0%, rgba(255, 247, 237, 0.85) 100%)',
  glowColor = 'rgba(249, 115, 22, 0.15)',
  categoryAccent = '#EA580C',
  className = '',
  onActionClick
}) {
  const handleAction = (e) => {
    e.stopPropagation();
    if (onActionClick) {
      onActionClick();
    }
  };

  return (
    <div
      className={`setu-card ${className}`}
      style={{
        '--setu-card-accent': categoryAccent
      }}
    >
      {/* 1. Subtle Ambient Gradient */}
      <div
        className="setu-card__ambient"
        style={{
          background: ambientGradient
        }}
      />

      {/* 2. Soft Corner Glow */}
      <div
        className="setu-card__decoration"
        style={{
          background: glowColor
        }}
      />

      {/* 3. Minimal Heritage Watermark Arc */}
      <div className="setu-card__watermark" />

      {/* 4. Top Row */}
      <div className="setu-card__top">
        <div className="setu-card__category">
          <span className="setu-card__category-dot" />
          <span>{category}</span>
        </div>
        <button
          type="button"
          onClick={handleAction}
          className="setu-card__icon-btn"
          aria-label={`Explore ${category}`}
        >
          ↗
        </button>
      </div>

      {/* 5. Main Editorial Content */}
      <div className="setu-card__content">
        <h3 className="setu-card__title">
          {heading}
        </h3>
        <p className="setu-card__description">
          {description}
        </p>
      </div>

      {/* 6. Bottom Metadata Footer */}
      <div className="setu-card__footer">
        <span className="setu-card__number">
          {number}
        </span>
        <button
          type="button"
          onClick={handleAction}
          className="setu-card__action cursor-pointer bg-transparent border-none p-0"
        >
          <span>{actionLabel}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export default function CardSwap({
  children,
  width = 430,
  height = 320,
  cardDistance = 45,
  verticalDistance = 55,
  delay = 4000,
  pauseOnHover = true,
  skewAmount = 4,
  easing = 'elastic',
  onCardClick,
  className = ''
}) {
  const cards = React.Children.toArray(children);
  const totalCards = cards.length;

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [order, setOrder] = useState(() => Array.from({ length: totalCards }, (_, i) => i));
  const isHoveredRef = useRef(false);
  const isAnimatingRef = useRef(false);

  // Initialize and update card transforms according to their slot position
  const updateCardPositions = useCallback(() => {
    if (!cardRefs.current.length) return;

    order.forEach((cardIndex, slot) => {
      const cardEl = cardRefs.current[cardIndex];
      if (!cardEl) return;

      const targetX = slot * (cardDistance * 0.55);
      const targetY = -slot * (verticalDistance * 0.42);
      const targetScale = 1 - slot * 0.045;
      const targetOpacity = slot === 0 ? 1 : Math.max(0.72, 1 - slot * 0.09);
      const targetZIndex = (totalCards - slot) * 10;
      const targetRotateZ = slot * 2.2;
      const targetSkewX = slot === 0 ? 0 : -slot * (skewAmount * 0.7);

      const innerCard = cardEl.querySelector('.setu-card');
      if (innerCard) {
        if (slot === 0) {
          innerCard.classList.add('setu-card--front');
        } else {
          innerCard.classList.remove('setu-card--front');
        }
      }

      gsap.set(cardEl, {
        x: targetX,
        y: targetY,
        scale: targetScale,
        opacity: targetOpacity,
        zIndex: targetZIndex,
        rotateZ: targetRotateZ,
        skewX: targetSkewX,
        transformOrigin: 'center bottom'
      });
    });
  }, [order, totalCards, cardDistance, verticalDistance, skewAmount]);

  useEffect(() => {
    updateCardPositions();
  }, [updateCardPositions]);

  // Smooth card swap animation
  const swapCard = useCallback(() => {
    if (isAnimatingRef.current || totalCards <= 1) return;
    isAnimatingRef.current = true;

    const currentOrder = [...order];
    const frontCardIdx = currentOrder[0];
    const frontEl = cardRefs.current[frontCardIdx];

    const easeCurve = easing === 'elastic' ? 'elastic.out(1, 0.75)' : 'power2.out';

    const tl = gsap.timeline({
      onComplete: () => {
        const nextOrder = [...currentOrder.slice(1), currentOrder[0]];
        setOrder(nextOrder);
        isAnimatingRef.current = false;
      }
    });

    // 1. Throw front card smoothly outward
    tl.to(frontEl, {
      x: -150,
      y: -50,
      rotateZ: -10,
      scale: 0.92,
      opacity: 0.25,
      duration: 0.42,
      ease: 'power2.in'
    });

    // 2. Advance intermediate cards forward
    for (let slot = 1; slot < totalCards; slot++) {
      const cardIdx = currentOrder[slot];
      const cardEl = cardRefs.current[cardIdx];
      const targetSlot = slot - 1;

      const targetX = targetSlot * (cardDistance * 0.55);
      const targetY = -targetSlot * (verticalDistance * 0.42);
      const targetScale = 1 - targetSlot * 0.045;
      const targetOpacity = targetSlot === 0 ? 1 : Math.max(0.72, 1 - targetSlot * 0.09);
      const targetZIndex = (totalCards - targetSlot) * 10;
      const targetRotateZ = targetSlot * 2.2;
      const targetSkewX = targetSlot === 0 ? 0 : -targetSlot * (skewAmount * 0.7);

      const innerCard = cardEl.querySelector('.setu-card');
      if (innerCard) {
        if (targetSlot === 0) {
          innerCard.classList.add('setu-card--front');
        } else {
          innerCard.classList.remove('setu-card--front');
        }
      }

      gsap.to(cardEl, {
        x: targetX,
        y: targetY,
        scale: targetScale,
        opacity: targetOpacity,
        zIndex: targetZIndex,
        rotateZ: targetRotateZ,
        skewX: targetSkewX,
        duration: 0.75,
        ease: easeCurve
      });
    }

    // 3. Bring previous front card to the back of the deck
    const backSlot = totalCards - 1;
    const backX = backSlot * (cardDistance * 0.55);
    const backY = -backSlot * (verticalDistance * 0.42);
    const backScale = 1 - backSlot * 0.045;
    const backOpacity = Math.max(0.72, 1 - backSlot * 0.09);
    const backRotateZ = backSlot * 2.2;
    const backSkewX = -backSlot * (skewAmount * 0.7);

    tl.set(frontEl, {
      zIndex: 1
    });

    const frontInner = frontEl.querySelector('.setu-card');
    if (frontInner) {
      frontInner.classList.remove('setu-card--front');
    }

    tl.to(frontEl, {
      x: backX,
      y: backY,
      rotateZ: backRotateZ,
      skewX: backSkewX,
      scale: backScale,
      opacity: backOpacity,
      duration: 0.7,
      ease: easeCurve
    });

  }, [order, totalCards, cardDistance, verticalDistance, skewAmount, easing]);

  // Autoplay loop with delay (pauses properly on hover)
  useEffect(() => {
    if (delay <= 0) return;

    const intervalId = setInterval(() => {
      if (!isHoveredRef.current) {
        swapCard();
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [delay, swapCard]);

  const handlePointerEnter = () => {
    if (pauseOnHover) {
      isHoveredRef.current = true;
    }
  };

  const handlePointerLeave = () => {
    if (pauseOnHover) {
      isHoveredRef.current = false;
    }
  };

  const handleCardClickInternal = (cardIdx, slotIndex) => {
    if (onCardClick) {
      onCardClick(cardIdx);
    }
    // Swap on any card click (or front card)
    swapCard();
  };

  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`card-swap-container relative mx-auto ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
        maxWidth: '100%'
      }}
    >
      {cards.map((child, idx) => {
        const slot = order.indexOf(idx);
        return (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            onClick={() => handleCardClickInternal(idx, slot)}
            className="card-swap-card cursor-pointer"
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
