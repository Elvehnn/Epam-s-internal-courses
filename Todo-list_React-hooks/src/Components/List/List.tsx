import { ListProps } from '../../Interfaces';
import ListItem from '../ListItem/ListItem';
import './List.scss';

const List = ({
  items,
  onRemoveTodo,
  changeTodoComplete,
  allowEditTodo,
  shouldEditTodo,
  editTodo,
  preventEditTodo,
  editId,
}: ListProps) => {
  const onEditTodo = (event: any) => {
    if (event.target.nodeName === 'LABEL' || event.target.nodeName === 'LI') {
      allowEditTodo(+event.target.id);
    }
  };

  const removeItem = (id: number) => {
    const itemToRemove = items.find((item: any, index: number) => index === id);

    if (itemToRemove) onRemoveTodo(itemToRemove);
  };

  return items ? (
    <ul className="todos" onDoubleClick={onEditTodo}>
      {items.map((item) => (
        <ListItem
          key={item.todo}
          value={item.todo}
          id={item.id}
          removeItem={removeItem}
          changeTodoComplete={changeTodoComplete}
          completed={item.completed}
          shouldEditTodo={shouldEditTodo}
          editTodo={editTodo}
          preventEditTodo={preventEditTodo}
          editId={editId}
        />
      ))}
    </ul>
  ) : (
    <ul className="todos" onDoubleClick={onEditTodo}></ul>
  );
};

export default List;
