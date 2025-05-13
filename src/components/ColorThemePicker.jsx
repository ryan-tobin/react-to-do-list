import React from 'react';

const THEMES = [
  { name: 'Indigo', color: '#6366f1' },
  { name: 'Green', color: '#22c55e' },
  { name: 'Pink', color: '#ec4899' },
  { name: 'Orange', color: '#f59e42' },
];

const ColorThemePicker = ({ value, onChange }) => (
  <div style={{ display: 'flex', gap: 12, margin: '1rem 0', justifyContent: 'center' }}>
    {THEMES.map(theme => (
      <button
        key={theme.name}
        type="button"
        onClick={() => onChange(theme.color)}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: theme.color,
          border: value === theme.color ? '3px solid #22223b' : '2px solid #e5e7eb',
          cursor: 'pointer',
        }}
        aria-label={`Choose theme ${theme.name}`}
      />
    ))}
  </div>
);

export default ColorThemePicker;