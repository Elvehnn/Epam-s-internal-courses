import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './Store/store';
import App from './App';
import { fakeLocalStorage } from './fakeLocalStorage';
import userEvent from '@testing-library/user-event';

describe('App', () => {
	const renderApp = (): RenderResult =>
		render(
			<Provider store={store}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>
		);

	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: fakeLocalStorage,
		});
	});

	test('render App', () => {
		renderApp();
		expect(screen.getByTestId('app')).toBeInTheDocument();
	});

	test('save todos to local storage', () => {
		renderApp();

		expect(screen.queryByTestId('list-item-text')).toBeNull();
		userEvent.type(screen.getByTestId('input'), 'Learn Redux');
		fireEvent.submit(screen.getByTestId('submit'));
		expect(screen.getByTestId('list-item-text')).toHaveTextContent('Learn Redux');

		const json = window.localStorage.getItem('todos');
		const savedTodos = json ? JSON.parse(json) : [];
		expect(savedTodos[0]).toEqual({ id: 0, todo: 'Learn Redux', completed: false });
	});
});
