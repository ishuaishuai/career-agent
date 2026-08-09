import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const setJourneyPhase = useGameStore((s) => s.setJourneyPhase);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setJourneyPhase('hall'), 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [setJourneyPhase]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', gap: 32, padding: 40,
    }}>
      {/* 星星装饰 */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: 'absolute',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            fontSize: `${12 + Math.random() * 16}px`,
            opacity: 0.6,
            // @ts-expect-error CSS custom property
            '--duration': `${2 + Math.random() * 3}s`,
            '--delay': `${Math.random() * 2}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ fontSize: 72 }}
      >
        🚀
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 28, fontWeight: 700,
          background: 'linear-gradient(135deg, #ffb74d, #ff8a80, #ce93d8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}
      >
        职业探索 Agent
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}
      >
        发现你的星辰大海
      </motion.p>

      {/* 进度条 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="progress-bar"
        style={{ width: 200 }}
      >
        <motion.div
          className="progress-bar-fill"
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
}
