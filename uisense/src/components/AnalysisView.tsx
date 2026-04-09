import { motion } from 'framer-motion';
import { ArrowLeft, Scan, TrendingUp, ExternalLink } from 'lucide-react';
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
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="5" />
          <motion.circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xl font-display font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className="text-[11px] text-gray-500 mt-2 font-medium uppercase tracking-wider">{label}</span>
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
      {/* Header — minimal, functional */}
      <header className="sticky top-0 z-50 bg-[#06060e]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              New analysis
            </button>
            <div className="w-px h-4 bg-white/[0.06]" />
            <div className="flex items-center gap-2">
              <Scan className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-display font-semibold text-white/80">UISense</span>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-gray-400 transition-colors font-mono"
          >
            {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Score + Summary — no card, just content */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row items-start gap-8 mb-12"
        >
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-bold text-white mb-3 tracking-tight">
              Analysis Complete
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">{result.summary}</p>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <ScoreRing score={result.overallScoreBefore} label="Before" color="#ef4444" />
            <div className="flex flex-col items-center gap-0.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-display font-bold text-emerald-400">+{improvement}</span>
            </div>
            <ScoreRing score={result.overallScoreAfter} label="After" color="#22c55e" />
          </div>
        </motion.section>

        {/* Before/After — the dominant visual proof */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-14"
        >
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
              Visual Comparison
            </h2>
            <span className="text-[11px] text-gray-600">Drag to compare</span>
          </div>
          <BeforeAfterSlider
            beforeImage={result.beforeScreenshot}
            afterImage={result.afterScreenshot}
          />
        </motion.section>

        {/* Changes — clean list, minimal chrome */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
              Changes Applied
            </h2>
            <span className="text-[11px] text-gray-600 font-mono">
              {result.changes.length} improvements
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {result.changes.map((change, i) => (
              <ChangeCard
                key={i}
                change={change}
                index={i}
                componentScreenshot={result.componentScreenshots?.[i.toString()]}
              />
            ))}
          </div>
        </motion.section>

        <div className="py-16 text-center text-[11px] text-gray-700">
          Powered by Claude AI + UI/UX Design MCP Knowledge Base
        </div>
      </main>
    </motion.div>
  );
}
