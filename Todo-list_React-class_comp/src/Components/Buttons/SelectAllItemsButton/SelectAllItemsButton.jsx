import React from "react";
import "./SelectAllItemButton.scss";

class SelectAllItemButton extends React.Component {
	render() {
		return (
			<input
				className="input-buttons"
				type="checkbox"
				checked={this.props.selectAllButtonChecked}
				onChange={(event) => this.props.makeAllTodosCompleted(event.target)}
			></input>
		);
	}
}

export default SelectAllItemButton;
