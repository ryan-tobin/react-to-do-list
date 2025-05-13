import React from 'react';

const ProgressBar = ({ percent }) => (
  <div style={{
    background: '#e5e7eb',
    borderRadius: 8,
    height: 12,
    margin: '1rem 0',
    width: '100%',
    overflow: 'hidden'
  }}>
    <div style={{
      background: '#6366f1',
      height: '100%',
      width: `${percent}%`,
      borderRadius: 8,
      transition: 'width 0.3s'
    }} />
  </div>
);

export default ProgressBar;