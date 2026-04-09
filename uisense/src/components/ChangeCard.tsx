import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUp, Minus, BookOpen } from 'lucide-react';
import type { DesignChange } from '../App';

interface ChangeCardProps {
  change: DesignChange;
  index: number;
  componentScreenshot?: string;
}

const impactConfig: Record<string, { color: string; label: string }> = {
  critical: { color: 'text-red-400', label: 'Critical' },
  high: { color: 'text-orange-400', label: 'High' },
  medium: { color: 'text-yellow-400', label: 'Medium' },
  low: { color: 'text-blue-400', label: 'Low' },
};

function ImpactIcon({ impact }: { impact: string }) {
  const cls = `w-3 h-3 ${impactConfig[impact]?.color || 'text-gray-500'}`;
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
      className="flex rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all overflow-hidden"
    >
      {/* Left: change details */}
      <div className="flex-1 p-5 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-mono text-gray-600 shrink-0">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="text-sm font-display font-semibold text-white truncate">{change.component}</h3>
          </div>
          <span className={`flex items-center gap-1 text-[10px] font-medium shrink-0 ml-2 ${impact.color}`}>
            <ImpactIcon impact={change.impact} />
            {impact.label}
          </span>
        </div>

        {/* Issue */}
        <p className="text-xs text-gray-500 mb-1.5 leading-relaxed">
          {change.issue}
        </p>

        {/* Recommendation */}
        <p className="text-xs text-gray-300 mb-3 leading-relaxed">
          {change.recommendation}
        </p>

        {/* CSS */}
        <div className="bg-black/30 rounded-md px-3 py-2 mb-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
          <span className="text-indigo-400">{change.cssSelector}</span>
          <span className="text-gray-600"> {'{ '}</span>
          {change.cssChanges.split(';').filter(Boolean).map((prop, i) => (
            <span key={i}>
              <span className="text-emerald-400/80">{prop.trim()}</span>
              <span className="text-gray-600">; </span>
            </span>
          ))}
          <span className="text-gray-600">{'}'}</span>
        </div>

        {/* Citation */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
          <BookOpen className="w-3 h-3 text-indigo-500/50 shrink-0" />
          <span className="text-indigo-400/60 shrink-0">{change.principle}</span>
          {change.source && (
            <>
              <span className="text-gray-700">·</span>
              <span className="truncate">{change.source}</span>
            </>
          )}
        </div>
      </div>

      {/* Right: component visual */}
      <div className="w-[340px] shrink-0 border-l border-white/[0.04] bg-black/20 overflow-hidden">
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
