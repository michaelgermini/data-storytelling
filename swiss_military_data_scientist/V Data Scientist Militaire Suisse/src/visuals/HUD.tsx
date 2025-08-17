import React from 'react';
import { useStoryStore } from '../store/storyStore';
import { KPIOverlay } from './kpi/KPIOverlay';

export const HUD: React.FC = () => {
  const timeOfDay = useStoryStore(s => s.timeOfDay);

  return (
    <div className="hud">
      <div className="topbar">
        <div className="brand">Swiss Defense 3D — Portfolio</div>
        <div className="legend">
          <div className="pill"><span className="dot logi" />Flux logistiques</div>
          <div className="pill"><span className="dot sim" />Simulations</div>
          <div className="pill"><span className="dot kpi" />KPI</div>
        </div>
        <div className="pill">Mode: {timeOfDay === 'day' ? 'Jour' : 'Nuit'}</div>
      </div>
      <KPIOverlay />
    </div>
  );
};


