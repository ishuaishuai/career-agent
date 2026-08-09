import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import LoadingScreen from './components/UI/LoadingScreen';
import FlipCardEntry from './components/UI/FlipCardEntry';
import CareerIntro from './components/UI/CareerIntro';
import TaskPlayer from './components/UI/TaskPlayer';
import ResultPanel from './components/UI/ResultPanel';
import ResourcesPanel from './components/UI/ResourcesPanel';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] };

export default function App() {
  const journeyPhase = useGameStore((s) => s.journeyPhase);
  const loadProgress = useGameStore((s) => s.loadProgress);

  // 加载持久化进度
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // 移动端 viewport 高度修复
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => setTimeout(setVH, 100));
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', () => setTimeout(setVH, 100));
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(var(--vh, 1vh) * 100)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="starry-bg"
    >
      <AnimatePresence mode="wait">
        {journeyPhase === 'loading' && (
          <motion.div
            key="loading"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ height: '100%' }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {journeyPhase === 'hall' && (
          <motion.div
            key="hall"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ height: '100%' }}
          >
            <FlipCardEntry />
          </motion.div>
        )}

        {journeyPhase === 'reveal' && (
          <motion.div
            key="reveal"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ height: '100%' }}
          >
            <CareerIntro />
          </motion.div>
        )}

        {journeyPhase === 'experience' && (
          <motion.div
            key="experience"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ height: '100%' }}
          >
            <TaskPlayer />
          </motion.div>
        )}

        {journeyPhase === 'result' && (
          <motion.div
            key="result"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ height: '100%' }}
          >
            <ResultPanel />
          </motion.div>
        )}

        {journeyPhase === 'resources' && (
          <motion.div
            key="resources"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ height: '100%' }}
          >
            <ResourcesPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
