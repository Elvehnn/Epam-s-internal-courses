import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FILTER_OPTIONS, clearCompletedTodos, selectAllButtonChecked } from '../../Store/actions';
import { useAppSelector } from '../../Store/hooks';
import './Footer.scss';

const Footer = (props: { filter: string }) => {
	const dispatch = useDispatch();

	const completedTodosList = useAppSelector((state) => state.todos).filter(
		(item) => item.completed === !true
	);

	const filter = props.filter;

	const clearCompleted = () => {
		dispatch(clearCompletedTodos());
		dispatch(selectAllButtonChecked(false));
	};

	return (
		<div className="footer" data-testid="footer">
			<span className="footer__todo-counter" data-testid="footer-counter">
				{completedTodosList.length} items left
			</span>

			<ul className="filters">
				{Object.entries(FILTER_OPTIONS).map((item, index) => (
					<li
						key={index}
						className={item[1] === filter ? 'active' : ''}
						data-testid={`filter-${item[1]}`}
					>
						<Link to={item[1] === 'SHOW_ALL' ? '/' : `/${item[1]}`}>
							{!item[1] ? 'All' : item[1]}
						</Link>
					</li>
				))}
			</ul>

			<button className="footer__clear-button" onClick={clearCompleted} data-testid="clear-button">
				Clear completed
			</button>
		</div>
	);
};

export default Footer;
