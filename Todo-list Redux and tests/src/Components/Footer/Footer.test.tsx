import { render, screen, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../Store/store';
import Footer from './Footer';

describe('Footer', () => {
	const renderFooter = (filter: string): RenderResult =>
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Footer filter={filter} />
				</MemoryRouter>
			</Provider>
		);

	test('render Footer', () => {
		renderFooter('');

		expect(screen.getByTestId('footer')).toBeInTheDocument();
		expect(screen.getByTestId('footer-counter')).toBeInTheDocument();
		expect(screen.getByTestId('clear-button')).toBeInTheDocument();
		expect(screen.getByTestId('filter-Active')).toBeInTheDocument();
		expect(screen.getByTestId('filter-Completed')).toBeInTheDocument();
		expect(screen.getByTestId('filter-')).toBeInTheDocument();
	});
});
