import { useEffect, useRef } from 'react';

const coverModules = import.meta.glob('/src/assets/books/*.jpg', {
  eager: true,
  import: 'default',
});
const allCovers = Object.values(coverModules) as string[];

const rows = [
  allCovers.slice(0, 6),
  allCovers.slice(6, 12),
  allCovers.slice(12),
  [...allCovers.slice(3, 9)],
];

const tilts = [-1.8, 1.2, -0.6, 1.8, -1.2, 0.8, -0.4, 1.5, -1, 0.6, -1.6, 0.9];

export default function BookWall() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty('--px', `${cx * 6}px`);
      el.style.setProperty('--py', `${cy * 4}px`);
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    const onLeave = () => {
      el.style.setProperty('--mx', '-999px');
      el.style.setProperty('--my', '-999px');
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const renderRows = () =>
    rows.map((row, i) => (
      <div
        key={i}
        className={`book-row ${i % 2 === 0 ? 'scroll-right' : 'scroll-left'}`}
        style={{ animationDuration: `${50 + i * 12}s` } as React.CSSProperties}
      >
        {[...row, ...row, ...row].map((cover, j) => (
          <img
            key={`${i}-${j}`}
            src={cover}
            alt=""
            className="book-cover"
            loading="lazy"
            draggable={false}
            style={{ transform: `rotate(${tilts[j % tilts.length]}deg)` }}
          />
        ))}
      </div>
    ));

  return (
    <div className="book-wall" ref={ref}>
      <div className="book-wall-layer book-wall-base">{renderRows()}</div>
      <div className="book-wall-layer book-wall-reveal">{renderRows()}</div>
    </div>
  );
}
