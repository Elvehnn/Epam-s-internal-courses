import React from 'react';
import { InputProps, InputState } from '../../Interfaces';
import SelectAllItemButton from '../Buttons/SelectAllItemsButton/SelectAllItemsButton';
import './Input.scss';

class Input extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = { newToDoItem: '' };
  }

  handleChange = (event: { target: { value: string } }): void => {
    if (event.target.value.trim() === '') return;

    this.setState({
      newToDoItem: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    this.props.onAddTodo(this.state.newToDoItem);
    event.preventDefault();

    this.setState({ newToDoItem: '' });
  };

  handleBlur = (event: { target: { value: string } }): void => {
    if (event.target.value.trim() === '') return;

    this.props.onAddTodo(this.state.newToDoItem);
    this.setState({ newToDoItem: '' });
  };

  render() {
    return (
      <form className="add" autoComplete="off" onSubmit={this.handleSubmit}>
        <SelectAllItemButton
          makeAllTodosCompleted={this.props.makeAllTodosCompleted}
          selectAllButtonChecked={this.props.selectAllButtonChecked}
        />
        <input
          id="mainInput"
          type="text"
          name="add"
          placeholder="Add item..."
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.newToDoItem}
        ></input>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Input;
