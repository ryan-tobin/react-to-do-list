import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDragEnd, onToggle, onDelete, onEdit }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos" isDropDisabled={false}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="todo-list"
          >
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;