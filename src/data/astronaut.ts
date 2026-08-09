import type { Career, CareerIntro, GameTask, CareerResources, Discovery } from '../types';

// ============================================================
// 航天员 — 职业数据（全部 Mock）
// ============================================================

export const astronautCareer: Career = {
  id: 'astronaut',
  name: '航天员',
  emoji: '👨‍🚀',
  tagline: '飞向星辰大海，探索宇宙边疆',
  figureName: '杨利伟',
  figureBrief: '中国首位进入太空的航天员，2003年乘坐神舟五号完成21小时太空飞行',
  subjects: [
    { emoji: '🔬', name: '物理', detail: '轨道力学、微重力' },
    { emoji: '📐', name: '数学', detail: '轨道计算' },
    { emoji: '🧬', name: '生物', detail: '太空生理学' },
    { emoji: '🔧', name: '工程', detail: '航天器操作' },
    { emoji: '💻', name: '计算机', detail: '飞行控制' },
  ],
  isImplemented: true,
};

export const astronautIntro: CareerIntro = {
  careerId: 'astronaut',
  basicInfo: {
    field: '航天航空',
    education: '理工科本科以上，多为硕士/博士',
    training: '3-5年高强度训练（体能+模拟器+理论+野外生存）',
    relatedSubjects: ['物理', '数学', '生物', '工程', '计算机', '医学'],
    funFact: '在太空中，航天员的身高会因为脊椎伸展而增加 3-5 厘米！但回到地球又会缩回去 🌍',
  },
  abilities: [
    {
      name: '超强体能',
      emoji: '💪',
      definition: '承受火箭发射时的超重压力（相当于 4-5 个自己压在身上）',
      antiExample: '如果不训练体能，在发射时可能会晕过去',
    },
    {
      name: '冷静心态',
      emoji: '🧘',
      definition: '在太空隔离环境中保持镇定，遇到突发状况不慌乱',
      antiExample: '太空中一个警报响了，如果慌乱按错按钮，后果很严重',
    },
    {
      name: '快速反应',
      emoji: '⚡',
      definition: '太空中的情况变化很快，需要在几秒内做出正确判断',
      antiExample: '国际空间站曾因太空垃圾逼近，只有 90 秒决定是否躲避',
    },
    {
      name: '团队协作',
      emoji: '🤝',
      definition: '和队友在狭小空间里生活几个月，需要默契配合',
      antiExample: '一次沟通失误，可能导致实验失败甚至安全事故',
    },
    {
      name: '科学实验',
      emoji: '🧪',
      definition: '在微重力环境下做各种实验：种植物、养细胞、观察燃烧',
      antiExample: '如果不按流程操作，珍贵的实验样本可能全部报废',
    },
    {
      name: '机械操作',
      emoji: '🔧',
      definition: '会修理各种设备，甚至穿着笨重的太空服出舱维修',
      antiExample: '一颗松动的螺丝可能划破太空服，危及生命',
    },
  ],
  workContent: [
    {
      time: '🌅 早晨',
      title: '体能训练',
      description: '每天 2 小时：跑步机、力量训练、前庭训练（旋转椅！）——让身体适应太空环境',
      emoji: '🏃',
    },
    {
      time: '🕐 上午',
      title: '模拟器训练',
      description: '在 1:1 还原的飞船舱里练习各种操作：对接、着陆、紧急逃生',
      emoji: '🕹️',
    },
    {
      time: '📚 下午',
      title: '理论学习',
      description: '轨道力学、航天器系统、太空医学、俄语/英语——航天员要学的东西比博士还多',
      emoji: '📖',
    },
    {
      time: '🚀 发射日',
      title: '发射与在轨',
      description: '穿上航天服、进入飞船、倒计时点火！在太空中做实验、出舱行走、维护设备',
      emoji: '🔥',
    },
    {
      time: '🌍 返回',
      title: '再入与着陆',
      description: '返回舱穿越大气层（外面温度超过 2000°C！）、降落伞打开、地面搜救队接应',
      emoji: '🪂',
    },
  ],
  typicalFigures: [
    {
      name: '杨利伟',
      title: '中国航天第一人',
      emoji: '🇨🇳',
      story: '2003年10月15日，杨利伟乘坐神舟五号飞船进入太空，绕地球飞行14圈，历时21小时23分。他在太空中展示了中国国旗，成为中国第一位进入太空的航天员。',
    },
    {
      name: '尼尔·阿姆斯特朗',
      title: '人类首次登月',
      emoji: '🌕',
      story: '1969年7月20日，阿姆斯特朗踏上月球表面，说出了那句著名的话："这是个人的一小步，却是人类的一大步。"全世界约有 6 亿人观看了直播。',
    },
    {
      name: '王亚平',
      title: '中国首位太空教师',
      emoji: '👩‍🚀',
      story: '2013年，王亚平在天宫一号里给全国 6000 万中小学生上了一堂"太空课"——在失重环境下演示了水膜、水球、单摆等有趣的物理实验！',
    },
  ],
};

export const astronautTasks: GameTask[] = [
  {
    step: 1,
    sceneName: '航天员训练中心',
    title: '选择体能训练方案',
    mentorAvatar: '🦉',
    dialogText: '欢迎来到航天员训练中心！我是你的向导小知 🦉。航天员的训练非常艰苦，首先要从体能开始。你觉得哪种训练最重要？',
    interactionType: 'choice',
    choices: [
      { id: 'a', label: '举重训练（增强肌肉力量）', emoji: '🏋️', isCorrect: false },
      { id: 'b', label: '前庭训练（旋转椅适应失重）', emoji: '🎠', isCorrect: true },
      { id: 'c', label: '长跑训练（增强耐力）', emoji: '🏃', isCorrect: false },
    ],
    correctAnswer: 'b',
    feedbackCorrect: '太棒了！前庭训练是航天员最独特的训练项目。旋转椅每分钟转 30 圈，训练前庭系统适应太空中的眩晕感。很多航天员第一次上去都会吐，但坚持下来就好了！ 🌟',
    feedbackWrong: '嗯...这个也重要，但不是最独特的哦。想一想，太空中最大的挑战是什么？是失重！所以最重要的是让身体适应失重环境——前庭训练！下次加油 💪',
    abilityTag: '超强体能',
  },
  {
    step: 2,
    sceneName: '飞船模拟器',
    title: '控制面板操作',
    mentorAvatar: '🦉',
    dialogText: '现在进入飞船模拟器！在发射前，你需要确认这些关键操作按钮。来试试看：把下面这些操作按正确顺序排好 👇',
    interactionType: 'drag',
    checklist: [
      { id: '1', label: '检查生命支持系统（氧气、温度）', hint: '先确保能呼吸！' },
      { id: '2', label: '导航系统校准（对准轨道）', hint: '第二步：确定方向' },
      { id: '3', label: '通讯系统测试（和地面连线）', hint: '第三步：保持联系' },
      { id: '4', label: '发动机点火准备（燃料加压）', hint: '最后一步：准备出发！' },
    ],
    correctAnswer: '1-2-3-4',
    feedbackCorrect: '完美！你记住了航天员的操作流程：先保命（生命支持），再找路（导航），接着通话（通讯），最后点火。这个顺序在执行太空任务时非常关键！ 🚀',
    feedbackWrong: '顺序不太对哦。记住口诀：先保命、再找路、接着通话、最后点火。安全永远是第一位的！',
    abilityTag: '机械操作',
  },
  {
    step: 3,
    sceneName: '火箭发射台',
    title: '倒计时突发状况',
    mentorAvatar: '🦉',
    dialogText: '⚠️ 警报！火箭发射倒计时 T-30 秒，但传感器显示燃料压力出现异常波动。地面控制中心需要你做出决定——',
    interactionType: 'countdown',
    choices: [
      { id: 'a', label: '立即中止发射，检查问题', emoji: '🛑', isCorrect: true },
      { id: 'b', label: '继续倒计时，可能是传感器误报', emoji: '🚀', isCorrect: false },
    ],
    correctAnswer: 'a',
    feedbackCorrect: '明智的决定！安全第一。后来的检查发现，燃料阀门确实有一个微小的泄漏——如果强行发射，后果不堪设想。你展现了真正的航天员品质：在压力下做出正确的安全判断！ 🧘',
    feedbackWrong: '噢！你选择了继续发射...但在航天领域，"安全第一"是最重要的原则。一个小小的问题在太空中可能变成灾难。航天员要学会在关键时刻说"不"！',
    abilityTag: '冷静心态',
  },
  {
    step: 4,
    sceneName: '太空舱内',
    title: '在轨实验安全确认',
    mentorAvatar: '🦉',
    dialogText: '现在你在太空舱内，准备进行一项重要的微重力实验。在开始之前，需要完成安全检查。逐项确认下面的清单 📋',
    interactionType: 'checklist',
    checklist: [
      { id: '1', label: '实验手套箱密封性检查', hint: '不能有任何泄漏！微重力下液体飘散很危险' },
      { id: '2', label: '灭火器在位且压力正常', hint: '太空中火灾是最可怕的' },
      { id: '3', label: '通风系统正常运行', hint: '呼出的二氧化碳必须及时排走' },
      { id: '4', label: '紧急通讯频道已接通地面', hint: '随时可以呼叫地球求助' },
    ],
    correctAnswer: 'all',
    feedbackCorrect: '全部检查通过！你展现了航天员严谨的工作态度。在太空中，任何一个遗漏的检查项都可能演变成大问题。你的细心让实验可以安全进行！ 🔬✨',
    feedbackWrong: '还有项目没完成哦！在太空中，安全检查没有"差不多"——每一项都必须确认。再检查一遍吧！🛡️',
    abilityTag: '科学实验',
  },
  {
    step: 5,
    sceneName: '任务完成',
    title: '🎉 恭喜你完成了航天员体验！',
    mentorAvatar: '🦉',
    dialogText: '太厉害了！你完整地体验了一天航天员的工作：从体能训练到太空实验，从危机决策到安全检查。你展现了冷静、勇敢和严谨的品质——这些都是真正的航天员必备的！',
    interactionType: 'celebration',
    abilityTag: '综合能力',
  },
];

export const astronautResources: CareerResources = {
  careerId: 'astronaut',
  practices: [
    {
      name: '北京航天科普夏令营',
      location: '北京',
      ageRange: '8-15岁',
      description: '为期 5 天的沉浸式航天体验：模拟发射、失重水槽、航天服试穿、火箭模型制作',
      emoji: '🏕️',
    },
    {
      name: '中国科技馆"小小航天员"活动',
      location: '北京',
      ageRange: '6-12岁',
      description: '周末半天活动，在科技馆太空展厅进行角色扮演，完成"太空任务"闯关',
      emoji: '🎮',
    },
  ],
  books: [
    {
      name: '《下一站火星》',
      description: '用漫画形式讲述火星探索的历史和未来计划。适合低年级独立阅读，大量插图',
      ageRange: '7-12岁',
      emoji: '📚',
    },
    {
      name: '《太空旅行指南》',
      description: '如果你真的要去太空旅行，需要知道的一切！从训练到发射到在轨生活，超级有趣',
      ageRange: '8-14岁',
      emoji: '📖',
    },
    {
      name: '《中国航天员》',
      description: '真实记录了中国航天员从选拔到飞天的全过程，大量珍贵照片和第一人称讲述',
      ageRange: '10-15岁',
      emoji: '🇨🇳',
    },
  ],
  visits: [
    {
      name: '中国科学技术馆·太空探索厅',
      location: '北京',
      description: '全国最大的太空主题展厅，有真实的返回舱（烧焦的那种！）、火箭发动机、太空服展示',
      ageRange: '全年龄段',
      emoji: '🏛️',
    },
    {
      name: '北京航天城',
      location: '北京',
      description: '中国航天员训练基地（部分开放），可以看到真实的训练设备和模拟器',
      ageRange: '10岁以上',
      emoji: '🚀',
    },
  ],
};

export const astronautDiscoveries: Discovery[] = [
  {
    id: 'd1',
    emoji: '🎠',
    title: '航天员要坐"疯狂旋转椅"',
    description: '前庭训练用的旋转椅每分钟转30圈！它能帮助航天员适应太空中的眩晕感。很多航天员第一次上去都会吐——但坚持下来就好了。厉害的人不是天生厉害，是练出来的！',
  },
  {
    id: 'd2',
    emoji: '🧯',
    title: '太空中最怕的不是外星人，是火灾',
    description: '在微重力环境下，火焰是球形的，而且更难扑灭。所以每次实验前，航天员都要先确认灭火器在附近。安全习惯，救命的习惯！',
  },
  {
    id: 'd3',
    emoji: '🌟',
    title: '航天员在太空中会长高！',
    description: '因为失重，脊椎骨之间的空隙会扩张，航天员在太空中能长高 3-5 厘米！不过回到地球后，重力又会把他们"压"回去。这就是为什么航天员回到地面要被抬着走——他们的身体需要时间重新适应重力。',
  },
];
