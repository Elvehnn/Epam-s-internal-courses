import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Input from '../Input/Input';
import List from '../List/List';
import './ToDoListContainer.scss';
import { Todo } from '../../Interfaces';

const ToDoListContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('all');
  const [shouldEditTodo, setShouldEditTodo] = useState(false);
  const [editId, setEditId] = useState<number>();
  const [selectAllButtonChecked, setSelectAllButtonChecked] = useState(false);

  const addTodo = (todo: string): void => {
    const newTodo = {
      id: todos.length,
      todo: todo,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (todo: Todo): void => {
    const newTodoList = [...todos];

    newTodoList.splice(todo.id, 1);
    newTodoList.forEach((item, index) => (item.id = index));

    setTodos(newTodoList);
  };

  const updateTodoList = (newTodoList: Todo[]): void => {
    const filteredTodoList: Todo[] = [];

    todos.forEach((item) => {
      if (!newTodoList.find((element) => element.todo === item.todo)) {
        item.id = filteredTodoList.length;
        filteredTodoList.push(item);
      }
    });

    setTodos(filteredTodoList);
    setSelectAllButtonChecked(false);
  };

  const changeTodoComplete = (id: number): void => {
    const list = [...todos];

    list[id].completed = !list[id].completed;
    setTodos(list);
  };

  const makeAllTodosCompleted = (eventTarget: { checked: any }): void => {
    const list = [...todos];
    const newList = list.map((item) => (item = { ...item, completed: eventTarget.checked }));

    setTodos([...newList]);
    setSelectAllButtonChecked(eventTarget.checked);
  };

  const allowEditTodo = (id?: number): void => {
    setShouldEditTodo(true);
    setEditId(id);
  };

  const preventEditTodo = (): void => {
    setShouldEditTodo(false);
    setEditId(undefined);
  };

  const editTodo = (id: number, value: string): void => {
    const list = [...todos];

    list[id].todo = value;
    setTodos(list);
  };

  const applyFilterToTodoList = (filterValue: string): Todo[] => {
    switch (filterValue) {
      case 'Completed':
        return todos.filter((item) => item.completed === true);
      case 'Active':
        return todos.filter((todo) => todo.completed === false);
      default:
        return todos;
    }
  };

  const filteredTodoList = applyFilterToTodoList(filterValue);

  return (
    <div className="todoList">
      <Header />
      <div className="content">
        <Input
          todoList={todos}
          onAddTodo={addTodo}
          makeAllTodosCompleted={makeAllTodosCompleted}
          selectAllButtonChecked={selectAllButtonChecked}
        />
        <List
          items={filteredTodoList}
          onRemoveTodo={removeTodo}
          changeTodoComplete={changeTodoComplete}
          allowEditTodo={allowEditTodo}
          shouldEditTodo={shouldEditTodo}
          editTodo={editTodo}
          preventEditTodo={preventEditTodo}
          editId={editId}
        />
        <Footer
          todoList={filteredTodoList}
          onUpdateTodoList={updateTodoList}
          onChangeFilter={setFilterValue}
        />
      </div>
    </div>
  );
};

export default ToDoListContainer;
