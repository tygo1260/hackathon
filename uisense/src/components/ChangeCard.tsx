import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUp, Minus, BookOpen } from 'lucide-react';
import type { DesignChange } from '../App';

interface ChangeCardProps {
  change: DesignChange;
  index: number;
}

const impactColors: Record<string, string> = {
  critical: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-yellow-400',
  low: 'text-blue-400',
};

function ImpactIcon({ impact }: { impact: string }) {
  const cls = `w-3 h-3 ${impactColors[impact] || 'text-gray-500'}`;
  if (impact === 'critical') return <AlertTriangle className={cls} />;
  if (impact === 'high') return <ArrowUp className={cls} />;
  return <Minus className={cls} />;
}

export default function ChangeCard({ change, index }: ChangeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.06 }}
      className="group p-4 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-600">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="text-sm font-display font-semibold text-white">{change.component}</h3>
        </div>
        <ImpactIcon impact={change.impact} />
      </div>

      {/* Issue → Fix */}
      <p className="text-xs text-gray-500 mb-1.5 leading-relaxed">
        {change.issue}
      </p>
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

      {/* Citation — subtle, always visible */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
        <BookOpen className="w-3 h-3 text-indigo-500/50" />
        <span className="text-indigo-400/60">{change.principle}</span>
        {change.source && (
          <>
            <span className="text-gray-700">·</span>
            <span className="truncate">{change.source}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
