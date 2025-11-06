import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Tooltip rendered into a portal with fixed positioning
const PortalTooltip = React.forwardRef(({ visible, coords, detail, placeBelow, widthCorrection }, ref) => {
  if (!visible) return null;
  const { left, top } = coords; // viewport coords
  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left,
        top,
        transform: 'translateX(-50%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 200ms ease, transform 200ms ease',
        zIndex: 9999,
      }}
      className="plainText text-base px-4 w-max rounded p-2 shadow-lg
                 bg-gray-800 text-white
                 dark:bg-white dark:text-gray-900 dark:border dark:border-neutral-700"
      aria-hidden={!visible}
    >
      {detail}
      {placeBelow ? (
        <div
          className="absolute bottom-full h-3 w-3
                     bg-gray-800 dark:bg-white"
          style={{ left: `calc(50% - ${widthCorrection}px)`, transform: 'translate(-50%, 50%) rotate(45deg)' }}
        />
      ) : (
        <div
          className="absolute top-full h-3 w-3
                     bg-gray-800 dark:bg-white"
          style={{ left: `calc(50% - ${widthCorrection}px)`, transform: 'translate(-50%, -50%) rotate(45deg)' }}
        />
      )}
    </div>,
    document.body
  );
});
PortalTooltip.displayName = 'PortalTooltip';

const HoverDetail = ({ children, className, detail }) => {
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  const [isDetailVisible, setDetailVisible] = useState(false);
  const [placeBelow, setPlaceBelow] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });
  const [widthCorrection, setWidthCorrection] = useState(0); // horizontal clamp shift (used by arrow)

  useLayoutEffect(() => {
    if (!isDetailVisible || !wrapperRef.current) return;

    const clampWithinViewport = () => {
      const trigger = wrapperRef.current;
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 12;

      // Decide vertical placement
      const spaceAbove = triggerRect.top;
      const spaceBelow = viewportHeight - triggerRect.bottom;

      // Measure tooltip (may be null on first tick)
      const ttWidth = tooltipEl?.offsetWidth ?? 200;
      const ttHeight = tooltipEl?.offsetHeight ?? 40;

      const shouldPlaceBelow = spaceAbove < ttHeight + padding && spaceBelow > spaceAbove;
      setPlaceBelow(shouldPlaceBelow);

      // Horizontal clamping
      const centerX = triggerRect.left + triggerRect.width / 2;
      let left = centerX;
      let correction = 0;

      const minLeft = padding + ttWidth / 2;
      const maxLeft = viewportWidth - padding - ttWidth / 2;
      if (left < minLeft) {
        correction = minLeft - left;
        left = minLeft;
      } else if (left > maxLeft) {
        correction = maxLeft - left;
        left = maxLeft;
      }
      setWidthCorrection(correction);

      // Vertical position: just above or below trigger with 8px gap
      const gap = 8;
      const top = shouldPlaceBelow
        ? triggerRect.bottom + gap
        : triggerRect.top - ttHeight - gap;

      setCoords({ left, top });
    };

    clampWithinViewport();
    // Recompute on changes
    window.addEventListener('resize', clampWithinViewport);
    window.addEventListener('scroll', clampWithinViewport, true);
    const id = requestAnimationFrame(clampWithinViewport); // ensure we get a pass after first paint

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', clampWithinViewport);
      window.removeEventListener('scroll', clampWithinViewport, true);
    };
  }, [isDetailVisible]);

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-block overflow-visible ${className || ''}`}
      onMouseEnter={() => setDetailVisible(true)}
      onMouseLeave={() => setDetailVisible(false)}
    >
      <PortalTooltip
        ref={tooltipRef}
        visible={isDetailVisible}
        coords={coords}
        detail={detail}
        placeBelow={placeBelow}
        widthCorrection={widthCorrection}
      />
      {children}
    </div>
  );
};

export default HoverDetail;
