import { Component } from 'react';
import './footer.css';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'done', label: 'Done' },
    ];
  }

  render() {
    const { todoCount, todoLeft, filter, onFilterChange, onDeleteDone } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button key={name} type="button" className={`btn ${clazz}`} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });

    return (
      <footer className="footer">
        <span className="todo-count">
          Things to do:
          {todoCount}
        </span>
        <span className="todo-count">
          Things left to do:
          {todoLeft}
        </span>
        <div className="filters">{buttons}</div>
        <button type="button" className="clear-completed" onClick={onDeleteDone}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  onDeleteDone: () => {},
};

Footer.propTypes = {
  onDeleteDone: PropTypes.func,
};
