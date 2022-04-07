// import { Header } from './components/header/header.js';
// import { Footer } from './components/footer/footer.js';

import('./styles/main.css');
import { renderBoards } from './components/renderBoards.js';
import {
	saveToLocalStorage as save,
	loadFromLocalStorage as load,
} from './components/localstorage.js';

// const header = new Header();
// const footer = new Footer();
// document.body.appendChild(header.element);
// document.body.append(footer.element);

let boards;

if (load()) {
	boards = load();
}
boards = [
	{
		id: 0,
		title: 'Backlog',
		tasks: [
			{
				id: 0,
				name: 'Clean home',
			},
		],
	},
	{
		id: 1,
		title: 'Ready',
		tasks: [],
	},
	{
		id: 2,
		title: 'In Progress',
		tasks: [],
	},
	{
		id: 3,
		title: 'Finished',
		tasks: [],
	},
];

renderBoards();
