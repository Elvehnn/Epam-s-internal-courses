import { todos, filter, allButtonChecked } from './reducer';
import {
	addTodo,
	editTodo,
	clearCompletedTodos,
	toggleTodo,
	toggleAllTodo,
	deleteTodo,
	setFilter,
	selectAllButtonChecked,
	FILTER_OPTIONS,
} from './actions';

describe('reducer', () => {
	const previousState = [
		{
			id: 0,
			todo: 'Learn React',
			completed: true,
		},
		{
			id: 1,
			todo: 'Use Redux',
			completed: false,
		},
	];

	test('should return the initial state', () => {
		expect(todos(undefined, { type: 'create' })).toEqual([]);
	});

	test('should add todo to an empty list', () => {
		expect(todos(undefined, addTodo('Learn React'))).toEqual([
			{
				id: 0,
				todo: 'Learn React',
				completed: false,
			},
		]);
	});

	test('should add todo to an existing list', () => {
		expect(todos(previousState, addTodo('Write tests'))).toEqual([
			{
				id: 0,
				todo: 'Learn React',
				completed: true,
			},
			{
				id: 1,
				todo: 'Use Redux',
				completed: false,
			},
			{
				id: 2,
				todo: 'Write tests',
				completed: false,
			},
		]);
	});

	test('should edit todo in a list', () => {
		expect(
			todos(
				previousState,
				editTodo({
					id: 0,
					todo: 'Learn React Native',
					completed: true,
				})
			)
		).toEqual([
			{
				id: 0,
				todo: 'Learn React Native',
				completed: true,
			},
			{
				id: 1,
				todo: 'Use Redux',
				completed: false,
			},
		]);
	});

	test('should delete all completed todos in a list', () => {
		expect(todos(previousState, clearCompletedTodos())).toEqual([
			{
				id: 0,
				todo: 'Use Redux',
				completed: false,
			},
		]);
	});

	test('should toggle todo to completed', () => {
		expect(todos(previousState, toggleTodo(1))).toEqual([
			{
				id: 0,
				todo: 'Learn React',
				completed: true,
			},
			{
				id: 1,
				todo: 'Use Redux',
				completed: true,
			},
		]);
	});

	test('should toggle todo to active', () => {
		expect(todos(previousState, toggleTodo(0))).toEqual([
			{
				id: 0,
				todo: 'Learn React',
				completed: false,
			},
			{
				id: 1,
				todo: 'Use Redux',
				completed: false,
			},
		]);
	});

	test('should toggle all todos to completed', () => {
		expect(
			todos(
				[
					{
						id: 0,
						todo: 'Learn React',
						completed: false,
					},
					{
						id: 1,
						todo: 'Use Redux',
						completed: false,
					},
				],
				toggleAllTodo(true)
			)
		).toEqual([
			{
				id: 0,
				todo: 'Learn React',
				completed: true,
			},
			{
				id: 1,
				todo: 'Use Redux',
				completed: true,
			},
		]);
	});

	test('should toggle all todos to active', () => {
		expect(
			todos(
				[
					{
						id: 0,
						todo: 'Learn React',
						completed: true,
					},
					{
						id: 1,
						todo: 'Use Redux',
						completed: true,
					},
				],
				toggleAllTodo(false)
			)
		).toEqual([
			{
				id: 0,
				todo: 'Learn React',
				completed: false,
			},
			{
				id: 1,
				todo: 'Use Redux',
				completed: false,
			},
		]);
	});

	test('should delete todo', () => {
		expect(todos(previousState, deleteTodo(1))).toEqual([
			{
				id: 0,
				todo: 'Learn React',
				completed: true,
			},
		]);
	});

	test('should set filter Completed', () => {
		expect(filter('', setFilter(FILTER_OPTIONS.SHOW_COMPLETED))).toBe('Completed');
	});

	test('should set filter Active', () => {
		expect(filter('', setFilter(FILTER_OPTIONS.SHOW_ACTIVE))).toBe('Active');
	});

	test('should set filter All', () => {
		expect(filter('', setFilter(FILTER_OPTIONS.SHOW_ALL))).toBe('');
	});

	test('should return initial filter state', () => {
		expect(filter(undefined, { type: '' })).toBe('');
	});

	test('should return allButtonChecked initial state', () => {
		expect(allButtonChecked(undefined, { type: 'unknow' })).toBeFalsy();
	});

	test('should set allButtonChecked to true', () => {
		expect(allButtonChecked(false, selectAllButtonChecked(true))).toBeTruthy();
	});

	test('should set allButtonChecked to false', () => {
		expect(allButtonChecked(true, selectAllButtonChecked(false))).toBeFalsy();
	});
});
