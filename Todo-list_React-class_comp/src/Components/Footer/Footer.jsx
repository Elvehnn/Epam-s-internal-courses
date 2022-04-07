import React from 'react';
import './Footer.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: true,
      active: false,
      completed: false,
    };
  }

  clearCompletedTodos = () => {
    const todosToRemove = this.props.todoList.filter((item) => item.completed === true);

    this.props.onUpdateTodoList(todosToRemove);
  };

  getFilterValue = (event) => {
    const newFilterValue = event.target.innerText;

    for (let key in this.state) {
      if (key === event.target.innerText.toLowerCase()) {
        this.setState({ [key]: true });
      } else this.setState({ [key]: false });
    }

    this.props.onChangeFilter(newFilterValue);
  };

  render() {
    const completedTodosList = this.props.todoList.filter((item) => item.completed === !true);

    return (
      <div className="footer">
        <span className="footer__todo-counter">{completedTodosList.length} items left</span>

        <ul className="filters">
          <li
            className={this.state.all ? 'active' : ''}
            onClick={(event) => this.getFilterValue(event)}
          >
            <a href="#/">All</a>
          </li>
          <li
            className={this.state.active ? 'active' : ''}
            onClick={(event) => this.getFilterValue(event)}
          >
            <a href="#/">Active</a>
          </li>
          <li
            className={this.state.completed ? 'active' : ''}
            onClick={(event) => this.getFilterValue(event)}
          >
            <a href="#/">Completed</a>
          </li>
        </ul>

        <button className="footer__clear-button" onClick={this.clearCompletedTodos}>
          Clear completed
        </button>
      </div>
    );
  }
}

export default Footer;
