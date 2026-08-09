import { create } from 'zustand';
import type { JourneyPhase, Career, TaskResult } from '../types';

interface GameState {
  // --- 旅程阶段 ---
  journeyPhase: JourneyPhase;
  setJourneyPhase: (phase: JourneyPhase) => void;

  // --- 当前职业 ---
  currentCareer: Career | null;
  setCurrentCareer: (career: Career) => void;

  // --- 体验进度 ---
  currentExpStep: number;
  setCurrentExpStep: (step: number) => void;
  taskResults: TaskResult[];
  addTaskResult: (result: TaskResult) => void;

  // --- 介绍页滚动位置 ---
  introScrollIndex: number;
  setIntroScrollIndex: (index: number) => void;

  // --- 徽章与发现卡 ---
  earnedBadge: string | null;
  setEarnedBadge: (badge: string) => void;

  // --- 进度持久化 ---
  loadProgress: () => void;
  saveProgress: () => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  journeyPhase: 'loading',
  setJourneyPhase: (phase) => {
    set({ journeyPhase: phase });
    get().saveProgress();
  },

  currentCareer: null,
  setCurrentCareer: (career) => set({ currentCareer: career }),

  currentExpStep: 0,
  setCurrentExpStep: (step) => set({ currentExpStep: step }),

  taskResults: [],
  addTaskResult: (result) =>
    set((s) => ({ taskResults: [...s.taskResults, result] })),

  introScrollIndex: 0,
  setIntroScrollIndex: (index) => set({ introScrollIndex: index }),

  earnedBadge: null,
  setEarnedBadge: (badge) => set({ earnedBadge: badge }),

  loadProgress: () => {
    try {
      const raw = localStorage.getItem('career-agent-progress');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.journeyPhase && data.journeyPhase !== 'loading') {
        set({
          journeyPhase: data.journeyPhase,
          currentCareer: data.currentCareer ?? null,
          currentExpStep: data.currentExpStep ?? 0,
          taskResults: data.taskResults ?? [],
          earnedBadge: data.earnedBadge ?? null,
        });
      }
    } catch {
      // ignore corrupted data
    }
  },

  saveProgress: () => {
    const s = get();
    try {
      localStorage.setItem(
        'career-agent-progress',
        JSON.stringify({
          journeyPhase: s.journeyPhase,
          currentCareer: s.currentCareer,
          currentExpStep: s.currentExpStep,
          taskResults: s.taskResults,
          earnedBadge: s.earnedBadge,
        })
      );
    } catch {
      // quota exceeded, silently fail
    }
  },

  resetProgress: () => {
    localStorage.removeItem('career-agent-progress');
    set({
      journeyPhase: 'hall',
      currentCareer: null,
      currentExpStep: 0,
      taskResults: [],
      earnedBadge: null,
      introScrollIndex: 0,
    });
  },
}));
