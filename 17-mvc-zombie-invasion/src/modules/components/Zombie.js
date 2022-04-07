export default class Zombie {
	constructor() {
		this.element = this.createZombieElement();
	}

	createZombieElement() {
		const zombieElement = document.createElement('div');
		zombieElement.classList.add('zombie');

		return zombieElement;
	}
}
