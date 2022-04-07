export default class HtmlElement {
	element = null;

	constructor({ type = 'div', className = '', html = '', id = '' } = {}) {
		this.element = document.createElement(type);
		this.element.innerHTML = html;
		this.element.id = id;
		className.split(' ').forEach(this.addClass.bind(this));
	}

	addClass(className) {
		if (className) this.element.classList.add(className);
	}

	removeClass(className) {
		this.element.classList.remove(className);
	}

	removeElement() {
		this.element.remove();
	}
}
