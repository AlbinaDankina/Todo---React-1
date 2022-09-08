import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };

    this.onLabelChange = this.onLabelChange.bind(this);
  }

  onLabelChange(e) {
    this.setState({
      label: e.target.value,
    });
  }

  render() {
    const newTaskText = 'Add new todoshka here!';

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onAdded(this.state.label);
          this.setState({
            label: '',
          });
        }}
      >
        <input
          type="text"
          onChange={this.onLabelChange}
          className="new-todo"
          placeholder={newTaskText}
          value={this.state.label}
        />
      </form>
    );
  }
}
