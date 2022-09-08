import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      done: false,
      // eslint-disable-next-line react/no-unused-state
      important: false,
    };
  }

  render() {
    const taskCreatingTime = formatDistanceToNow(new Date(), {
      addSuffix: true,
    });

    const styles = {
      transform: 'translate(43px, 3px)',
    };

    const iconImportant = <FontAwesomeIcon style={styles} flip="horizontal" icon={faExclamation} />;
    const iconTrash = <FontAwesomeIcon style={styles} flip="horizontal" icon={faTrashCan} />;

    const { label, onDeleted, onToggleDone, onToggleImportant, important, done, id } = this.props;

    // eslint-disable-next-line no-console
    const classNames = 'description';

    if (done) {
      // eslint-disable-next-line react/no-unused-class-component-methods
      this.classNames += ' done';
    }
    if (important) {
      // eslint-disable-next-line react/no-unused-class-component-methods
      this.classNames += ' important';
    }
    const style = {
      textDecoration: done ? 'line-through' : 'none',
      color: important ? 'blue' : 'black',
      fontWeight: important ? '900' : '400',
    };

    return (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label role="presentation" onClick={onToggleDone} htmlFor={id}>
          <span style={style} className={classNames}>
            {label}
          </span>
          <span className="created">
            created
            {taskCreatingTime}
          </span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onToggleImportant}>
          {iconImportant}
        </button>
        <button type="button" onClick={onDeleted} className="icon icon-destroy ">
          {iconTrash}
        </button>
      </div>
    );
  }
}
