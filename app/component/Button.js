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
		let newValue$ = DOM.select('.countButton').events('click').map(e => +1);
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