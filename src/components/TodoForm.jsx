import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [recurring, setRecurring] = useState('none');
  const [subtaskText, setSubtaskText] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, date, priority, recurring, subtasks);
      setText('');
      setDate('');
      setPriority('medium');
      setRecurring('none');
      setSubtasks([]);
    }
  };

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      setSubtasks([...subtasks, { id: Date.now(), text: subtaskText, completed: false }]);
      setSubtaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="todo-date"
        min={new Date().toISOString().split('T')[0]}
      />
      <select value={priority} onChange={e => setPriority(e.target.value)} className="todo-date">
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <select value={recurring} onChange={e => setRecurring(e.target.value)} className="todo-date">
        <option value="none">One-time</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', width: '100%' }}>
        <input
          type="text"
          value={subtaskText}
          onChange={e => setSubtaskText(e.target.value)}
          placeholder="Add subtask"
          className="todo-input"
        />
        <button type="button" className="add-task-btn" onClick={handleAddSubtask}>Add Subtask</button>
      </div>
      <div style={{ width: '100%', marginTop: '0.5rem' }}>
        {subtasks.map(st => (
          <span key={st.id} style={{ marginRight: 8, fontSize: '0.95em', color: 'var(--accent, #6366f1)' }}>
            {st.text}
          </span>
        ))}
      </div>
      <button type="submit" className="add-task-btn" style={{ marginTop: '0.5rem' }}>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;