import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { astronautResources } from '../../data/astronaut';
import MascotGuide from './MascotGuide';

export default function ResourcesPanel() {
  const setJourneyPhase = useGameStore((s) => s.setJourneyPhase);
  const r = astronautResources;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', paddingTop: 'max(16px, env(safe-area-inset-top))',
      }}>
        <button onClick={() => setJourneyPhase('result')} className="btn-secondary" style={{ padding: '8px 16px', fontSize: 14 }}>
          ← 返回
        </button>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>推荐资源</span>
        <div style={{ width: 60 }} />
      </div>

      <div className="page-scroll" style={{ paddingBottom: 120 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>📚 继续探索航天</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
            把这些转发给爸妈，让他们帮你安排！
          </p>
        </div>

        {/* 实践机会 */}
        <Section title="🏕️ 实践机会" items={r.practices} />

        {/* 科普书单 */}
        <Section title="📖 科普书单" items={r.books} />

        {/* 体验参观 */}
        <Section title="🏛️ 体验参观" items={r.visits} />

        {/* 底部按钮 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
          <button
            className="btn-primary"
            onClick={() => alert('📤 资源清单已复制！发给爸爸妈妈看看吧～')}
          >
            📤 把这个清单发给爸妈
          </button>
          <button
            className="btn-secondary"
            onClick={() => setJourneyPhase('hall')}
          >
            🔄 返回大厅，再探索一次！
          </button>
        </div>
      </div>

      <MascotGuide
        message="这些都是真实存在的活动和书籍哦！让爸妈带你去看看吧～"
        position="bottom-right"
        size="sm"
      />
    </div>
  );
}

function Section({ title, items }: { title: string; items: { name: string; description: string; emoji: string; location?: string; ageRange?: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: 20, marginBottom: 16, position: 'relative' }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: 14,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.name}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {item.location && (
                  <span style={{ fontSize: 11, color: 'rgba(100,181,246,0.7)' }}>📍 {item.location}</span>
                )}
                {item.ageRange && (
                  <span style={{ fontSize: 11, color: 'rgba(255,183,77,0.7)' }}>👤 {item.ageRange}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
