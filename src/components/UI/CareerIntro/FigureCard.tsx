import { motion } from 'framer-motion';
import type { Figure } from '../../../types';

interface Props {
  figures: Figure[];
}

export default function FigureCard({ figures }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card"
      style={{ padding: 24, marginBottom: 16, position: 'relative' }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
        🌟 了不起的航天员
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {figures.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              padding: 16,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, flexShrink: 0,
            }}>
              {f.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{f.name}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,183,77,0.7)', marginBottom: 6 }}>
                {f.title}
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                {f.story}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
