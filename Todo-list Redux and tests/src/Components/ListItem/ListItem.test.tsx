import { render, screen, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import ListItem, { ListItemProps } from './ListItem';
import configureStore from 'redux-mock-store';

describe('ListItem', () => {
	const mockStore = configureStore();
	const initialState = {};
	const store = mockStore(initialState);

	const renderListItem = ({ id, todo, completed }: ListItemProps): RenderResult =>
		render(
			<Provider store={store}>
				<ListItem id={id} todo={todo} completed={completed} />
			</Provider>
		);

	test('render one ListItem', () => {
		renderListItem({ id: 0, todo: 'Learn React', completed: false });

		expect(screen.getByTestId('list-item')).toBeInTheDocument();
		expect(screen.getByTestId('list-item-checkbox')).toBeInTheDocument();
		expect(screen.getByTestId('list-item-text')).toBeInTheDocument();
		expect(screen.getByTestId('delete-button')).toBeInTheDocument();
	});

	test('render active ListItem with right text', () => {
		renderListItem({ id: 0, todo: 'Learn React', completed: false });

		expect(screen.getByTestId('list-item-checkbox')).not.toBeChecked();
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('Learn React');
	});

	test('render completed ListItem with right text', () => {
		renderListItem({ id: 0, todo: 'Learn React', completed: true });

		expect(screen.getByTestId('list-item-checkbox')).toBeChecked();
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('Learn React');
	});
});
