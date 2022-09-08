import React, { Component } from 'react';

import AppHeader from '../app-header';
import TaskListAndFooter from '../task-list-and-footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.newId = 1;

    this.state = {
      taskData: [],
      filter: '', // all, active, done
    };

    this.createNewItem = this.createNewItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.onToddleImportant = this.onToddleImportant.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDeleteDone = this.onDeleteDone.bind(this);
  }

  onDeleteDone() {
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((task) => !task.done),
    }));
  }

  onToggleDone(id) {
    this.setState(({ taskData }) => ({
      taskData: this.toggleProperty(taskData, id, 'done'),
    }));
  }

  onToddleImportant(id) {
    this.setState(({ taskData }) => ({
      taskData: this.toggleProperty(taskData, id, 'important'),
    }));
  }

  onFilterChange(filter) {
    this.setState({ filter });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  toggleProperty(arr, id, property) {
    const idx = arr.findIndex((el) => el.id === id);
    // найти элемент в старом состоянии, т.е. до изменения состояния 'done'
    const oldItem = arr[idx];
    // найти элемент в новом состоянии - с измененным 'done'
    const newItem = { ...oldItem, [property]: !oldItem[property] };
    // теперь осталось заменить в массиве с данными элемент oldItem на newItem
    // и вернуть объект в обновленном состоянии
    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);
    return [...before, newItem, ...after];
  }

  addItem(text) {
    const newItem = this.createNewItem(text);

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem];
      return {
        taskData: newArr,
      };
    });
  }

  deleteItem(id) {
    this.setState(({ taskData }) => {
      const idx = this.determineIndex(id, { taskData });
      const before = taskData.slice(0, idx);
      const after = taskData.slice(idx + 1);
      const newArr = [...before, ...after];
      return {
        taskData: newArr,
      };
    });
  }

  createNewItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.newId++,
    };
  }

  determineIndex(id, { taskData }) {
    return taskData.findIndex((el) => el.id === id);
  }

  render() {
    const todoCount = this.state.taskData.filter((el) => el.done).length;
    const todoLeft = this.state.taskData.length - todoCount;
    const checkedId = this.state.taskData.id;

    const { taskData, filter } = this.state;
    const visibleItems = this.filter(taskData, filter);

    return (
      <div>
        <AppHeader onAdded={this.addItem} />
        <TaskListAndFooter
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onAdded={this.addItem}
          onToggleDone={this.onToggleDone}
          onChecked={this.onChecked}
          onToggleImportant={this.onToddleImportant}
          todoCount={todoCount}
          todoLeft={todoLeft}
          filter={filter}
          checkedId={checkedId}
          onFilterChange={this.onFilterChange}
          onDeleteDone={this.onDeleteDone}
        />
      </div>
    );
  }
}
