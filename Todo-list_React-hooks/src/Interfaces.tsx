export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}
export interface InputProps {
  todoList?: Todo[];
  onAddTodo: (todo: string) => void;
  makeAllTodosCompleted: (eventTarget: any) => void;
  selectAllButtonChecked: boolean;
}

export interface InputState {
  newToDoItem: string;
}

export interface TodoListContainerState {
  todos: Todo[];
  filterValue: string;
  shouldEditTodo: boolean;
  selectAllButtonChecked: boolean;
  editId?: number;
}

export interface ContainerProps {}

export interface ListProps {
  items: Todo[];
  onRemoveTodo: (todo: Todo) => void;
  changeTodoComplete: (id: number) => void;
  allowEditTodo: (id: number) => void;
  shouldEditTodo: boolean;
  editTodo: (id: number, value: string) => void;
  preventEditTodo: () => void;
  editId?: number;
}

export interface ListItemProps {
  key: string;
  value: string;
  id: number;
  removeItem: (id: number) => void;
  changeTodoComplete: (id: number) => void;
  completed: boolean;
  shouldEditTodo: boolean;
  editTodo: (id: number, value: string) => void;
  preventEditTodo: () => void;
  editId?: number;
}

export interface ListItemState {
  newToDoItem: string;
}

export interface FooterProps {
  todoList: Todo[];
  onUpdateTodoList: (newTodoList: Todo[]) => void;
  onChangeFilter: (filter: string) => void;
}

export interface FooterState {
  title: string;
  isActive: boolean;
}
