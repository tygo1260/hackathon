import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Eye, Zap } from 'lucide-react';

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
      setError('Please enter a website URL');
      return;
    }
    let finalUrl = trimmed;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    try {
      new URL(finalUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }
    setError('');
    onAnalyze(finalUrl);
  }

  const features = [
    { icon: Eye, title: 'Visual Analysis', desc: 'AI-powered screenshot analysis' },
    { icon: BookOpen, title: 'Literature-Backed', desc: 'Grounded in design principles' },
    { icon: Zap, title: 'Instant Results', desc: 'Before/after comparison' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Logo & Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              UI<span className="gradient-text">Sense</span>
            </h1>
          </div>

          <p className="text-xl text-gray-400 mb-2 font-light">
            AI-Powered Design Renovation
          </p>
          <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto">
            Paste any website URL and get evidence-based design improvements
            backed by Nielsen, Gestalt, and Laws of UX.
          </p>
        </motion.div>

        {/* URL Input */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition-opacity blur" />
            <div className="relative flex items-center bg-dark-950 rounded-2xl border border-dark-600/50 overflow-hidden">
              <input
                type="text"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(''); }}
                placeholder="https://example.com"
                className="flex-1 bg-transparent px-6 py-5 text-lg text-white placeholder-gray-600 focus:outline-none font-mono"
                autoFocus
              />
              <button
                type="submit"
                className="m-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl text-white font-semibold flex items-center gap-2 hover:from-indigo-400 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                Analyze
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-3"
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-3 gap-4"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-xl p-5 text-center"
            >
              <f.icon className="w-5 h-5 text-indigo-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Powered by */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-600 mt-10"
        >
          Powered by Claude AI + UI/UX Design MCP Knowledge Base
        </motion.p>
      </div>
    </motion.div>
  );
}
