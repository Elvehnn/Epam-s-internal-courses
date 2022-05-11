export default class Modal {
	constructor(score) {
		this.element = this.createModal(score);
	}

	createModal(score) {
		const modalElement = document.createElement('div');
		modalElement.classList.add('modal');
		modalElement.innerHTML = `<span class="modal__text"><span>Game Over!</span>
    <br>
    <span>Your Score: ${score}</span></span><button class="play-button"">PLAY AGAIN</button>`;

		return modalElement;
	}
}
