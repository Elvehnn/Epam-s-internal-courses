import { useDispatch } from 'react-redux';
import { selectAllButtonChecked, toggleAllTodo } from '../../../Store/actions';
import { useAppSelector } from '../../../Store/hooks';
import './SelectAllItemButton.scss';

const SelectAllItemButton = () => {
	const dispatch = useDispatch();
	const isChecked = useAppSelector((state) => state.allButtonChecked);
	const isListEmpty = useAppSelector((state) => state.todos).length === 0;

	return (
		<input
			className="input-buttons"
			type="checkbox"
			checked={isChecked}
			disabled={isListEmpty}
			onChange={() => {
				dispatch(selectAllButtonChecked(!isChecked));
				dispatch(toggleAllTodo(!isChecked));
			}}
			data-testid="select-all"
		></input>
	);
};

export default SelectAllItemButton;
