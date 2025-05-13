import React from 'react';

const TodoFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="filter-btns">
      <button
        onClick={() => onFilterChange('all')}
        className={`filter-btn${filter === 'all' ? ' active' : ''}`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`filter-btn${filter === 'active' ? ' active' : ''}`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`filter-btn${filter === 'completed' ? ' active' : ''}`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;