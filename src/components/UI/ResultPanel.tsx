import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { astronautDiscoveries } from '../../data/astronaut';
import MascotGuide from './MascotGuide';

export default function ResultPanel() {
  const setJourneyPhase = useGameStore((s) => s.setJourneyPhase);
  const taskResults = useGameStore((s) => s.taskResults);
  const [currentDiscovery, setCurrentDiscovery] = useState(0);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [allRevealed, setAllRevealed] = useState(false);

  const correctCount = taskResults.filter((r) => r.correct).length;
  const totalCount = taskResults.length;

  const handleFlip = (idx: number) => {
    if (flipped.has(idx)) return;
    const next = new Set(flipped);
    next.add(idx);
    setFlipped(next);
    if (next.size >= astronautDiscoveries.length) {
      setTimeout(() => setAllRevealed(true), 500);
    }
  };

  const handleNextDiscovery = () => {
    if (currentDiscovery < astronautDiscoveries.length - 1) {
      setCurrentDiscovery(currentDiscovery + 1);
    }
  };

  const discovery = astronautDiscoveries[currentDiscovery];
  const isFlipped = flipped.has(currentDiscovery);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部 */}
      <div style={{
        textAlign: 'center', padding: '20px 20px 0',
        paddingTop: 'max(20px, env(safe-area-inset-top))',
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
          🎉 体验完成！
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
          你完成了 {totalCount} 项航天员任务
        </p>
      </div>

      {/* 成就徽章 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.2 }}
        style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 20px' }}
      >
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'var(--gradient-celebration)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 44,
          boxShadow: '0 0 30px rgba(255,183,77,0.5)',
        }}>
          {correctCount >= 4 ? '🏆' : correctCount >= 2 ? '🥈' : '🌟'}
        </div>
      </motion.div>

      <p style={{
        textAlign: 'center', fontSize: 16, fontWeight: 600, marginBottom: 20,
      }}>
        获得徽章：
        <span style={{ color: '#ffb74d' }}>
          {correctCount >= 4 ? '太空英雄' : correctCount >= 2 ? '航天新星' : '勇敢探索者'}
        </span>
      </p>

      {/* 发现卡区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>
          💡 翻开卡片，看看你今天发现了什么
        </p>

        {/* 发现卡 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDiscovery}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            style={{ perspective: 800, width: '100%', maxWidth: 300 }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
              onClick={() => handleFlip(currentDiscovery)}
              style={{
                width: '100%',
                height: 200,
                position: 'relative',
                cursor: isFlipped ? 'default' : 'pointer',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 背面 */}
              <div className="glass-card" style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 12,
                backfaceVisibility: 'hidden',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(90deg, #ffb74d, #ff8a80, #ce93d8)',
                }} />
                <span style={{ fontSize: 48 }}>🎴</span>
                <p style={{ fontSize: 16, fontWeight: 600 }}>今天我发现了...</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  第 {currentDiscovery + 1} 个秘密
                </p>
              </div>

              {/* 正面 */}
              <div className="glass-card" style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center',
                padding: 24,
                overflow: 'auto',
              }}>
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 44 }}>{discovery.emoji}</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
                  {discovery.title}
                </p>
                <p style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7, textAlign: 'center',
                }}>
                  {discovery.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* 翻卡提示 / 下一张按钮 */}
        {isFlipped && currentDiscovery < astronautDiscoveries.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="btn-secondary"
            onClick={handleNextDiscovery}
            style={{ marginTop: 16 }}
          >
            下一张发现卡 →
          </motion.button>
        )}

        {/* 全部翻完后 */}
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, width: '100%', maxWidth: 280 }}
          >
            <button
              className="btn-primary"
              onClick={() => setJourneyPhase('resources')}
            >
              📚 查看推荐资源
            </button>
            <button
              className="btn-secondary"
              onClick={() => setJourneyPhase('hall')}
            >
              🔄 返回大厅
            </button>
          </motion.div>
        )}
      </div>

      {/* 小知 */}
      {currentDiscovery === 0 && !isFlipped && (
        <MascotGuide message="点一下卡片，看看你发现了什么秘密！" position="bottom-right" size="sm" />
      )}
    </div>
  );
}
