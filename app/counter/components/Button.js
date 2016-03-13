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
		return intent.action$;
	}

	// view: returns visual state of the model.  
	function view(model$, props$) {
		return Observable.combineLatest(model$, props$, (model, props) =>
			button(props.id, {
					attributes: {
						class: 'btn btn-default'
					}
				},
				props.label));
	}

	// intent: listen for user input, from DOM driver source, returns action Observables.
	function intent(DOM, props$) {
		return {
			action$: DOM.select('#dec').events('click').map(ev => props$.action)
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
