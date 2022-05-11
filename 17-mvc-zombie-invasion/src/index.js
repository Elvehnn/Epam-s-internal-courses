import './styles/main.scss';
import Model from './modules/Model';
import View from './modules/View';
import Controller from './modules/Controller';

window.addEventListener('load', () => {
	const model = new Model();
	const view = new View(model);
	const controller = new Controller(model, view);

	view.render();
});
