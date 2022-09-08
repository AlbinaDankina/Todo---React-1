import React from 'react';

import Task from '../task/task';
import './task-list.css';

function TaskList(props) {
  const { onDeleted, onToggleDone, onToggleImportant, checkedId } = props;
  const elements = props.items.todos.map((item) => {
    const { id } = item;
    return (
      <li className="completed" key={id}>
        <Task
          onDeleted={() => onDeleted(id)}
          {...item}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
          checkedId={checkedId}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
