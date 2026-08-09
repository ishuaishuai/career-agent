import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { ChoiceOption } from '../../../types';

interface Props {
  choices: ChoiceOption[];
  correctAnswer: string;
  feedbackCorrect: string;
  feedbackWrong: string;
  onComplete: (correct: boolean, text: string) => void;
}

export default function TaskCountdown({ choices, correctAnswer, feedbackCorrect, feedbackWrong, onComplete }: Props) {
  const [countdown, setCountdown] = useState(10);
  const [selected, setSelected] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current);
          if (!selected) {
            setExpired(true);
            setTimeout(() => onComplete(false, feedbackWrong), 800);
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: string) => {
    if (selected || expired) return;
    setSelected(id);
    clearInterval(intervalRef.current);
    const correct = id === correctAnswer;
    setTimeout(() => {
      onComplete(correct, correct ? feedbackCorrect : feedbackWrong);
    }, 600);
  };

  const isUrgent = countdown <= 3;
  const isVeryUrgent = countdown <= 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 8 }}>
      {/* 倒计时圈 */}
      <motion.div
        animate={{
          scale: isVeryUrgent ? [1, 1.08, 1] : 1,
          borderColor: isUrgent ? '#ff8a80' : 'rgba(255,183,77,0.6)',
          boxShadow: isUrgent
            ? '0 0 20px rgba(255,138,128,0.5)'
            : '0 0 12px rgba(255,183,77,0.3)',
        }}
        transition={{ duration: isVeryUrgent ? 0.5 : 1, repeat: isVeryUrgent ? Infinity : 0 }}
        style={{
          width: 100, height: 100, borderRadius: '50%',
          border: '3px solid',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, fontWeight: 700,
          color: isUrgent ? '#ff8a80' : '#ffb74d',
          marginBottom: 4,
        }}
      >
        {expired ? '⏰' : countdown}
      </motion.div>

      <p style={{
        fontSize: 13, color: isUrgent ? '#ff8a80' : 'rgba(255,255,255,0.5)',
        marginBottom: 8,
      }}>
        {expired ? '时间到！' : isUrgent ? '⚠️ 快速决定！' : '倒计时中，做出你的选择'}
      </p>

      {/* 选项 */}
      {choices.map((c) => {
        const isSelected = selected === c.id;
        const isCorrect = c.id === correctAnswer;
        let borderColor = 'rgba(255,255,255,0.1)';
        let bg = 'rgba(255,255,255,0.04)';

        if (isSelected) {
          borderColor = isCorrect ? 'rgba(105,240,174,0.5)' : 'rgba(255,138,128,0.5)';
          bg = isCorrect ? 'rgba(105,240,174,0.08)' : 'rgba(255,138,128,0.08)';
        }

        return (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * choices.indexOf(c) }}
            whileTap={!selected && !expired ? { scale: 0.97 } : undefined}
            onClick={() => handleSelect(c.id)}
            disabled={!!selected || expired}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: 16,
              borderRadius: 20,
              border: `2px solid ${borderColor}`,
              background: bg,
              cursor: selected || expired ? 'default' : 'pointer',
              textAlign: 'left',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.5,
              transition: 'all 200ms ease',
              width: '100%',
            }}
          >
            <span style={{ fontSize: 28, flexShrink: 0 }}>{c.emoji}</span>
            <span style={{ flex: 1 }}>{c.label}</span>
            {isSelected && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: 24 }}>
                {isCorrect ? '✅' : '❌'}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
