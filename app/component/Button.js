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
		let initValue$ = props$.map(props => props.init).first();
		let action$ = props$.map(props => props.action).first();
		// let newValue$ = DOM.select('.countButton').events('click').map(e => +1);
		let click$ = DOM.select('.countButton').events('click');
		let newValue$ = Observable.combineLatest(click$, action$, (click, action) => action);
		let model$ = initValue$
			.merge(newValue$)
			.scan((prev, curr) => prev + curr);

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
