import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  feedbackText: string;
  onComplete: () => void;
}

const emojis = ['🚀', '🌟', '✨', '🎉', '💫', '⭐', '🛸', '🌍'];

export default function TaskCelebration({ feedbackText, onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 24, padding: 32, paddingTop: 40,
      position: 'relative', overflow: 'hidden', minHeight: 300,
    }}>
      {/* 粒子爆发 */}
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0.5],
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200 - 60,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            fontSize: 24 + Math.random() * 20,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* 中间奖章 */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
        style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'var(--gradient-celebration)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 56,
          boxShadow: '0 0 40px rgba(255,183,77,0.4)',
          position: 'relative', zIndex: 1,
        }}
      >
        🏆
      </motion.div>

      {/* 文字 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          🎉 任务完成！
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', maxWidth: 280 }}>
          {feedbackText}
        </p>
      </motion.div>
    </div>
  );
}
