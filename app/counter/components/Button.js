	// import Cycle from '@cycle/core';
	import {
		button
	}
	from '@cycle/dom';
	import {
		Observable
	}
	from 'rx';

	// model: given action Observables, manage state, returning Observable. 
	function model(intent) {
		// return intent.action$;
		return Observable
			.of(0);
		// .merge(intent.action$)
		// .scan((prev, curr) => prev + curr);
	}

	// view: returns visual state of the model.  
	function view(model$, props$) {
		// return Observable.combineLatest(model$, props$, (model, props) =>
		// return Observable.combineLatest(props$, (props) =>
		// 	button('.countBtn', {
		// 			attributes: {
		// 				class: 'btn btn-default'
		// 			}
		// 		},
		// 		'Button'));
		return Observable.just(
			button('.countBtn', {
					attributes: {
						class: 'btn btn-default'
					}
				},
				'Button'));
	}

	// intent: listen for user input, from DOM driver source, returns action Observables.
	function intent(DOM, props$) {
		return {
			action$: DOM.select('.countBtn').events('click').map(ev => +1)
		};
	}

	function Button({
		DOM, props$
	}) {

		const intent$ = intent(DOM, props$);
		const model$ = model(intent$);
		const view$ = view(model$, props$);
		return {
			DOM: view$,
			model$: model$
		};
	}

	export default Button;
