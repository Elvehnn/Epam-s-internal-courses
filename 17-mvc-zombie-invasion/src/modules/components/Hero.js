import { FIELD_HEIGHT } from '../constants';
export default class Hero {
	constructor() {
		this.element = this.createHero();
		this.offsetX = 150;
		this.offsetY = FIELD_HEIGHT;
	}

	createHero() {
		const heroElement = document.createElement('div');
		heroElement.classList.add('game__hero');

		return heroElement;
	}

	moving(eventCode) {
		const field = document.querySelector('.game__field');
		const fieldCoordinates = field.getBoundingClientRect();
		const heroCoordinates = this.element.getBoundingClientRect();
		let offsetX;

		if (eventCode === 'ArrowLeft') {
			offsetX = heroCoordinates.left - fieldCoordinates.left - 50;

			if (fieldCoordinates.left < heroCoordinates.left) {
				this.element.style.left = offsetX + 'px';
				this.offsetX -= 50;
			}

			return;
		}

		offsetX = heroCoordinates.left - fieldCoordinates.left + 50;

		if (fieldCoordinates.left + 350 > heroCoordinates.left + 50) {
			this.element.style.left = offsetX + 'px';
			this.offsetX += 50;
		}
	}

	shooting() {
		return this.offsetX;
	}
}
