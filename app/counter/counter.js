	import Cycle from '@cycle/core';
	import {
		button, p, label, div, makeDOMDriver
	}
	from '@cycle/dom';
	import Rx from 'rx';

	// model: given action Observables, manage state, returning Observable. 
	function model(actions) {
		return Rx.Observable
			.of(0)
			.merge(actions.decrementAction$)
			.merge(actions.incrementAction$)
			.scan((prev, curr) => prev + curr);
	}

	// view: represent visual state of the model.  
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

	// intent: listen for user input, from DOM driver source, returns action Observables.
	function intent(DOM) {
		return {
			decrementAction$: DOM.select('#dec').events('click').map(ev => -1),
			incrementAction$: DOM.select('#inc').events('click').map(ev => +1)
		};
	}

	function main(sources) {
		// monitor user input...
		// let actions = intent(sources.DOM);
		// user input to state...
		// let state$ = model(actions);
		// state to view...
		// let vtree$ = view(state$);
		// view to DOM!
		// return {
		// DOM: vtree$
		// };
		// or more concisely...
		return {
			DOM: view(model(intent(sources.DOM)))
		};
	}


	const drivers = {
		DOM: makeDOMDriver('#app')
	};

	Cycle.run(main, drivers);

	export default {};
