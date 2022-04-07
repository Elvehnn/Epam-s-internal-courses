import './styles/main.scss';
import Game from './modules/Game';
import RenderGame from './modules/RenderGame';

window.addEventListener('load', () => {
	const model = new Game();
	const view = new RenderGame(model);
	// const controller = new GameController(model, view);

	view.render();
});
