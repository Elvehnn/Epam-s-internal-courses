export default class Bullet {
	constructor(hero) {
		this.offsetX = hero.offsetX;
		this.offsetY = hero.offsetY;
	}

	createBulletElement() {
		const bulletElement = document.createElement('div');

		bulletElement.classList.add('bullet');
		bulletElement.style.left = 8 + 'px';
		bulletElement.style.top = -20 + 'px';

		return bulletElement;
	}
}
