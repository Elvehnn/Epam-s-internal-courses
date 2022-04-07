import css from './footer.module.css';
import HtmlElement from '../../HtmlElement/HtmlElement';

export class Footer {
	html = `
                <div class="container">
                        <div class="footer-tasks-info">
                                <div class="footer-tasks__status">Active tasks: &lt;N&gt;</div>
                                <div class="footer-tasks__status">Finished tasks: &lt;M&gt;</div>
                        </div>
                        <div class="owner">Kanban board by &lt;NAME&gt;, &lt;YEAR&gt;</div>
                </div>
        `;
	constructor() {
		this.element = new HtmlElement({
			type: 'footer',
			className: css.footer,
			html: this.html,
		}).element;
	}
}
