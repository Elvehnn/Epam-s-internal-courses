import React from "react";

function DeleteButton(props) {
	return (
		<i
			id={props.id}
			className="far fa-trash-alt delete"
			onClick={() => props.removeItem(props.id)}
		></i>
	);
}

export default DeleteButton;
