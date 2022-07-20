import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../Store/actions';

interface DeleteButtonProps {
	id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
	const dispatch = useDispatch();
	return (
		<i
			id={id.toString()}
			className="far fa-trash-alt delete"
			onClick={() => dispatch(deleteTodo(id))}
			data-testid="delete-button"
		></i>
	);
};

export default DeleteButton;
