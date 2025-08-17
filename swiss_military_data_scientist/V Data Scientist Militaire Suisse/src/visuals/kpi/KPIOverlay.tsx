import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { useStoryStore } from '../../store/storyStore';

export const KPIOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phase = useStoryStore(s => s.phase);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const data: Partial<Plotly.PlotData>[] = [
      {
        type: 'indicator',
        mode: 'number+delta',
        value: phase === 'logistics' ? 92 : phase === 'tactics' ? 87 : 75,
        delta: { reference: 70, valueformat: '.0f' },
        title: { text: 'Efficacité mission (%)' },
        domain: { row: 0, column: 0 }
      },
      {
        type: 'bar',
        x: ['Delai log', 'Couverture', 'Risque'],
        y: phase === 'tactics' ? [12, 86, 18] : [16, 82, 22],
        marker: { color: ['#46a0ff', '#00f0b5', '#ff4d6d'] }
      }
    ];
    const layout: Partial<Plotly.Layout> = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#e6eefc' },
      margin: { l: 30, r: 10, t: 20, b: 30 },
      height: 220
    };
    Plotly.react(el, data as any, layout as any, { displayModeBar: false });
  }, [phase]);

  return (
    <div className="panel">
      <h3>Indicateurs clés</h3>
      <div ref={containerRef} />
      <div className="row" style={{ marginTop: 8 }}>
        <div className="chip">Python</div>
        <div className="chip">R</div>
        <div className="chip">GIS</div>
        <div className="chip">ML</div>
        <div className="chip">Simulation</div>
      </div>
    </div>
  );
};


