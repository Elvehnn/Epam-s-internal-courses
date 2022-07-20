import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Input from '../Input/Input';
import './ToDoListContainer.scss';
import List from '../List/List';

const ToDoListContainer = (props: { filter: string }) => {
	return (
		<div className="todoList" data-testid="todoList">
			<Header />
			<div className="content" data-testid="content">
				<Input />
				<List filter={props.filter} />
				<Footer filter={props.filter} />
			</div>
		</div>
	);
};

export default ToDoListContainer;
