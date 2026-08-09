import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ChoiceOption } from '../../../types';

interface Props {
  choices: ChoiceOption[];
  correctAnswer: string;
  feedbackCorrect: string;
  feedbackWrong: string;
  onComplete: (correct: boolean, text: string) => void;
}

export default function TaskChoice({ choices, correctAnswer, feedbackCorrect, feedbackWrong, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);
    const correct = id === correctAnswer;
    setTimeout(() => {
      onComplete(correct, correct ? feedbackCorrect : feedbackWrong);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
      {choices.map((c) => {
        const isSelected = selected === c.id;
        const isCorrect = c.id === correctAnswer;
        let borderColor = 'rgba(255,255,255,0.1)';
        let bg = 'rgba(255,255,255,0.04)';

        if (isSelected) {
          borderColor = isCorrect ? 'rgba(105,240,174,0.4)' : 'rgba(255,138,128,0.4)';
          bg = isCorrect ? 'rgba(105,240,174,0.08)' : 'rgba(255,138,128,0.08)';
        }

        return (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * choices.indexOf(c) }}
            whileTap={!selected ? { scale: 0.97 } : undefined}
            onClick={() => handleSelect(c.id)}
            disabled={!!selected}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: 16,
              borderRadius: 20,
              border: `2px solid ${borderColor}`,
              background: bg,
              cursor: selected ? 'default' : 'pointer',
              textAlign: 'left',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.5,
              transition: 'all 200ms ease',
            }}
          >
            <span style={{ fontSize: 28, flexShrink: 0 }}>{c.emoji}</span>
            <span style={{ flex: 1 }}>{c.label}</span>
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ fontSize: 24, flexShrink: 0 }}
              >
                {isCorrect ? '✅' : '❌'}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    );
  }
}
