import { motion } from 'framer-motion';
import type { CareerIntro, SubjectTag } from '../../../types';

interface Props {
  basicInfo: CareerIntro['basicInfo'];
  subjects: SubjectTag[];
}

export default function BasicInfoCard({ basicInfo, subjects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card"
      style={{ padding: 24, marginBottom: 16, position: 'relative' }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>📋 基础信息</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InfoRow label="所属领域" value={basicInfo.field} emoji="🌍" />
        <InfoRow label="学历要求" value={basicInfo.education} emoji="🎓" />
        <InfoRow label="训练周期" value={basicInfo.training} emoji="⏳" />
      </div>

      {/* 相关学科 */}
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
          相关学科
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {subjects.map((s) => (
            <span key={s.name} className="chip">
              {s.emoji} {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* 趣味知识 */}
      <div style={{
        marginTop: 16,
        padding: 14,
        borderRadius: 16,
        background: 'rgba(255,183,77,0.08)',
        border: '1px solid rgba(255,183,77,0.15)',
      }}>
        <p style={{ fontSize: 12, color: 'rgba(255,183,77,0.7)', marginBottom: 4 }}>
          💡 趣味知识
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          {basicInfo.funFact}
        </p>
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', minWidth: 60 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{value}</span>
    </div>
  );
}
