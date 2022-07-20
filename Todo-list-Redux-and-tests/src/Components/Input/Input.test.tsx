import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../Store/store';
import Input from './Input';

describe('Input', () => {
	const renderInput = (): RenderResult =>
		render(
			<Provider store={store}>
				<Input />
			</Provider>
		);

	test('render Input', () => {
		renderInput();

		expect(screen.getByTestId('form')).toBeInTheDocument();
		expect(screen.getByTestId('select-all')).toBeInTheDocument();
		expect(screen.getByTestId('input')).toBeInTheDocument();
		expect(screen.getByTestId('submit')).toBeInTheDocument();
		expect(screen.getByPlaceholderText(`Add item...`)).toBeInTheDocument();
	});

	test('change Input value', () => {
		renderInput();
		const input: HTMLInputElement = screen.getByTestId('input');
		userEvent.type(input, 'Write tests');

		expect(input.value).toBe('Write tests');
	});

	test('handle submit', () => {
		renderInput();
		const input: HTMLInputElement = screen.getByTestId('input');
		userEvent.type(input, 'test');
		const isPrevented = fireEvent.submit(screen.getByTestId('submit'));

		expect(input.value).toBe('');
		expect(isPrevented).toBe(false);
	});
});
