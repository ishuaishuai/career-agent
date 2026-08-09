// ============================================================
// 职业探索 Agent — 核心类型定义
// ============================================================

// --- 旅程阶段状态机 ---
export type JourneyPhase =
  | 'loading'      // 初始加载
  | 'hall'         // 大厅（星空桌面 + 翻卡入口）
  | 'draw'         // 抽卡动画中
  | 'reveal'       // 揭晓职业卡片
  | 'intro'        // 职业介绍（4 模块 H5 图文）
  | 'experience'   // 体验环节（5 步小游戏）
  | 'result'       // 体验结果（发现卡 + 徽章）
  | 'resources';   // 推荐资源

// --- 职业索引 ---
export interface Career {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  figureName: string;
  figureBrief: string;
  subjects: SubjectTag[];
  isImplemented: boolean;
}

export interface SubjectTag {
  emoji: string;
  name: string;
  detail: string;
}

// --- 介绍文档 ---
export interface CareerIntro {
  careerId: string;
  basicInfo: {
    field: string;
    education: string;
    training: string;
    relatedSubjects: string[];
    funFact: string;       // 🆕 趣味知识（替代薪资）
  };
  abilities: Ability[];
  workContent: WorkScene[];
  typicalFigures: Figure[];
}

export interface Ability {
  name: string;
  emoji: string;
  definition: string;
  antiExample: string;
}

export interface WorkScene {
  time: string;
  title: string;
  description: string;
  emoji: string;
}

export interface Figure {
  name: string;
  title: string;
  story: string;
  emoji: string;
}

// --- 游戏任务 ---
export interface GameTask {
  step: number;
  sceneName: string;
  title: string;
  mentorAvatar: string;
  dialogText: string;
  interactionType: InteractionType;
  choices?: ChoiceOption[];
  checklist?: ChecklistItem[];
  correctAnswer?: string;
  feedbackCorrect?: string;
  feedbackWrong?: string;
  abilityTag: string;
}

export type InteractionType =
  | 'dialog'
  | 'choice'
  | 'drag'
  | 'checklist'
  | 'countdown'
  | 'celebration';

export interface ChoiceOption {
  id: string;
  label: string;
  emoji: string;
  isCorrect: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  hint: string;
}

// --- 推荐资源 ---
export interface CareerResources {
  careerId: string;
  practices: ResourceItem[];
  books: ResourceItem[];
  visits: ResourceItem[];
}

export interface ResourceItem {
  name: string;
  location?: string;
  ageRange?: string;
  description: string;
  emoji: string;
}

// --- 发现卡（替代数字评分）---
export interface Discovery {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

// --- 任务结果 ---
export interface TaskResult {
  step: number;
  correct: boolean;
  abilityTag: string;
}
