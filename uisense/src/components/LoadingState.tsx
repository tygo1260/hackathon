import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Camera, Brain, Paintbrush, CheckCircle2 } from 'lucide-react';

interface LoadingStateProps {
  url: string;
}

const steps = [
  { icon: Globe, label: 'Loading website...', duration: 4000 },
  { icon: Camera, label: 'Capturing screenshot...', duration: 3000 },
  { icon: Brain, label: 'Analyzing with design literature...', duration: 15000 },
  { icon: Paintbrush, label: 'Generating UI improvements...', duration: 8000 },
  { icon: CheckCircle2, label: 'Preparing results...', duration: 3000 },
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
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="max-w-lg w-full text-center">
        {/* Animated orb */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl"
          />
          <motion.div
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-4 rounded-full bg-violet-500/20 blur-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              {(() => {
                const Icon = steps[currentStep].icon;
                return <Icon className="w-8 h-8 text-white" />;
              })()}
            </motion.div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">Analyzing Design</h2>
        <p className="text-sm text-gray-500 mb-8 font-mono truncate px-4">{url}</p>

        {/* Steps */}
        <div className="space-y-3 text-left max-w-sm mx-auto">
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isDone || isActive ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isDone
                      ? 'bg-green-500/20 text-green-400'
                      : isActive
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-dark-800 text-gray-600'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isDone
                      ? 'text-green-400'
                      : isActive
                        ? 'text-white'
                        : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
                {isActive && (
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400 ml-auto"
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
