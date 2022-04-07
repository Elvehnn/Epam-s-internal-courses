import EventEmitter from './EventEmitter';
import Hero from './components/Hero';
import Zombie from './components/Zombie';
import Bullet from './components/Bullet';

export default class Game extends EventEmitter {
	constructor() {
		super();
		this.gameField = document.querySelector('.game__field');
		this.hero = new Hero();
		this.heroElement = this.hero.element;
		this.timeOutsIdArray = [];
		this.zombieLinesArray = [];
		this.bulletsArray = [];
	}

	createZombieLine = () => {
		const zombieNumberInLine = Math.floor(Math.random() * 5 + 1);
		const lineNumber = this.zombieLinesArray.length;
		const zombieLine = [];
		const zombieOffsets = [];

		const zombieLineElement = document.createElement('div');
		zombieLineElement.classList.add('zombieLine');

		for (let i = 0; i < zombieNumberInLine; i++) {
			const zombie = new Zombie();
			let offsetX = Math.floor(Math.random() * 7) * 50;

			while (zombieOffsets.includes(offsetX)) {
				offsetX = Math.floor(Math.random() * 7) * 50;
			}
			zombieOffsets.push(offsetX);

			zombie.offsetX = offsetX;
			zombie.element.id = `z_${lineNumber}_${i + 1}`;
			zombie.element.style.left = `${zombie.offsetX}px`;

			zombieLine.push(zombie);
			zombieLineElement.innerHTML += zombie.element.outerHTML;
		}

		this.gameField.prepend(zombieLineElement);
		this.zombieLinesArray.push(zombieLine);

		this.timeOutsIdArray.push(
			setTimeout(() => {
				if (zombieLine.find((item) => item.offsetX === this.hero.offsetX)) {
					this.gameOver(this.generateZombieLine);
				}

				this.zombieLinesArray.splice(lineNumber, 1);
				zombieLineElement.remove();
			}, 15000),
		);

		return zombieLine;
	};
}
