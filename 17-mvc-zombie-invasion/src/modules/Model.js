import EventEmitter from './EventEmitter';
import Hero from './components/Hero';
import Zombie from './components/Zombie';
import { INITIAL_VELOCITY } from '../modules/constants';

export default class Model extends EventEmitter {
	constructor() {
		super();
		this.hero = new Hero();
		this.heroElement = this.hero.element;
		this.timeOutsIdArray = [];
		this.zombieLinesArray = [];
		this.bulletsArray = [];
		this.intervalId;
		this.score = 0;
		this.level = 1;
		this.isGameOver = false;
		this.velocity = INITIAL_VELOCITY;
	}

	createZombieLine() {
		const zombieNumberInLine = Math.floor(Math.random() * 5 + 1);
		const zombieLine = {
			topOffset: 0,
			array: [],
		};
		const zombieOffsets = [];

		for (let i = 0; i < zombieNumberInLine; i++) {
			const zombie = new Zombie();
			let offsetX = Math.floor(Math.random() * 7) * 50;

			while (zombieOffsets.includes(offsetX)) {
				offsetX = Math.floor(Math.random() * 7) * 50;
			}
			zombieOffsets.push(offsetX);

			zombie.offsetX = offsetX;
			zombie.element.id = `z_${i + 1}`;
			zombie.element.style.left = `${zombie.offsetX}px`;

			zombieLine.array.push(zombie);
		}

		this.zombieLinesArray.push(zombieLine);

		return zombieLine;
	}
}
