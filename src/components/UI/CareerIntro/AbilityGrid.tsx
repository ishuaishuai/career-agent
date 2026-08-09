import { motion } from 'framer-motion';
import type { Ability } from '../../../types';

interface Props {
  abilities: Ability[];
}

export default function AbilityGrid({ abilities }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card"
      style={{ padding: 24, marginBottom: 16, position: 'relative' }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
        💪 核心能力（需要 6 项超能力！）
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {abilities.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: 14,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span style={{ fontSize: 28 }}>{a.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{a.name}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                {a.definition}
              </p>
              <p style={{
                fontSize: 12, color: 'rgba(255,138,128,0.7)', marginTop: 4,
                fontStyle: 'italic',
              }}>
                ⚠️ {a.antiExample}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
