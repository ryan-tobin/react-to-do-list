import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const priorityColors = {
  low: { background: '#d1fae5', color: '#065f46' },
  medium: { background: '#fef3c7', color: '#92400e' },
  high: { background: '#fee2e2', color: '#991b1b' },
};

const TodoItem = ({ todo, index, onToggle, onDelete, onEdit, onToggleSubtask, onAddSubtask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [subtaskText, setSubtaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      onAddSubtask(todo.id, subtaskText);
      setSubtaskText('');
    }
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`todo-item${todo.completed ? ' completed' : ''}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span
            style={{
              ...priorityColors[todo.priority],
              borderRadius: '0.4em',
              padding: '0.1em 0.5em',
              fontSize: '0.9em',
              marginRight: 8,
              fontWeight: 600,
            }}
          >
            {todo.priority}
          </span>
          {isEditing ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="todo-input"
                autoFocus
              />
              <button type="submit" className="add-task-btn">Save</button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="filter-btn"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <span style={{ flex: 1 }}>
                {todo.text}
                {todo.date && (
                  <span className="todo-date-label">
                    {new Date(todo.date + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="filter-btn"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="filter-btn"
                style={{ color: '#dc2626' }}
              >
                Delete
              </button>
            </>
          )}
          {/* Subtasks */}
          {todo.subtasks && todo.subtasks.length > 0 && (
            <ul style={{ margin: '0.5em 0 0 2.5em', padding: 0, listStyle: 'none', width: '100%' }}>
              {todo.subtasks.map(st => (
                <li key={st.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => onToggleSubtask(todo.id, st.id)}
                  />
                  <span style={{ textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? '#a7a2d4' : '#22223b' }}>
                    {st.text}
                  </span>
                </li>
              ))}
              <li style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <input
                  type="text"
                  value={subtaskText}
                  onChange={e => setSubtaskText(e.target.value)}
                  placeholder="Add subtask"
                  style={{ flex: 1, borderRadius: 4, border: '1px solid #e5e7eb', padding: '0.2em 0.5em' }}
                />
                <button type="button" className="add-task-btn" onClick={handleAddSubtask}>+</button>
              </li>
            </ul>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;