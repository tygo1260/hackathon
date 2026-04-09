import { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden cursor-col-resize select-none border border-cream-300 shadow-card"
      style={{ aspectRatio: '16 / 10' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <img
        src={afterImage}
        alt="After redesign"
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before redesign"
          className="absolute top-0 left-0 h-full object-cover object-top"
          style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute inset-0 w-0.5 bg-ink/40 mx-auto" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center pointer-events-auto border border-cream-300">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4L3 9L6 14" stroke="#264E70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 4L15 9L12 14" stroke="#264E70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-ink/70 backdrop-blur-sm text-[11px] font-bold tracking-wider text-white z-20 uppercase">
        Before
      </div>
      <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-accent/90 backdrop-blur-sm text-[11px] font-bold tracking-wider text-white z-20 uppercase">
        After
      </div>
    </div>
  );
}
