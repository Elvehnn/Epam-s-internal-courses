import EventEmitter from './EventEmitter';

export default class RenderGame extends EventEmitter {
	constructor(game) {
		super();
		this.game = game;
		this.hero = this.game.hero;
		this.gameField = document.querySelector('.game__field');
	}

	render() {
		this.gameField.append(this.hero.element);

		document.addEventListener('keydown', (event) =>
			this.handleKeyEvent(event.code),
		);

		this.generateZombieLine();
	}

	handleKeyEvent(eventCode) {
		switch (eventCode) {
			case 'ArrowLeft':
			case 'ArrowRight':
				this.hero.moving(eventCode);
				break;
			case 'ArrowUp':
				const bullet = this.hero.shooting();
				this.isZombieDead(bullet);
				break;
			default:
				return;
		}
	}

	isZombieDead = (bullet) => {
		let zombieToKill;

		this.zombieLinesArray.find((line) => {
			const indexToRemove = line.findIndex((item, index) => {
				if (item.offsetX === bullet.offsetX) {
					zombieToKill = item;
					console.log(line);
					return index;
				}
			});
			console.log(indexToRemove);

			if (indexToRemove >= 0) {
				line.splice(indexToRemove, 1);
				console.log(zombieToKill, line);
			}
		});

		if (zombieToKill) {
			const deadZombie = document.querySelector(`#${zombieToKill.element.id}`);

			deadZombie.classList.add('zombie_dead');
			setTimeout(() => deadZombie.remove(), 200);

			return;
		}

		console.log('miss!');
	};

	generateZombieLine() {
		setInterval(() => {
			this.game.createZombieLine();
		}, 2000);
	}
	// generateZombieLine() {
	// 	setTimeout(() => {
	// 		this.createZombieLine();
	// 	}, 2000);
	// 	setTimeout(() => {
	// 		this.createZombieLine();
	// 	}, 4000);
	// 	this.createZombieLine();
	// }

	gameOver = (timer) => {
		alert('Game over!');

		document.querySelectorAll('.zombieLine').forEach((item) => item.remove());

		clearInterval(timer);
		this.timeOutsIdArray.forEach((id) => clearTimeout(id));
	};
}
