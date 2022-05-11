import piu from './components/Sound.js';
import { INITIAL_VELOCITY } from '../modules/constants';
export default class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		view.on('keyEvent', (event) => this.handleKeyEvent(event.code));
		view.on('playAgain', () => this.playAgain());

		this.startGame();
	}

	startGame() {
		this.model.intervalId = setInterval(() => {
			this.moveDownZombieLine();
			this.model.createZombieLine();
			this.view.render();
		}, this.model.velocity);
	}

	playAgain() {
		this.model.timeOutsIdArray = [];
		this.model.zombieLinesArray = [];
		this.model.intervalId;
		this.model.score = 0;
		this.model.level = 1;
		this.model.isGameOver = false;
		this.model.velocity = INITIAL_VELOCITY;
		document.querySelector('.modal').remove();
		this.startGame();
	}

	handleKeyEvent(eventCode) {
		switch (eventCode) {
			case 'ArrowLeft':
			case 'ArrowRight':
				this.model.hero.moving(eventCode);
				break;

			case 'ArrowUp': {
				const bulletOffsetX = this.model.hero.shooting();

				piu();

				if (this.isZombieDead(bulletOffsetX)) {
					this.model.score++;
					const newLevel = Math.trunc(this.model.score / 100) + 1;
					this.model.level = newLevel > this.model.level ? newLevel : this.model.level;
					this.model.velocity = newLevel > this.model.level && this.model.velocity * 0.9;
				} else {
					this.moveDownZombieLine();
					this.view.render();
				}
				break;
			}

			default:
				return;
		}
	}

	moveDownZombieLine() {
		this.model.zombieLinesArray.forEach((line) => {
			line.topOffset += 50;
		});
	}

	isZombieDead(bulletOffsetX) {
		let isDead = false;

		for (let i = 0; i < this.model.zombieLinesArray.length; i++) {
			const indexToRemove = this.model.zombieLinesArray[i].array.findIndex(
				(item) => item.offsetX === bulletOffsetX,
			);

			if (indexToRemove >= 0) {
				this.model.zombieLinesArray[i].array[indexToRemove].element.classList.add('zombie_dead');
				this.view.render();
				this.model.zombieLinesArray[i].array.splice(indexToRemove, 1);
				setTimeout(() => this.view.render(), 100);
				isDead = true;

				break;
			}
		}

		return isDead;
	}
}
