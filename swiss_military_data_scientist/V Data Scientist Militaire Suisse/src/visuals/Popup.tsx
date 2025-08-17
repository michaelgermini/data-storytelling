import React from 'react';
import { useSelectionStore } from '../store/selectionStore';

export const Popup: React.FC = () => {
  const { selected, clear } = useSelectionStore();
  if (!selected) return null;
  return (
    <div className="popup">
      <h4>{selected.name}</h4>
      <div className="meta">{selected.type}{selected.canton ? ` — ${selected.canton}` : ''}</div>
      {selected.summary && <p>{selected.summary}</p>}
      {selected.metrics && selected.metrics.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {selected.metrics.map((m) => (
            <div key={m.label} className="row" style={{ justifyContent: 'space-between' }}>
              <span className="chip">{m.label}</span>
              <span className="chip">{m.value}</span>
            </div>
          ))}
        </div>
      )}
      {selected.skills && selected.skills.length > 0 && (
        <div className="row" style={{ marginBottom: 8 }}>
          {selected.skills.map(s => <div key={s} className="chip">{s}</div>)}
        </div>
      )}
      {selected.experiences && selected.experiences.length > 0 && (
        <ul style={{ marginTop: 6 }}>
          {selected.experiences.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
        <button className="btn" onClick={clear}>Fermer</button>
      </div>
    </div>
  );
};


