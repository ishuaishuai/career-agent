import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChecklistItem } from '../../../types';

interface Props {
  items: ChecklistItem[];
  onComplete: (correct: boolean, text: string) => void;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export default function TaskChecklist({ items, onComplete, feedbackCorrect, feedbackWrong }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const allChecked = checked.size === items.length;

  const toggleCheck = (id: string) => {
    if (submitted) return;
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setChecked(next);
  };

  const handleSubmit = () => {
    if (submitted || !allChecked) return;
    setSubmitted(true);
    setTimeout(() => {
      onComplete(true, feedbackCorrect);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
      {items.map((item) => {
        const isChecked = checked.has(item.id);
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * items.indexOf(item) }}
            whileTap={!submitted ? { scale: 0.97 } : undefined}
            onClick={() => toggleCheck(item.id)}
            disabled={submitted}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: 16,
              borderRadius: 20,
              border: `2px solid ${isChecked ? 'rgba(105,240,174,0.4)' : 'rgba(255,255,255,0.1)'}`,
              background: isChecked ? 'rgba(105,240,174,0.06)' : 'rgba(255,255,255,0.04)',
              cursor: submitted ? 'default' : 'pointer',
              textAlign: 'left',
              color: '#fff',
              fontSize: 14,
              lineHeight: 1.5,
              transition: 'all 200ms ease',
              width: '100%',
            }}
          >
            {/* 复选框 */}
            <motion.div
              animate={{
                scale: isChecked ? 1 : 0.9,
                background: isChecked ? '#69f0ae' : 'rgba(255,255,255,0.1)',
              }}
              style={{
                width: 28, height: 28, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                border: isChecked ? 'none' : '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <AnimatePresence>
                {isChecked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ fontSize: 16 }}
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <div style={{ flex: 1 }}>
              <span>{item.label}</span>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
                {item.hint}
              </p>
            </div>
          </motion.button>
        );
      })}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: allChecked ? 1 : 0.4 }}
        className="btn-primary"
        onClick={handleSubmit}
        disabled={!allChecked || submitted}
        style={{
          marginTop: 8,
          opacity: allChecked && !submitted ? 1 : 0.4,
        }}
      >
        {allChecked ? '确认完成 ✅' : `还差 ${items.length - checked.size} 项`}
      </motion.button>
    </div>
  );
}
