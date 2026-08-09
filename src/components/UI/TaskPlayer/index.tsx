import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../../store/gameStore';
import { astronautTasks } from '../../../data/astronaut';
import TaskHeader from './TaskHeader';
import TaskDialog from './TaskDialog';
import TaskChoice from './TaskChoice';
import TaskDragSort from './TaskDragSort';
import TaskChecklist from './TaskChecklist';
import TaskCountdown from './TaskCountdown';
import TaskCelebration from './TaskCelebration';
import type { GameTask } from '../../../types';

export default function TaskPlayer() {
  const currentExpStep = useGameStore((s) => s.currentExpStep);
  const setCurrentExpStep = useGameStore((s) => s.setCurrentExpStep);
  const addTaskResult = useGameStore((s) => s.addTaskResult);
  const setJourneyPhase = useGameStore((s) => s.setJourneyPhase);

  const task: GameTask = astronautTasks[currentExpStep] || astronautTasks[4];
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleTaskComplete = useCallback(
    (correct: boolean, text: string) => {
      setIsCorrect(correct);
      setFeedbackText(text);
      setShowFeedback(true);
      addTaskResult({
        step: task.step,
        correct,
        abilityTag: task.abilityTag,
      });
    },
    [task, addTaskResult]
  );

  const handleNextStep = () => {
    setShowFeedback(false);
    if (currentExpStep >= astronautTasks.length - 1) {
      // 全部完成，进入结果页
      setJourneyPhase('result');
    } else {
      setCurrentExpStep(currentExpStep + 1);
    }
  };

  const handleSkip = () => {
    setJourneyPhase('result');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部栏 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', paddingTop: 'max(12px, env(safe-area-inset-top))',
      }}>
        <button onClick={handleSkip} className="btn-secondary" style={{ padding: '6px 14px', fontSize: 13 }}>
          跳过
        </button>
        <TaskHeader currentStep={currentExpStep} totalSteps={astronautTasks.length} />
        <div style={{ width: 50 }} />
      </div>

      {/* 场景标题 */}
      <div style={{
        textAlign: 'center', padding: '8px 20px 16px',
      }}>
        <p style={{ fontSize: 13, color: 'rgba(255,183,77,0.7)', marginBottom: 4 }}>
          {task.sceneName}
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>{task.title}</h2>
      </div>

      {/* 任务内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key={`task-${task.step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              {/* 对话框 */}
              <TaskDialog mentorAvatar={task.mentorAvatar} text={task.dialogText} />

              {/* 交互区 */}
              <div style={{ flex: 1, overflow: 'auto', padding: '0 20px' }}>
                {task.interactionType === 'choice' && task.choices && (
                  <TaskChoice
                    choices={task.choices}
                    correctAnswer={task.correctAnswer!}
                    feedbackCorrect={task.feedbackCorrect!}
                    feedbackWrong={task.feedbackWrong!}
                    onComplete={handleTaskComplete}
                  />
                )}
                {task.interactionType === 'drag' && task.checklist && (
                  <TaskDragSort
                    items={task.checklist}
                    onComplete={handleTaskComplete}
                    feedbackCorrect={task.feedbackCorrect!}
                    feedbackWrong={task.feedbackWrong!}
                  />
                )}
                {task.interactionType === 'countdown' && task.choices && (
                  <TaskCountdown
                    choices={task.choices}
                    correctAnswer={task.correctAnswer!}
                    feedbackCorrect={task.feedbackCorrect!}
                    feedbackWrong={task.feedbackWrong!}
                    onComplete={handleTaskComplete}
                  />
                )}
                {task.interactionType === 'checklist' && task.checklist && (
                  <TaskChecklist
                    items={task.checklist}
                    onComplete={handleTaskComplete}
                    feedbackCorrect={task.feedbackCorrect!}
                    feedbackWrong={task.feedbackWrong!}
                  />
                )}
                {task.interactionType === 'celebration' && (
                  <TaskCelebration
                    feedbackText={task.dialogText}
                    onComplete={() => handleTaskComplete(true, task.dialogText)}
                  />
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`feedback-${task.step}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 32, gap: 20,
              }}
            >
              {/* 反馈 emoji */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                style={{ fontSize: 64 }}
              >
                {isCorrect ? '🎉' : '💪'}
              </motion.div>

              {/* 反馈文字 */}
              <div style={{
                textAlign: 'center', maxWidth: 300,
                padding: 24,
                borderRadius: 24,
                background: isCorrect
                  ? 'rgba(105,240,174,0.08)'
                  : 'rgba(255,138,128,0.08)',
                border: `1px solid ${isCorrect ? 'rgba(105,240,174,0.2)' : 'rgba(255,138,128,0.2)'}`,
              }}>
                <p style={{
                  fontSize: 16, fontWeight: 600, marginBottom: 8,
                  color: isCorrect ? '#69f0ae' : '#ff8a80',
                }}>
                  {isCorrect ? '太棒了！' : '差一点点！'}
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  {feedbackText}
                </p>
              </div>

              {/* 能力标签 */}
              <span className="chip" style={{ borderColor: 'rgba(255,183,77,0.3)' }}>
                🏅 锻炼了：{task.abilityTag}
              </span>

              {/* 下一步按钮 */}
              <button className="btn-primary" onClick={handleNextStep}>
                {currentExpStep >= astronautTasks.length - 1 ? '查看我的收获 →' : '下一步 →'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
