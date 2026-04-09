import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUp, Minus, BookOpen } from 'lucide-react';
import type { DesignChange } from '../App';

interface ChangeCardProps {
  change: DesignChange;
  index: number;
}

const impactConfig = {
  critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Critical' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'High' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Medium' },
  low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: 'Low' },
};

function ImpactIcon({ impact }: { impact: string }) {
  switch (impact) {
    case 'critical':
      return <AlertTriangle className="w-3.5 h-3.5" />;
    case 'high':
      return <ArrowUp className="w-3.5 h-3.5" />;
    default:
      return <Minus className="w-3.5 h-3.5" />;
  }
}

export default function ChangeCard({ change, index }: ChangeCardProps) {
  const impact = impactConfig[change.impact] || impactConfig.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className="glass-card rounded-xl p-5 hover:bg-dark-800/40 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500">#{index + 1}</span>
          <h3 className="text-sm font-semibold text-white">{change.component}</h3>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${impact.bg} ${impact.color} ${impact.border} border`}>
          <ImpactIcon impact={change.impact} />
          {impact.label}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-2">
        <span className="text-red-400/70 font-medium">Issue: </span>
        {change.issue}
      </p>

      <p className="text-sm text-gray-300 mb-3">
        <span className="text-green-400/70 font-medium">Fix: </span>
        {change.recommendation}
      </p>

      {/* CSS change preview */}
      <div className="bg-dark-950/60 rounded-lg p-3 mb-3 font-mono text-xs overflow-x-auto">
        <span className="text-indigo-400">{change.cssSelector}</span>
        <span className="text-gray-500"> {'{'} </span>
        <br />
        {change.cssChanges.split(';').filter(Boolean).map((prop, i) => (
          <div key={i} className="pl-4">
            <span className="text-emerald-400">{prop.trim()}</span>
            <span className="text-gray-500">;</span>
          </div>
        ))}
        <span className="text-gray-500">{'}'}</span>
      </div>

      {/* Citation */}
      <div className="flex items-start gap-2 text-xs text-gray-500">
        <BookOpen className="w-3.5 h-3.5 mt-0.5 text-indigo-400/60 shrink-0" />
        <div>
          <span className="text-indigo-400/80 font-medium">{change.principle}</span>
          {change.source && <span className="text-gray-600"> — {change.source}</span>}
        </div>
      </div>
    </motion.div>
  );
}
