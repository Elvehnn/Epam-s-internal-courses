import HtmlElement from '../HtmlElement/HtmlElement';
import { renderBoards } from '../renderBoards.js';
import {
	saveToLocalStorage as save,
	loadFromLocalStorage as load,
} from '../localstorage.js';
export class Board {
	id = null;
	element = null;
	addButton = null;
	input = null;
	dropDownTasks = null;

	constructor({ boardId, name }) {
		this.id = boardId;
		this.name = name;
		this.data = load();
		this.element = new HtmlElement({
			className: 'board',
			html: `
                <div class="board__header">
                    <h2 class="board__title">${this.name}</h2>
                    <div class="popup__button">
                        <div class="popup__button_dot"></div>
                    </div>
                </div>
                <ul class="task-list" data-task-list-id='${this.id}'>
                </ul>
                <button class='add-task-button' data-button-id='${this.id}'>+ Add card</button>
            `,
			id: boardId,
		}).element;

		this.getBoardTasks();

		this.addButton = this.element.querySelector(
			'button[class=add-task-button]'
		);

		this.addButton.addEventListener('click', () => {
			if (this.id === 0) {
				let taskInput = this.createInputForm();
				this.element
					.querySelector(`ul[data-task-list-id='${this.id}']`)
					.appendChild(taskInput);
				taskInput.focus();
			} else {
				let taskList = this.element.querySelector('.task-list');
				taskList.appendChild(this.dropDownTasks());
				this.addButton.classList.add('add-task-button-hidden');
			}
		});
	}

	getBoardTasks = () => {
		this.data = load();
		let tasks = this.data[this.id].tasks;
		this.renderTaskList(tasks);
	};

	renderTaskList = (tasks) => {
		let taskList = '';
		tasks.forEach((item) => {
			taskList += `<li class="list__item">${item.name}</li>`;
		});
		this.element.querySelector(
			`ul[data-task-list-id='${this.id}'`
		).innerHTML = taskList;
	};

	createInputForm = () => {
		let taskInput = new HtmlElement({
			type: 'input',
			className: 'task-input',
			id: 'task-input',
		}).element;
		taskInput.type = 'text';
		taskInput.placeholder = 'Type task name';
		taskInput.autocomplete = 'off';
		taskInput.addEventListener('blur', this.addTask);
		return taskInput;
	};

	addTask = () => {
		this.input = this.element.querySelector('input[id=task-input]');
		if (this.input.value) {
			this.data[this.id].tasks.push({
				id: this.data[this.id].tasks.length,
				name: this.input.value,
			});
			save(this.data);
			renderBoards();
			this.input.value = '';
		}
		this.input.remove();
	};

	dropDownTasks = () => {
		let listItem = document.createElement('li');

		let dropDownTasks = new HtmlElement({
			type: 'ul',
			className: 'dropdown-tasks',
		}).element;

		let dropDownTasksItem = `<li class="dropdown-tasks__item">
        Выберите задачу из списка</li>`;
		this.data = load();
		this.data[this.id - 1].tasks.forEach((item) => {
			dropDownTasksItem += `<li class="dropdown-tasks__item">${item.name}
            <input class="checkbox" type="checkbox"></li>`;
		});

		dropDownTasks.innerHTML = dropDownTasksItem;

		listItem.appendChild(dropDownTasks);

		let submit = this.createSubmitButton();
		listItem.appendChild(submit);
		this.dropDownTasks = listItem;

		return this.dropDownTasks;
	};

	createSubmitButton = () => {
		let submitButton = new HtmlElement({
			type: 'button',
			className: 'submit',
			html: 'Add',
		}).element;
		submitButton.addEventListener('click', this.moveTasks);
		return submitButton;
	};

	moveTasks = () => {
		let checkbox = document.querySelectorAll('.checkbox');
		console.log(checkbox);
		checkbox.forEach((element) => {
			if (element.checked) {
				let taskToMove = this.data[this.id - 1].tasks.find(
					(item) => item.name === element.parentNode.innerText
				);
				this.data[this.id - 1].tasks = this.data[
					this.id - 1
				].tasks.filter((item) => item.name !== taskToMove.name);
				this.data[this.id].tasks.push(taskToMove);
			}
		});
		save(this.data);
		renderBoards();
		this.dropDownTasks.remove();
		this.addButton.classList.remove('add-task-button-hidden');
	};
}
