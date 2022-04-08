import React, { useState } from 'react';
import { ListItemProps } from '../../Interfaces';
import DeleteButton from '../Buttons/DeleteButton';
import './ListItem.scss';

const ListItem = ({
  value,
  id,
  removeItem,
  changeTodoComplete,
  completed,
  shouldEditTodo,
  editTodo,
  preventEditTodo,
  editId,
}: ListItemProps) => {
  const [newToDoItem, setToDoItem] = useState('');

  const changeView = (event: any): void => {
    const targetId = event.target.id;

    if (event.target.checked) {
      changeTodoComplete(targetId);

      return;
    }

    changeTodoComplete(targetId);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.trim() === '') return;

    setToDoItem(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>, id: number): void => {
    if (event.target.value.trim() === '') {
      preventEditTodo();

      return;
    }

    editTodo(+id, newToDoItem);
    preventEditTodo();
  };

  return (
    <li id={'li-' + id}>
      <div className="view">
        <input
          className="check"
          type="checkbox"
          onChange={(event) => changeView(event)}
          checked={completed}
          id={id.toString()}
        />
        <label id={id.toString()} className={completed ? 'completed' : ''}>
          {value}
        </label>

        <DeleteButton id={id} removeItem={removeItem} />
      </div>

      {shouldEditTodo && editId === +id && (
        <input
          className="edit"
          contentEditable="true"
          autoFocus={true}
          placeholder={value}
          onChange={(event) => handleChange(event)}
          onBlur={(event) => handleBlur(event, id)}
        />
      )}
    </li>
  );
};

export default ListItem;
