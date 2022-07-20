import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo, toggleTodo } from '../../Store/actions';
import DeleteButton from '../Buttons/DeleteButton';
import './ListItem.scss';

export interface ListItemProps {
	todo: string;
	id: number;
	completed?: boolean;
}

const ListItem = ({ id, todo, completed }: ListItemProps) => {
	const dispatch = useDispatch();

	const [editId, setEditId] = useState<number>();
	const [newToDoItem, setToDoItem] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (event.target.value.trim() === '') return;

		setToDoItem(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === 'Enter') {
			dispatch(editTodo({ id: id, todo: newToDoItem, completed: completed }));
			setEditId(-1);
		}
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>, id: number): void => {
		if (event.target.value.trim() === '') {
			setEditId(-1);

			return;
		}

		dispatch(editTodo({ id: id, todo: newToDoItem, completed: completed }));
		setEditId(-1);
	};

	return (
		<li id={'li-' + id} data-testid="list-item">
			<div className="view" data-testid="view-item">
				<input
					className="check"
					type="checkbox"
					onChange={(event) => dispatch(toggleTodo(+event.target.id))}
					checked={completed}
					id={id.toString()}
					data-testid="list-item-checkbox"
				/>
				<label
					id={id.toString()}
					data-testid="list-item-text"
					className={completed ? 'completed' : ''}
					onDoubleClick={() => setEditId(id)}
				>
					{todo}
				</label>

				<DeleteButton id={id} />
			</div>

			{editId === id && (
				<input
					className="edit"
					data-testid="edit-item"
					// contentEditable="true"
					autoFocus={true}
					placeholder={todo}
					onChange={(event) => handleChange(event)}
					onBlur={(event) => handleBlur(event, id)}
					onKeyDown={(event) => handleKeyDown(event)}
					value={newToDoItem}
				/>
			)}
		</li>
	);
};

export default ListItem;
