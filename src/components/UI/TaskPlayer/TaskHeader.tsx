interface Props {
  currentStep: number;
  totalSteps: number;
}

export default function TaskHeader({ currentStep, totalSteps }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`step-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
        />
      ))}
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>
        {currentStep + 1}/{totalSteps}
      </span>
    </div>
  );
}
