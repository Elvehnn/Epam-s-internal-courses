export interface Todo {
	id: number;
	todo: string;
	completed?: boolean;
}

export interface FooterProps {
	todoList: Todo[];
	filterValue: string;
	onUpdateTodoList: (newTodoList: Todo[]) => void;
	onChangeFilter: (filter: string) => void;
}

export type Action = {
	type: string;
	text?: string;
	index?: number;
	filter?: string;
	completedTodos?: Todo[];
	isChecked?: boolean;
	newTodo?: Todo;
};
