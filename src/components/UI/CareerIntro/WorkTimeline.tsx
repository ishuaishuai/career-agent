import { motion } from 'framer-motion';
import type { WorkScene } from '../../../types';

interface Props {
  scenes: WorkScene[];
}

export default function WorkTimeline({ scenes }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card"
      style={{ padding: 24, marginBottom: 16, position: 'relative' }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
        🗓️ 航天员的一天
      </h2>

      <div style={{ position: 'relative', paddingLeft: 28 }}>
        {/* 竖线 */}
        <div style={{
          position: 'absolute', left: 11, top: 8, bottom: 8,
          width: 2,
          background: 'linear-gradient(180deg, rgba(255,183,77,0.4), rgba(206,147,216,0.4))',
        }} />

        {scenes.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            style={{ marginBottom: 20, position: 'relative' }}
          >
            {/* 时间点 */}
            <div style={{
              position: 'absolute', left: -28, top: 4,
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12,
              boxShadow: '0 0 8px rgba(255,183,77,0.3)',
            }}>
              {s.emoji}
            </div>

            <div style={{
              padding: 14,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,183,77,0.7)' }}>{s.time}</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                {s.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
