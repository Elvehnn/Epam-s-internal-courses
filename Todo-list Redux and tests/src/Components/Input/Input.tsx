import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectAllItemButton from '../Buttons/SelectAllItemsButton/SelectAllItemsButton';
import './Input.scss';
import { addTodo } from '../../Store/actions';

const Input = () => {
	const [newToDoItem, setNewToDoItem] = useState('');

	const dispatch = useDispatch();

	const handleChange = (event: { target: { value: string } }): void => {
		if (event.target.value.trim() === '') return;

		setNewToDoItem(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (newToDoItem.trim() === '') return;

		dispatch(addTodo(newToDoItem));
		setNewToDoItem('');
	};

	const handleBlur = (event: { target: { value: string } }): void => {
		if (event.target.value.trim() === '') return;

		dispatch(addTodo(newToDoItem));
		setNewToDoItem('');
	};

	return (
		<form className="add" autoComplete="off" onSubmit={handleSubmit} data-testid="form">
			<SelectAllItemButton />
			<input
				id="mainInput"
				data-testid="input"
				type="text"
				name="add"
				placeholder="Add item..."
				onChange={handleChange}
				onBlur={handleBlur}
				value={newToDoItem}
			></input>
			<input type="submit" value="Submit" data-testid="submit" />
		</form>
	);
};

export default Input;
