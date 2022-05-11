import EventEmitter from './EventEmitter';
import Modal from './components/Modal';
import { FIELD_HEIGHT } from './constants';

export default class View extends EventEmitter {
	constructor(model) {
		super();
		this.model = model;
		this.hero = this.model.hero;
		this.wrapper = document.querySelector('.wrapper');
		this.gameField = document.querySelector('.game__field');
		this.score = document.querySelector('#score');
		this.level = document.querySelector('.board__level');

		document.addEventListener('keydown', (event) => this.emit('keyEvent', event));
	}

	render() {
		if (this.model.isGameOver) {
			this.gameOver();

			return;
		}

		this.gameField.innerHTML = '';
		this.gameField.append(this.hero.element);
		this.generateZombieLines().forEach((item) => this.gameField.prepend(item));
		this.score.innerHTML = this.model.score;
		this.level.innerHTML = `Level ${this.model.level}`;
	}

	generateZombieLines() {
		const zombiesArray = [];
		const filteredLinesArray = this.model.zombieLinesArray.filter(
			(line) => line.topOffset <= FIELD_HEIGHT,
		);

		filteredLinesArray.forEach((line) => {
			if (
				line.topOffset === FIELD_HEIGHT &&
				line.array.find((item) => item.offsetX === this.hero.offsetX)
			) {
				this.model.isGameOver = true;
			}

			const zombieLineElement = document.createElement('div');

			zombieLineElement.classList.add('zombieLine');
			zombieLineElement.style.top = line.topOffset + 'px';

			line.array.forEach((zombie) => (zombieLineElement.innerHTML += zombie.element.outerHTML));
			zombiesArray.push(zombieLineElement);
		});

		return zombiesArray;
	}

	gameOver() {
		const modal = new Modal(this.model.score);
		this.wrapper.prepend(modal.element);
		document
			.querySelector('.play-button')
			.addEventListener('click', (event) => this.emit('playAgain', event));

		document.querySelectorAll('.zombieLine').forEach((item) => item.remove());
		clearInterval(this.model.intervalId);
	}
}
