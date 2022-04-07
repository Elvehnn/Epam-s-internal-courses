import { Board } from './Board/Board.js';
import {
	saveToLocalStorage as save,
	loadFromLocalStorage as load,
} from './localstorage.js';

export function renderBoards() {
	let boards = load();

	let container = document.querySelector('.container');
	container.innerHTML = '';

	boards.forEach((element, index) => {
		let newBoard = new Board({ boardId: element.id, name: element.title });
		container.appendChild(newBoard.element);
	});

	let addButtons = document.querySelectorAll('.add-task-button');
	boards.forEach((element, index) => {
		if (index < boards.length - 1) {
			if (element.tasks.length) {
				addButtons[index + 1].disabled = false;
				return;
			}
			addButtons[index + 1].disabled = true;
		}
	});
}
