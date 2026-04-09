import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, ExternalLink } from 'lucide-react';
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
          <circle cx="48" cy="48" r="42" fill="none" stroke="#e0dbd0" strokeWidth="5" />
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
            className="text-xl font-display font-bold text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className="text-[11px] text-ink-dim mt-2 font-medium uppercase tracking-wider">{label}</span>
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
      <header className="sticky top-0 z-50 h-14 flex items-center justify-center px-6 bg-cream-100/80 backdrop-blur-2xl border-b border-cream-300">
        <div className="w-full max-w-[1200px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors rounded-md px-2 py-1 hover:bg-black/[0.04]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              New analysis
            </button>
            <div className="w-px h-4 bg-cream-300" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[15px] font-bold tracking-[-0.3px] text-ink">UISense</span>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-ink-dim hover:text-ink-muted transition-colors font-mono"
          >
            {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Score + Summary */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row items-start gap-8 mb-12"
        >
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-ink tracking-[-1px] mb-3">
              Analysis Complete
            </h1>
            <p className="text-sm text-ink-muted leading-relaxed">{result.summary}</p>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <ScoreRing score={result.overallScoreBefore} label="Before" color="#9B4E4E" />
            <div className="flex flex-col items-center gap-0.5">
              <TrendingUp className="w-4 h-4 text-sage" />
              <span className="text-sm font-display font-bold text-sage">+{improvement}</span>
            </div>
            <ScoreRing score={result.overallScoreAfter} label="After" color="#5B7553" />
          </div>
        </motion.section>

        {/* Before/After */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-14"
        >
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display text-sm font-bold text-ink uppercase tracking-wider">
              Visual Comparison
            </h2>
            <span className="text-[11px] text-ink-dim">Drag to compare</span>
          </div>
          <BeforeAfterSlider
            beforeImage={result.beforeScreenshot}
            afterImage={result.afterScreenshot}
          />
        </motion.section>

        {/* Changes */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display text-sm font-bold text-ink uppercase tracking-wider">
              Changes Applied
            </h2>
            <span className="text-[11px] text-ink-dim font-mono">
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

        <footer className="py-12 text-center text-[13px] font-medium text-ink-dim border-t border-cream-300 mt-16">
          Built for the Lovable Hackathon · Powered by{' '}
          <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 decoration-accent/25 hover:decoration-accent">
            Claude
          </a>
          {' '}+ uiux MCP
        </footer>
      </main>
    </motion.div>
  );
}
