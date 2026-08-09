import { useGameStore } from '../../../store/gameStore';
import { astronautIntro, astronautCareer } from '../../../data/astronaut';
import BasicInfoCard from './BasicInfoCard';
import AbilityGrid from './AbilityGrid';
import WorkTimeline from './WorkTimeline';
import FigureCard from './FigureCard';
import MascotGuide from '../MascotGuide';

export default function CareerIntro() {
  const setJourneyPhase = useGameStore((s) => s.setJourneyPhase);
  const intro = astronautIntro;
  const career = astronautCareer;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部导航 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', paddingTop: 'max(16px, env(safe-area-inset-top))',
      }}>
        <button
          onClick={() => setJourneyPhase('hall')}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: 14 }}
        >
          ← 返回
        </button>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
          职业介绍
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* 滚动内容 */}
      <div className="page-scroll" style={{ paddingBottom: 120 }}>
        {/* 头部 */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{career.emoji}</div>
          <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 6 }}>{career.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>{career.tagline}</p>
        </div>

        {/* (a) 基础信息 */}
        <BasicInfoCard basicInfo={intro.basicInfo} subjects={career.subjects} />

        {/* (b) 特质与能力 */}
        <AbilityGrid abilities={intro.abilities} />

        {/* (c) 工作内容 */}
        <WorkTimeline scenes={intro.workContent} />

        {/* (d) 典型人物 */}
        <FigureCard figures={intro.typicalFigures} />

        {/* CTA 按钮 */}
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button
            className="btn-primary"
            onClick={() => setJourneyPhase('experience')}
            style={{ fontSize: 20, padding: '16px 40px' }}
          >
            🚀 想试试当一天航天员吗？
          </button>
        </div>
      </div>

      {/* 小知 */}
      <MascotGuide
        message="往下滑，了解更多关于航天员的酷炫知识！"
        position="bottom-right"
        size="sm"
      />
    </div>
  );
}
