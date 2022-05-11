import { render, screen, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../Store/store';
import SelectAllItemButton from './SelectAllItemsButton';

describe('SelectAllItemButton', () => {
	const renderSelectAllItemButton = (): RenderResult =>
		render(
			<Provider store={store}>
				<SelectAllItemButton />
			</Provider>
		);

	test('render SelectAllItemButton', () => {
		renderSelectAllItemButton();
		expect(screen.getByTestId('select-all')).toBeInTheDocument();
	});

	test('change SelectAllItemButton checked', async () => {
		renderSelectAllItemButton();
		expect(screen.getByTestId('select-all')).not.toBeChecked();
	});
});
