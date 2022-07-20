import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import ToDoListContainer from './ToDoListContainer';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import store from '../../Store/store';

describe('ToDoListContainer', () => {
	const renderToDoListContainer = (filter: string): RenderResult =>
		render(
			<Provider store={store}>
				<MemoryRouter>
					<ToDoListContainer filter={filter} />
				</MemoryRouter>
			</Provider>
		);

	test('render ToDoListContainer', () => {
		renderToDoListContainer('');

		expect(screen.getByTestId('todoList')).toBeInTheDocument();
		expect(screen.getByTestId('content')).toBeInTheDocument();
	});

	test('render initial state', () => {
		renderToDoListContainer('');

		expect(screen.getByTestId('footer-counter')).toHaveTextContent('0 items left');
		expect(screen.getByTestId('select-all')).not.toBeChecked();
	});

	test('should add an active todo item to list by submitting', () => {
		renderToDoListContainer('');
		userEvent.type(screen.getByTestId('input'), 'Learn Redux');
		fireEvent.submit(screen.getByTestId('submit'));

		expect(screen.getByTestId('list-item-checkbox')).not.toBeChecked();
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('Learn Redux');
		expect(screen.getByTestId('footer-counter')).toHaveTextContent('1 items left');
	});

	test('should toggle todo completeness', () => {
		renderToDoListContainer('');
		userEvent.click(screen.getByTestId('list-item-checkbox'));

		expect(screen.getByTestId('list-item-checkbox')).toBeChecked();
		expect(screen.getByTestId('footer-counter')).toHaveTextContent('0 items left');
	});

	test('should edit todo on double click and blur', async () => {
		renderToDoListContainer('');
		userEvent.dblClick(screen.getByTestId('list-item-text'));

		expect(screen.getByTestId('edit-item')).toBeInTheDocument();
		userEvent.type(screen.getByTestId('edit-item'), 'Learn Redux Native');
		expect(screen.getByTestId('edit-item')).toHaveValue('Learn Redux Native');

		userEvent.click(screen.getByTestId('footer'));

		expect(screen.queryByTestId('edit-item')).toBeNull();
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('Learn Redux Native');
	});

	test('should not edit todo if empty input value', async () => {
		renderToDoListContainer('');
		userEvent.dblClick(screen.getByTestId('list-item-text'));

		expect(screen.getByTestId('edit-item')).toBeInTheDocument();
		userEvent.type(screen.getByTestId('edit-item'), '   ');
		expect(screen.getByTestId('edit-item')).toHaveValue('');

		userEvent.click(screen.getByTestId('footer'));

		expect(screen.queryByTestId('edit-item')).toBeNull();
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('Learn Redux Native');
	});

	test('should edit todo on double click and Enter key', async () => {
		renderToDoListContainer('');
		userEvent.dblClick(screen.getByTestId('list-item-text'));

		expect(screen.getByTestId('edit-item')).toBeInTheDocument();
		userEvent.type(screen.getByTestId('edit-item'), 'Learn Redux Toolkit {enter}');

		expect(screen.queryByTestId('edit-item')).toBeNull();
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('Learn Redux Toolkit');
	});

	test('should add 2 todo items to list', () => {
		renderToDoListContainer('');
		userEvent.type(screen.getByTestId('input'), 'Write tests');
		fireEvent.submit(screen.getByTestId('submit'));
		userEvent.type(screen.getByTestId('input'), 'Fix bugs');
		fireEvent.submit(screen.getByTestId('submit'));

		expect(screen.getAllByTestId('list-item-text').length).toBe(3);
		expect(screen.getByTestId('footer-counter')).toHaveTextContent('2 items left');
	});

	test('should toggle all items to completed', () => {
		renderToDoListContainer('');
		expect(screen.getByTestId('select-all')).not.toBeChecked();
		userEvent.click(screen.getByTestId('select-all'));

		const checkboxes = screen.getAllByTestId('list-item-checkbox');
		expect(checkboxes.length).toBe(3);
		expect(checkboxes[0]).toBeChecked();
		expect(checkboxes[1]).toBeChecked();
		expect(checkboxes[2]).toBeChecked();
		expect(screen.getByTestId('footer-counter')).toHaveTextContent('0 items left');
	});

	test('should toggle all items to active', () => {
		renderToDoListContainer('');
		expect(screen.getByTestId('select-all')).toBeChecked();
		userEvent.click(screen.getByTestId('select-all'));

		const checkboxes = screen.getAllByTestId('list-item-checkbox');
		expect(checkboxes.length).toBe(3);
		expect(checkboxes[0]).not.toBeChecked();
		expect(checkboxes[1]).not.toBeChecked();
		expect(checkboxes[2]).not.toBeChecked();
		expect(screen.getByTestId('footer-counter')).toHaveTextContent('3 items left');
	});

	test('should remove completed items from list', () => {
		renderToDoListContainer('');
		const checkboxes = screen.getAllByTestId('list-item-checkbox');
		userEvent.click(checkboxes[2]);
		expect(checkboxes[2]).toBeChecked();
		userEvent.click(screen.getByTestId('clear-button'));

		expect(screen.getByTestId('footer-counter')).toHaveTextContent('2 items left');
		expect(screen.getAllByTestId('list-item')).toHaveLength(2);
	});

	test('should filter and show only completed items', () => {
		renderToDoListContainer('Completed');
		expect(screen.queryAllByTestId('list-item')).toHaveLength(0);
	});

	test('should filter and show only active items', () => {
		renderToDoListContainer('Active');
		expect(screen.queryAllByTestId('list-item')).toHaveLength(2);
	});

	test('should remove item by clicking on the Delete button', () => {
		renderToDoListContainer('');
		userEvent.click(screen.getAllByTestId('delete-button')[1]);

		expect(screen.getByTestId('footer-counter')).toHaveTextContent('1 items left');
		expect(screen.getAllByTestId('delete-button')).toHaveLength(1);
	});

	test('should add an active todo item to list by blur', () => {
		renderToDoListContainer('');
		userEvent.click(screen.getByTestId('delete-button'));
		userEvent.type(screen.getByTestId('input'), 'blur');
		userEvent.click(screen.getByTestId('footer'));

		expect(screen.getByTestId('input') as HTMLInputElement).toHaveValue('');
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('blur');
	});
});
