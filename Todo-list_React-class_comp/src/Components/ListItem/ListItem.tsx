import React from "react";
import { ListItemProps, ListItemState } from "../../Interfaces";
import DeleteButton from "../Buttons/DeleteButton";
import "./ListItem.scss";

class ListItem extends React.Component<ListItemProps, ListItemState> {
	constructor(props: ListItemProps) {
		super(props);
		// this.newToDoItem = "";
		this.state = { newToDoItem: "" };
	}

	changeView = (event: any) => {
		const targetId = event.target.id;

		if (event.target.checked) {
			this.props.changeTodoComplete(targetId);

			return;
		}

		this.props.changeTodoComplete(targetId);
	};

	handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.trim() === "") return;

		this.setState({ newToDoItem: event.target.value });
	}

	handleBlur(event: React.FocusEvent<HTMLInputElement, Element>, id: number) {
		if (event.target.value.trim() === "") {
			this.props.preventEditTodo();

			return;
		}

		this.props.editTodo(+id, this.state.newToDoItem);
		this.props.preventEditTodo();
	}

	render() {
		return (
			<li id={"li-" + this.props.id}>
				<div className="view">
					<input
						className="check"
						type="checkbox"
						onChange={(event) => this.changeView(event)}
						checked={this.props.completed}
						id={this.props.id.toString()}
					/>
					<label
						id={this.props.id.toString()}
						className={this.props.completed ? "completed" : ""}
					>
						{this.props.value}
					</label>

					<DeleteButton id={this.props.id} removeItem={this.props.removeItem} />
				</div>

				{this.props.shouldEditTodo && this.props.editId === +this.props.id && (
					<input
						className="edit"
						contentEditable="true"
						autoFocus={true}
						placeholder={this.props.value}
						onChange={(event) => this.handleChange(event)}
						onBlur={(event) => this.handleBlur(event, this.props.id)}
					/>
				)}
			</li>
		);
	}
}

export default ListItem;
