import { Todo } from '../../Interfaces';
import { FILTER_OPTIONS } from '../../Store/actions';
import { useAppSelector } from '../../Store/hooks';
import ListItem from '../ListItem/ListItem';
import './List.scss';

export interface ListProps {
	filter: string;
}

const getFilteredTodos = (todos: Todo[], filter: string) => {
	switch (filter) {
		case FILTER_OPTIONS.SHOW_ALL:
			return todos;

		case FILTER_OPTIONS.SHOW_COMPLETED:
			return todos.filter((item) => item.completed);

		case FILTER_OPTIONS.SHOW_ACTIVE:
			return todos.filter((item) => !item.completed);

		default:
			throw new Error('Unknown filter: ' + filter);
	}
};

const List = ({ filter }: ListProps) => {
	const todos = useAppSelector((state) => state.todos);
	const filteredTodos = getFilteredTodos(todos, filter);

	return filteredTodos ? (
		<ul className="todos">
			{filteredTodos.map((item) => (
				<ListItem
					key={item.todo}
					{...item}
					// changeTodoComplete={toggleTodo}
					// removeItem={deleteTodo}
				/>
			))}
		</ul>
	) : (
		<ul className="todos"></ul>
	);
};

export default List;
