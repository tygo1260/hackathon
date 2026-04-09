import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, BookOpen, Zap } from 'lucide-react';
import BookWall from './BookWall';

interface HeroProps {
  onAnalyze: (url: string) => void;
  initialError?: string;
}

export default function Hero({ onAnalyze, initialError }: HeroProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(initialError || '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Enter a URL to analyze');
      return;
    }
    let finalUrl = trimmed;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    try {
      new URL(finalUrl);
    } catch {
      setError('Enter a valid URL');
      return;
    }
    setError('');
    onAnalyze(finalUrl);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <BookWall />

      <div className="relative z-10 max-w-[520px] w-full">
        {/* Card */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full p-10 pb-9 rounded-card bg-white/94 backdrop-blur-[28px] border border-black/[0.06] shadow-card flex flex-col gap-5"
        >
          <h1 className="font-display text-[clamp(28px,5vw,38px)] font-extrabold leading-[1.1] tracking-[-1.5px] text-center text-ink">
            Renovate with{' '}
            <em className="font-serif font-normal italic text-accent">design science</em>
          </h1>

          <p className="text-[15px] font-medium text-ink-muted text-center">
            Paste a website URL for an evidence-based redesign
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="border border-cream-300 rounded-[10px] overflow-hidden transition-all focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(38,78,112,0.08)] bg-white">
              <input
                type="text"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(''); }}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 font-mono text-[13px] text-ink bg-transparent border-none outline-none placeholder:text-ink-dim"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-beni text-xs -mt-1"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="relative w-full py-[18px] px-7 text-[17px] font-bold font-display text-white bg-ink rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(0,0,0,0.22)] active:translate-y-0 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Your Audit
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-medium text-ink-dim text-center mt-5 tracking-wide"
        >
          Backed by 74 principles · 30 patterns · 89 tokens from real design books
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-6 text-xs text-ink-dim"
        >
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Visual analysis
          </span>
          <span className="w-px h-3 bg-cream-300" />
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Literature-backed
          </span>
          <span className="w-px h-3 bg-cream-300" />
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Before / after
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
