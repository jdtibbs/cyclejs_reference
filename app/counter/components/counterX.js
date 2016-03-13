	import Cycle from '@cycle/core';
	import {
		button, p, label, div, makeDOMDriver
	}
	from '@cycle/dom';
	import Rx from 'rx';

	import decrementButton from './decrement.button';
	import incrementButton from './increment.button';

	function model(intent) {
		return Rx.Observable
			.of(0)
			.merge(intent.decrementAction$)
			.merge(intent.incrementAction$)
			.scan((prev, curr) => prev + curr);
	}

	function view(state$) {
		return state$.map(number =>
			div([
				p([
					label({
						className: 'label-number'
					}, String(number))
				]),
				decrementButton.view$,
				incrementButton.view$
			]));
	}

	function intent(DOM) {
		return {
			decrementAction$: decrementButton.intent$,
			incrementAction$: incrementButton.intent$
		};
	}

	function main(sources) {
		return {
			DOM: view(model(intent(sources.DOM)))
		};
	}


	const sources = {
		DOM: makeDOMDriver('#app')
	};

	Cycle.run(main, sources);

	export default {};
