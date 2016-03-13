	import Cycle from '@cycle/core';
	import button from '@cycle/dom';
	import Rx from 'rx';

	// model: given action Observables, manage state, returning Observable. 
	function model(intent) {
		return intent.action$;
	}

	// view: returns visual state of the model.  
	function view(model$) {
		return model$.map(number =>
			button('#dec', {
					attributes: {
						class: 'btn btn-default'
					}
				},
				'Decrement')
		);
	}

	// intent: listen for user input, from DOM driver source, returns action Observables.
	function intent(sources) {
		return {
			action$: sources.DOM.select('#dec').events('click').map(ev => -1)
		};
	}

	function main(sources) {
		const intent$ = intent(sources);
		const model$ = model(intent$);
		const view$ = view(model$);
		return {
			intent$: intent$,
			model$: model$,
			view$: view$
		};
	}

	export default main;
