	import {
		button
	}
	from '@cycle/dom';
	import {
		Observable
	}
	from 'rx';

	function Button({
		DOM, props$
	}) {
		let action$ = props$.map(props => props.action).first();
		let click$ = DOM.select('.countButton').events('click');
		let model$ = Observable.combineLatest(click$, action$, (click, action) => action);
		let view$ = Observable.combineLatest(props$, (props) =>
			button('.countButton', {
				className: 'btn btn-primary'
			}, props.label));
		return {
			DOM: view$,
			model$: model$
		};
	}

	export default Button;
