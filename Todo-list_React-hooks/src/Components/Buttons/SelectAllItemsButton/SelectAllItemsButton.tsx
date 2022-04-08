import './SelectAllItemButton.scss';

interface SelectAllItemButtonProps {
  makeAllTodosCompleted: (eventTarget: { checked: any }) => void;
  selectAllButtonChecked: boolean;
}

const SelectAllItemButton = ({
  makeAllTodosCompleted,
  selectAllButtonChecked,
}: SelectAllItemButtonProps) => (
  <input
    className="input-buttons"
    type="checkbox"
    checked={selectAllButtonChecked}
    onChange={(event) => makeAllTodosCompleted(event.target)}
  ></input>
);

export default SelectAllItemButton;
