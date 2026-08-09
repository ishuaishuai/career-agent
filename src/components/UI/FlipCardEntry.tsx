import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { astronautCareer } from '../../data/astronaut';
import MascotGuide from './MascotGuide';

export default function FlipCardEntry() {
  const [isFlipping, setIsFlipping] = useState(false);
  const setJourneyPhase = useGameStore((s) => s.setJourneyPhase);
  const setCurrentCareer = useGameStore((s) => s.setCurrentCareer);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    // 模拟翻卡动画后进入介绍
    setTimeout(() => {
      setCurrentCareer(astronautCareer);
      setJourneyPhase('reveal');
    }, 1000);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', padding: 24, gap: 24,
    }}>
      {/* 星星背景 */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: 'absolute',
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            fontSize: `${8 + Math.random() * 20}px`,
            opacity: 0.5,
            // @ts-expect-error CSS custom property
            '--duration': `${2 + Math.random() * 4}s`,
            '--delay': `${Math.random() * 3}s`,
          }}
        >
          {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ textAlign: 'center' }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          发现你的
          <span style={{
            background: 'linear-gradient(135deg, #ffb74d, #ff8a80)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginLeft: 8,
          }}>
            星辰大海
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          翻开卡片，探索一个酷炫的职业
        </p>
      </motion.div>

      {/* 翻卡区域 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        style={{ perspective: 1000 }}
      >
        <AnimatePresence mode="wait">
          {!isFlipping ? (
            <motion.div
              key="card-back"
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
              onClick={handleFlip}
              className="glass-card"
              style={{
                width: 200,
                height: 280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                gap: 16,
                position: 'relative',
                overflow: 'hidden',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 装饰圆 */}
              <div style={{
                position: 'absolute',
                top: -40, right: -40,
                width: 120, height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,183,77,0.2), transparent)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: -30, left: -30,
                width: 100, height: 100,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(206,147,216,0.15), transparent)',
              }} />

              <div style={{ fontSize: 48, position: 'relative', zIndex: 1 }}>❓</div>
              <p style={{
                fontSize: 16, fontWeight: 600, position: 'relative', zIndex: 1,
                color: 'rgba(255,255,255,0.7)',
              }}>
                点击翻开
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: 20,
                  color: 'rgba(255,183,77,0.6)',
                  position: 'relative', zIndex: 1,
                }}
              >
                👆
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="card-front"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
              className="glass-card"
              style={{
                width: 200,
                height: 280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 4,
                background: 'linear-gradient(90deg, #ffb74d, #ff8a80, #ce93d8)',
              }} />
              <div style={{ fontSize: 56 }}>{astronautCareer.emoji}</div>
              <p style={{ fontSize: 22, fontWeight: 700 }}>{astronautCareer.name}</p>
              <p style={{
                fontSize: 12, color: 'rgba(255,255,255,0.5)',
                textAlign: 'center', padding: '0 16px',
              }}>
                {astronautCareer.tagline}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 小知 */}
      <MascotGuide
        message="翻开卡片，探索一个有趣的职业吧！我会一直陪着你 🦉"
        position="bottom-right"
      />
    </div>
  );
}
