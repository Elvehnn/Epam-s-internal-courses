export function saveToLocalStorage(data) {
	let serialBoards = JSON.stringify(data);
	localStorage.setItem('ToDo', serialBoards);
}

export function loadFromLocalStorage() {
	let returnBoards = JSON.parse(localStorage.getItem('ToDo'));
	return returnBoards;
}
