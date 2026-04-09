import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, TrendingUp, ExternalLink } from 'lucide-react';
import type { AnalysisResult } from '../App';
import BeforeAfterSlider from './BeforeAfterSlider';
import ChangeCard from './ChangeCard';

interface AnalysisViewProps {
  result: AnalysisResult;
  url: string;
  onReset: () => void;
}

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" stroke="#1f1f49" strokeWidth="6" />
          <motion.circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className="text-xs text-gray-500 mt-2 font-medium">{label}</span>
    </div>
  );
}

export default function AnalysisView({ result, url, onReset }: AnalysisViewProps) {
  const improvement = result.overallScoreAfter - result.overallScoreBefore;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-dark-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              New Analysis
            </button>
            <div className="w-px h-6 bg-dark-700" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold gradient-text">UISense</span>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors font-mono"
          >
            {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Score Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-2">Design Analysis</h2>
              <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">{result.summary}</p>
            </div>
            <div className="flex items-center gap-6 ml-8">
              <ScoreRing score={result.overallScoreBefore} label="Before" color="#ef4444" />
              <div className="flex flex-col items-center">
                <TrendingUp className="w-5 h-5 text-green-400 mb-1" />
                <span className="text-lg font-bold text-green-400">+{improvement}</span>
              </div>
              <ScoreRing score={result.overallScoreAfter} label="After" color="#22c55e" />
            </div>
          </div>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            Visual Comparison
            <span className="text-xs text-gray-500 font-normal">Drag the slider to compare</span>
          </h2>
          <BeforeAfterSlider
            beforeImage={result.beforeScreenshot}
            afterImage={result.afterScreenshot}
          />
        </motion.div>

        {/* Changes List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            Design Changes
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">
              {result.changes.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {result.changes.map((change, i) => (
              <ChangeCard key={i} change={change} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-12 text-xs text-gray-600">
          Analysis powered by Claude AI + UI/UX Design MCP Knowledge Base
        </div>
      </main>
    </motion.div>
  );
}
