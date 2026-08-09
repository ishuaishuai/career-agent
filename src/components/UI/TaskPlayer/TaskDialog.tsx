import { motion } from 'framer-motion';

interface Props {
  mentorAvatar: string;
  text: string;
}

export default function TaskDialog({ mentorAvatar, text }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        display: 'flex', gap: 10, alignItems: 'flex-start',
        padding: '12px 20px', margin: '0 20px 16px',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: 28 }}
      >
        {mentorAvatar}
      </motion.span>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 12, color: 'rgba(255,183,77,0.7)', marginBottom: 4 }}>小知</p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{text}</p>
      </div>
    </motion.div>
  );
}
