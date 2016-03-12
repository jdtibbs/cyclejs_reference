	import Cycle from '@cycle/core';
	import {
		button, p, label, div, makeDOMDriver
	}
	from '@cycle/dom';
	import Rx from 'rx';

	import addButton from './addButton';

	function model(actions) {
		return Rx.Observable
			.of(0)
			.merge(actions.decrementAction$)
			.merge(actions.incrementAction$)
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
				button('#dec', {
					className: 'btn btn-default',
				}, 'Decrement'),
				button('#inc', {
						attributes: {
							class: 'btn btn-default'
						}
					},
					'Increment'),
			]));
	}

	function intent(DOM) {
		return {
			decrementAction$: DOM.select('#dec').events('click').map(ev => -1),
			incrementAction$: DOM.select('#inc').events('click').map(ev => +1)
		};
	}

	function main(sources) {
		return {
			DOM: view(model(intent(sources.DOM)))
		};
	}


	const drivers = {
		DOM: makeDOMDriver('#app')
	};

	Cycle.run(main, drivers);

	export default {};
