import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo, toggleTodo } from '../../Store/actions';
import DeleteButton from '../Buttons/DeleteButton';
import './ListItem.scss';

export interface ListItemProps {
	todo: string;
	id: number;
	completed?: boolean;
}

const handleKeyDown = (event: React.KeyboardEvent): void => {
	if (event.key === 'Enter') {
		(event.target as HTMLInputElement).blur();
	}
};

const ListItem = ({ id, todo, completed }: ListItemProps) => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const handleBlur = (
		event: React.FocusEvent<HTMLInputElement, Element>
	): void => {
		if (event.target.value.trim() === '' || event.target.value === todo) {
			setIsEdit(false);

			return;
		}

		dispatch(
			editTodo({
				id: id,
				todo: event.target.value,
				completed,
			})
		);
		setIsEdit(false);
	};

	return (
		<li id={'li-' + id} data-testid='list-item'>
			<div className='view' data-testid='view-item'>
				<input
					className='check'
					type='checkbox'
					onChange={() => dispatch(toggleTodo(id))}
					checked={completed}
					id={id.toString()}
					data-testid='list-item-checkbox'
				/>
				<label
					id={id.toString()}
					data-testid='list-item-text'
					className={completed ? `completed` : ''}
					onDoubleClick={() => setIsEdit(true)}
				>
					{todo}
				</label>

				<DeleteButton id={id} />
			</div>

			{isEdit && (
				<input
					className='edit'
					data-testid='edit-item'
					autoFocus={true}
					defaultValue={todo}
					onBlur={(event) => handleBlur(event)}
					onKeyDown={(event) => handleKeyDown(event)}
				/>
			)}
		</li>
	);
};

export default memo(ListItem);
