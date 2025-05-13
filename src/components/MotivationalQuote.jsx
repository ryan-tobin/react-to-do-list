import React from 'react';

const QUOTES = [
  "You can do it!",
  "Every day is a fresh start.",
  "Small steps every day.",
  "Stay positive, work hard, make it happen.",
  "Dream big, start small, act now.",
  "Progress, not perfection.",
  "Believe in yourself.",
  "Success is the sum of small efforts repeated.",
  "You are capable of amazing things.",
  "Don't watch the clock; do what it does. Keep going.",
];

const MotivationalQuote = () => {
  const quote = React.useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    []
  );
  return (
    <div style={{
      textAlign: 'center',
      fontStyle: 'italic',
      color: 'var(--accent, #6366f1)',
      margin: '1rem 0 1.5rem 0',
      fontSize: '1.1rem'
    }}>
      {quote}
    </div>
  );
};

export default MotivationalQuote;