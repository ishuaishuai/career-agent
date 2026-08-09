import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ChecklistItem } from '../../../types';

interface Props {
  items: ChecklistItem[];
  onComplete: (correct: boolean, text: string) => void;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export default function TaskDragSort({ items, onComplete, feedbackCorrect, feedbackWrong }: Props) {
  const [orderedItems, setOrderedItems] = useState<ChecklistItem[]>(() =>
    [...items].sort(() => Math.random() - 0.5) // 随机打乱
  );
  const [submitted, setSubmitted] = useState(false);

  // 简单排序：点击选中两个交换位置
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleTap = (idx: number) => {
    if (submitted) return;
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      // 交换位置
      const newOrder = [...orderedItems];
      [newOrder[selectedIdx], newOrder[idx]] = [newOrder[idx], newOrder[selectedIdx]];
      setOrderedItems(newOrder);
      setSelectedIdx(null);
    }
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const isCorrectOrder = orderedItems.every((item, i) => item.id === items[i].id);
    setTimeout(() => {
      onComplete(isCorrectOrder, isCorrectOrder ? feedbackCorrect : feedbackWrong);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 4 }}>
        💡 提示：点击两个项目交换位置，按正确顺序排列
      </p>

      {orderedItems.map((item, i) => {
        const isSelected = selectedIdx === i;
        const isCorrectPos = submitted && item.id === items[i].id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isSelected ? 1.03 : 1,
              borderColor: submitted
                ? isCorrectPos
                  ? 'rgba(105,240,174,0.5)'
                  : 'rgba(255,138,128,0.5)'
                : isSelected
                  ? 'rgba(255,183,77,0.5)'
                  : 'rgba(255,255,255,0.1)',
            }}
            transition={{ delay: 0.05 * i }}
            onClick={() => handleTap(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14,
              borderRadius: 16,
              background: submitted
                ? isCorrectPos
                  ? 'rgba(105,240,174,0.06)'
                  : 'rgba(255,138,128,0.06)'
                : isSelected
                  ? 'rgba(255,183,77,0.08)'
                  : 'rgba(255,255,255,0.04)',
              border: '2px solid',
              cursor: submitted ? 'default' : 'pointer',
              transition: 'all 200ms ease',
            }}
          >
            <span style={{
              width: 28, height: 28, borderRadius: '50%',
              background: isSelected ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 600, flexShrink: 0,
            }}>
              {i + 1}
            </span>
            <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
            {submitted && (
              <span style={{ fontSize: 20 }}>
                {isCorrectPos ? '✅' : '🔄'}
              </span>
            )}
          </motion.div>
        );
      })}

      {!submitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="btn-primary"
          onClick={handleSubmit}
          style={{ marginTop: 8 }}
        >
          确认顺序 ✅
        </motion.button>
      )}
    </div>
  );
}
