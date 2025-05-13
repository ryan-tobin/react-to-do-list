import React, { useState, useRef } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import CalendarView from './components/CalendarView';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';
import confetti from 'canvas-confetti';
import ProgressBar from './components/ProgressBar';
import StatsBar from './components/StatsBar';
import ColorThemePicker from './components/ColorThemePicker';
import MotivationalQuote from './components/MotivationalQuote';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list');
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState('#6366f1');
  const confettiRef = useRef(null);

  // Update CSS variable for theme color
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', themeColor);
  }, [themeColor]);

  const addTodo = (text, date, priority, recurring, subtasks) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      date: date || new Date().toISOString().split('T')[0],
      priority: priority || 'medium',
      recurring: recurring || 'none',
      subtasks: subtasks || [],
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);

    if (updated.length > 0 && updated.every((t) => t.completed)) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const toggleSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? {
            ...todo,
            subtasks: todo.subtasks.map(st =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            ),
          }
        : todo
    ));
  };

  const addSubtask = (todoId, text) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? {
            ...todo,
            subtasks: [
              ...todo.subtasks,
              { id: Date.now(), text, completed: false }
            ],
          }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  // Move a todo to a new date (for calendar drag-and-drop)
  const moveTodoToDate = (todoId, newDate) => {
    setTodos(todos.map(todo =>
      todo.id === todoId ? { ...todo, date: newDate } : todo
    ));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  React.useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div>
      <div className="todo-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <ColorThemePicker value={themeColor} onChange={setThemeColor} />
          <button
            className="add-task-btn"
            style={{ marginBottom: '0', float: 'right' }}
            onClick={() => setDarkMode((d) => !d)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <div className="todo-logo">📝</div>
        <h1>Todo List</h1>
        <TodoForm onAdd={addTodo} />
        <TodoFilter filter={filter} onFilterChange={setFilter} />
        <div className="filter-btns">
          <button
            onClick={() => setView('list')}
            className={`filter-btn${view === 'list' ? ' active' : ''}`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`filter-btn${view === 'calendar' ? ' active' : ''}`}
          >
            Calendar View
          </button>
        </div>
        <StatsBar todos={todos} />
        <ProgressBar percent={todos.length === 0 ? 0 : 100 * todos.filter(t => t.completed).length / todos.length} />
        {view === 'list' ? (
          <TodoList
            todos={filteredTodos}
            onDragEnd={handleDragEnd}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onToggleSubtask={toggleSubtask}
            onAddSubtask={addSubtask}
          />
        ) : (
          <CalendarView todos={todos} onMoveTodo={moveTodoToDate} />
        )}
        <div className="todo-footer">
          &copy; Ryan Tobin, 2025
        </div>
      </div>
      <canvas ref={confettiRef} className="confetti-canvas" style={{display: 'none'}} />
    </div>
  );
}

export default App;