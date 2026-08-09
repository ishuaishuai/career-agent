import { motion } from 'framer-motion';

interface Props {
  message?: string;
  position?: 'top-left' | 'bottom-right' | 'inline';
  size?: 'sm' | 'md';
}

export default function MascotGuide({ message, position = 'bottom-right', size = 'md' }: Props) {
  const fontSize = size === 'sm' ? 36 : 52;

  const posStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: 16, left: 16 },
    'bottom-right': { bottom: 16, right: 16 },
    'inline': { position: 'relative' as const },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        position: position === 'inline' ? 'relative' : 'absolute',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        ...posStyles[position],
      }}
    >
      {/* 小知 🦉 */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize,
          filter: 'drop-shadow(0 4px 12px rgba(255, 183, 77, 0.4))',
          cursor: 'pointer',
        }}
        title="我是小知，你的职业探索向导！"
      >
        🦉
      </motion.div>

      {/* 对话气泡 */}
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '16px 16px 16px 4px',
            padding: '10px 16px',
            maxWidth: 220,
            fontSize: 13,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
}
