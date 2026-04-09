import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scan, BookOpen, Eye, Zap } from 'lucide-react';

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
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Single focused glow — not scattered blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full">
        {/* Brand */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Scan className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-white/90">UISense</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5">
            Renovate any website<br />
            <span className="text-indigo-400">with design science</span>
          </h1>

          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            Paste a URL. Get specific UI improvements grounded in
            Nielsen, Gestalt, and Laws of UX — with before/after proof.
          </p>
        </motion.div>

        {/* Input — the dominant interaction */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center bg-white/[0.04] rounded-xl border border-white/[0.06] overflow-hidden transition-colors focus-within:border-indigo-500/40 focus-within:bg-white/[0.06]">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              placeholder="https://example.com"
              className="flex-1 bg-transparent px-5 py-4 text-[15px] text-white placeholder-gray-600 focus:outline-none font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="m-1.5 px-5 py-2.5 bg-indigo-500 rounded-lg text-white text-sm font-semibold flex items-center gap-2 hover:bg-indigo-400 transition-colors"
            >
              Analyze
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400/80 text-xs mt-2.5 pl-1"
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        {/* Trust row — not cards, just inline facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex items-center justify-center gap-8 text-xs text-gray-600"
        >
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            Visual analysis
          </span>
          <span className="w-px h-3 bg-gray-800" />
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-gray-500" />
            70+ design principles
          </span>
          <span className="w-px h-3 bg-gray-800" />
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gray-500" />
            Before / after proof
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
