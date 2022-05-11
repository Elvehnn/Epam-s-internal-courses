import { Todo } from '../Interfaces';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';
export const TOGGLE_ALL_TODO = 'TOGGLE_ALL_TODO';
export const SET_FILTER = 'SET_FILTER';
export const SELECT_ALL_ITEM_BUTTON = 'SELECT_ALL_ITEM_BUTTON';
export const EDIT_TODO = 'EDIT_TODO';

export const FILTER_OPTIONS = {
	SHOW_ALL: '',
	SHOW_COMPLETED: 'Completed',
	SHOW_ACTIVE: 'Active',
};

export const addTodo = (text: string) => {
	return { type: ADD_TODO, text };
};

export const editTodo = (newTodo: Todo) => {
	return { type: EDIT_TODO, newTodo };
};

export const clearCompletedTodos = () => {
	return { type: CLEAR_COMPLETED_TODOS };
};

export const toggleTodo = (index: number) => {
	return { type: TOGGLE_TODO, index };
};

export const toggleAllTodo = (isChecked: boolean) => {
	return { type: TOGGLE_ALL_TODO, isChecked };
};

export const deleteTodo = (index: number) => {
	return { type: DELETE_TODO, index };
};

export const setFilter = (filter: string) => {
	return { type: SET_FILTER, filter };
};

export const selectAllButtonChecked = (isChecked: boolean) => {
	return { type: SELECT_ALL_ITEM_BUTTON, isChecked };
};
