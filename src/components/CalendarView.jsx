import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CalendarView = ({ todos, onMoveTodo }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Build calendar grid
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTodos = todos.filter(todo => todo.date === dateStr);

    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    calendarCells.push(
      <Droppable droppableId={dateStr} key={dateStr}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`calendar-cell${isToday ? ' today' : ''}`}
            style={{
              background: snapshot.isDraggingOver ? '#e0e7ff' : undefined,
              minHeight: 70,
            }}
          >
            <div className="calendar-day">{day}</div>
            <div className="calendar-tasks">
              {dayTodos.map((todo, idx) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`calendar-task${todo.completed ? ' completed' : ''}`}
                      title={todo.text}
                    >
                      {todo.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Handle drag end for calendar
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const todoId = Number(result.draggableId);
    const newDate = result.destination.droppableId;
    onMoveTodo(todoId, newDate);
  };

  return (
    <div>
      <div className="calendar-header">
        {monthNames[currentMonth]} {currentYear}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="calendar-grid">
          {dayNames.map(day => (
            <div key={day} className="calendar-cell calendar-dayname">
              {day}
            </div>
          ))}
          {calendarCells}
        </div>
      </DragDropContext>
    </div>
  );
};

export default CalendarView;