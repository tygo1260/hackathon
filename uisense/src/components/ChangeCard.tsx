import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUp, Minus, BookOpen, Type } from 'lucide-react';
import type { DesignChange } from '../App';

interface ChangeCardProps {
  change: DesignChange;
  index: number;
  componentScreenshot?: string;
}

const impactConfig: Record<string, { color: string; label: string }> = {
  critical: { color: 'text-beni', label: 'Critical' },
  high: { color: 'text-accent-warm', label: 'High' },
  medium: { color: 'text-ink-muted', label: 'Medium' },
  low: { color: 'text-accent', label: 'Low' },
};

function ImpactIcon({ impact }: { impact: string }) {
  const cls = `w-3 h-3 ${impactConfig[impact]?.color || 'text-ink-dim'}`;
  if (impact === 'critical') return <AlertTriangle className={cls} />;
  if (impact === 'high') return <ArrowUp className={cls} />;
  return <Minus className={cls} />;
}

export default function ChangeCard({ change, index, componentScreenshot }: ChangeCardProps) {
  const impact = impactConfig[change.impact] || impactConfig.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.06 }}
      className="flex rounded-[14px] border border-cream-300 bg-white overflow-hidden transition-all hover:shadow-card-hover hover:-translate-y-px hover:border-cream-400"
    >
      {/* Left: change details */}
      <div className="flex-1 p-5 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-mono text-ink-dim shrink-0">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="text-[15px] font-display font-bold text-ink tracking-[-0.3px] truncate">{change.component}</h3>
          </div>
          <span className={`flex items-center gap-1 text-[10px] font-medium shrink-0 ml-2 ${impact.color}`}>
            <ImpactIcon impact={change.impact} />
            {impact.label}
          </span>
        </div>

        {/* Issue */}
        <p className="text-xs text-ink-dim mb-1.5 leading-relaxed">
          {change.issue}
        </p>

        {/* Recommendation */}
        <p className="text-xs text-ink-muted mb-3 leading-relaxed font-medium">
          {change.recommendation}
        </p>

        {/* Content change */}
        {change.contentChange && (
          <div className="flex items-start gap-2 bg-accent/[0.06] rounded-lg px-3 py-2 mb-3 border border-accent/10">
            <Type className="w-3 h-3 text-accent mt-0.5 shrink-0" />
            <p className="text-[11px] text-accent font-medium leading-relaxed">
              {change.contentChange}
            </p>
          </div>
        )}

        {/* CSS */}
        <div className="bg-cream-100 rounded-lg px-3 py-2 mb-3 font-mono text-[11px] leading-relaxed overflow-x-auto border border-cream-300/60">
          <span className="text-accent">{change.cssSelector}</span>
          <span className="text-ink-dim"> {'{ '}</span>
          {change.cssChanges.split(';').filter(Boolean).map((prop, i) => (
            <span key={i}>
              <span className="text-sage">{prop.trim()}</span>
              <span className="text-ink-dim">; </span>
            </span>
          ))}
          <span className="text-ink-dim">{'}'}</span>
        </div>

        {/* Citation */}
        <div className="flex items-center gap-1.5 text-[11px] text-ink-dim">
          <BookOpen className="w-3 h-3 text-accent/40 shrink-0" />
          <span className="text-accent/70 font-medium shrink-0">{change.principle}</span>
          {change.source && (
            <>
              <span className="text-cream-400">·</span>
              <span className="truncate">{change.source}</span>
            </>
          )}
        </div>
      </div>

      {/* Right: component visual */}
      <div className="w-[340px] shrink-0 border-l border-cream-300 bg-cream-100 overflow-hidden">
        {componentScreenshot && (
          <img
            src={componentScreenshot}
            alt={`${change.component} after change`}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        )}
      </div>
    </motion.div>
  );
}
