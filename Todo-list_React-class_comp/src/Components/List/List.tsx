import React from "react";
import { ListProps } from "../../Interfaces";
import ListItem from "../ListItem/ListItem";
import "./List.scss";

class List extends React.Component<ListProps> {
	editTodo = (event: any) => {
		if (event.target.nodeName === "LABEL" || event.target.nodeName === "LI") {
			this.props.allowEditTodo(+event.target.id);
		}
	};

	removeItem = (id: number) => {
		const itemToRemove = this.props.items.find(
			(item: any, index: number) => index === id
		);

		if (itemToRemove) this.props.onRemoveTodo(itemToRemove);
	};

	render() {
		const items = this.props.items;

		return items ? (
			<ul className="todos" onDoubleClick={this.editTodo}>
				{items.map((item) => (
					<ListItem
						key={item.todo}
						value={item.todo}
						id={item.id}
						removeItem={this.removeItem}
						changeTodoComplete={this.props.changeTodoComplete}
						completed={item.completed}
						shouldEditTodo={this.props.shouldEditTodo}
						editTodo={this.props.editTodo}
						preventEditTodo={this.props.preventEditTodo}
						editId={this.props.editId}
					/>
				))}
			</ul>
		) : (
			<ul className="todos" onDoubleClick={this.editTodo}></ul>
		);
	}
}

export default List;
