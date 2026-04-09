import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Camera, Brain, Paintbrush, CheckCircle2, Scan } from 'lucide-react';

interface LoadingStateProps {
  url: string;
}

const steps = [
  { icon: Globe, label: 'Loading website', duration: 4000 },
  { icon: Camera, label: 'Capturing screenshot', duration: 3000 },
  { icon: Brain, label: 'Analyzing against design literature', duration: 15000 },
  { icon: Paintbrush, label: 'Generating UI improvements', duration: 8000 },
  { icon: CheckCircle2, label: 'Preparing results', duration: 3000 },
];

export default function LoadingState({ url }: LoadingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i < steps.length; i++) {
      elapsed += steps[i - 1].duration;
      timers.push(setTimeout(() => setCurrentStep(i), elapsed));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-sm w-full">
        {/* Animated icon */}
        <div className="flex justify-center mb-10">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Scan className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 rounded-2xl bg-indigo-500/10 blur-xl -z-10"
            />
          </motion.div>
        </div>

        <p className="text-center text-xs text-gray-600 font-mono mb-8 truncate">{url}</p>

        {/* Steps — minimal list */}
        <div className="space-y-3">
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isDone || isActive ? 1 : 0.25, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    isDone
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : isActive
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'text-gray-700'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <step.icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span
                  className={`text-xs ${
                    isDone ? 'text-emerald-400/70' : isActive ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {step.label}
                </span>
                {isActive && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-1 rounded-full bg-indigo-400 ml-auto"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
