import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Input from '../Input/Input';
import List from '../List/List';
import './ToDoListContainer.scss';
import { ContainerProps, Todo, TodoListContainerState } from '../../Interfaces';

class ToDoListContainer extends React.Component<{}, TodoListContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    this.state = {
      todos: [],
      filterValue: 'all',
      shouldEditTodo: false,
      editId: undefined,
      selectAllButtonChecked: false,
    };
  }

  addTodo = (todo: string): void => {
    const newTodo = {
      id: this.state.todos.length,
      todo: todo,
      completed: false,
    };
    const newTodoList = [...this.state.todos, newTodo];

    this.setState({ todos: newTodoList });
  };

  removeTodo = (todo: Todo): void => {
    const newTodoList = [...this.state.todos];

    newTodoList.splice(todo.id, 1);
    newTodoList.forEach((item, index) => (item.id = index));

    this.setState({ todos: newTodoList });
  };

  updateTodoList = (newTodoList: Todo[]) => {
    const filteredTodoList: Todo[] = [];

    this.state.todos.forEach((item) => {
      if (!newTodoList.find((element) => element.todo === item.todo)) {
        item.id = filteredTodoList.length;
        filteredTodoList.push(item);
      }
    });

    this.setState({ todos: filteredTodoList, selectAllButtonChecked: false });
  };

  changeFilterValue = (newFilterValue: string) => {
    this.setState({ filterValue: newFilterValue });
  };

  changeTodoComplete = (id: number) => {
    const list = [...this.state.todos];

    list[id].completed = !list[id].completed;
    this.setState({ todos: [...list] });
  };

  makeAllTodosCompleted = (eventTarget: { checked: any }) => {
    const list = [...this.state.todos];

    const newList = list.map((item) => (item = { ...item, completed: eventTarget.checked }));

    this.setState({
      todos: [...newList],
      selectAllButtonChecked: eventTarget.checked,
    });
  };

  allowEditTodo = (id: number) => {
    this.setState({ shouldEditTodo: true, editId: id });
  };

  preventEditTodo = () => {
    this.setState({ shouldEditTodo: false, editId: undefined });
  };

  editTodo = (id: number, value: string) => {
    const list = [...this.state.todos];

    list[id].todo = value;
    this.setState({ todos: [...list] });
  };

  applyFilterToTodoList = (filterValue: string) => {
    switch (filterValue) {
      case 'Completed':
        return this.state.todos.filter((item) => item.completed === true);
      case 'Active':
        return this.state.todos.filter((todo) => todo.completed === false);
      default:
        return this.state.todos;
    }
  };

  render() {
    const filteredTodoList = this.applyFilterToTodoList(this.state.filterValue);

    return (
      <div className="todoList">
        <Header />
        <div className="content">
          <Input
            todoList={this.state.todos}
            onAddTodo={this.addTodo}
            makeAllTodosCompleted={this.makeAllTodosCompleted}
            selectAllButtonChecked={this.state.selectAllButtonChecked}
          />
          <List
            items={filteredTodoList}
            onRemoveTodo={this.removeTodo}
            changeTodoComplete={this.changeTodoComplete}
            allowEditTodo={this.allowEditTodo}
            shouldEditTodo={this.state.shouldEditTodo}
            editTodo={this.editTodo}
            preventEditTodo={this.preventEditTodo}
            editId={this.state.editId}
          />
          <Footer
            todoList={filteredTodoList}
            onUpdateTodoList={this.updateTodoList}
            onChangeFilter={this.changeFilterValue}
          />
        </div>
      </div>
    );
  }
}

export default ToDoListContainer;
