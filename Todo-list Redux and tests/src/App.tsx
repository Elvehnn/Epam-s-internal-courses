import './Styles/App.scss';
import ToDoListContainer from './Components/ToDoListContainer/ToDoListContainer';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from './Store/hooks';

const App = () => {
	const filter = useLocation().pathname.slice(1);
	const todos = useAppSelector((state) => state.todos);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="app" data-testid="app">
			<Routes>
				<Route path="/" element={<ToDoListContainer filter={filter} />} />
				<Route path="/Completed" element={<ToDoListContainer filter={filter} />} />
				<Route path="/Active" element={<ToDoListContainer filter={filter} />} />
			</Routes>
		</div>
	);
};

export default App;
