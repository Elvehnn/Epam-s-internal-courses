import React, { useState } from 'react';
import { InputProps } from '../../Interfaces';
import SelectAllItemButton from '../Buttons/SelectAllItemsButton/SelectAllItemsButton';
import './Input.scss';

const Input = ({ onAddTodo, makeAllTodosCompleted, selectAllButtonChecked }: InputProps) => {
  const [newToDoItem, setNewToDoItem] = useState('');

  const handleChange = (event: { target: { value: string } }): void => {
    if (event.target.value.trim() === '') return;

    setNewToDoItem(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    onAddTodo(newToDoItem);
    event.preventDefault();
    setNewToDoItem('');
  };

  const handleBlur = (event: { target: { value: string } }): void => {
    if (event.target.value.trim() === '') return;

    onAddTodo(newToDoItem);
    setNewToDoItem('');
  };

  return (
    <form className="add" autoComplete="off" onSubmit={handleSubmit}>
      <SelectAllItemButton
        makeAllTodosCompleted={makeAllTodosCompleted}
        selectAllButtonChecked={selectAllButtonChecked}
      />
      <input
        id="mainInput"
        type="text"
        name="add"
        placeholder="Add item..."
        onChange={handleChange}
        onBlur={handleBlur}
        value={newToDoItem}
      ></input>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Input;
