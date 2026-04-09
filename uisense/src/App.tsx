import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import LoadingState from './components/LoadingState';
import AnalysisView from './components/AnalysisView';

export interface DesignChange {
  component: string;
  issue: string;
  recommendation: string;
  cssSelector: string;
  cssChanges: string;
  principle: string;
  source: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  beforeScreenshot: string;
  afterScreenshot: string;
  summary: string;
  overallScoreBefore: number;
  overallScoreAfter: number;
  changes: DesignChange[];
  cssOverrides: string;
  componentScreenshots: Record<string, string>;
}

type AppState = 'input' | 'loading' | 'results' | 'error';

export default function App() {
  const [state, setState] = useState<AppState>('input');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');

  async function handleAnalyze(url: string) {
    setState('loading');
    setAnalyzedUrl(url);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Analysis failed');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setState('error');
    }
  }

  function handleReset() {
    setState('input');
    setResult(null);
    setError('');
    setAnalyzedUrl('');
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {state === 'input' && <Hero key="hero" onAnalyze={handleAnalyze} />}
        {state === 'loading' && <LoadingState key="loading" url={analyzedUrl} />}
        {state === 'results' && result && (
          <AnalysisView key="results" result={result} url={analyzedUrl} onReset={handleReset} />
        )}
        {state === 'error' && (
          <Hero key="error" onAnalyze={handleAnalyze} initialError={error} />
        )}
      </AnimatePresence>
    </div>
  );
}
