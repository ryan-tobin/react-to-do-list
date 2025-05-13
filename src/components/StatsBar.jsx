import React from 'react';

const StatsBar = ({ todos }) => {
  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Streak: count consecutive days with at least one completed task
  const today = new Date().toISOString().split('T')[0];
  const days = {};
  todos.forEach(t => {
    if (t.completed && t.date) days[t.date] = true;
  });
  let streak = 0;
  let d = new Date(today);
  while (days[d.toISOString().split('T')[0]]) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  return (
    <div style={{ margin: '1rem 0', textAlign: 'center' }}>
      <div>Completed: {completed} / {total} ({percent}%)</div>
      <div>Streak: {streak} day{streak !== 1 ? 's' : ''}</div>
    </div>
  );
};

export default StatsBar;