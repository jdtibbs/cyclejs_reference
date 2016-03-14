import {
	div, label, p
}
from '@cycle/dom';
import isolate from '@cycle/isolate';
import {
	Observable
}
from 'rx';
import Button from './Button';

function Counter({
	DOM
}) {
	let AddButton = isolate(Button);
	let addProps$ = Observable.just({
		init: 0,
		label: 'Add'
	});
	let addButton = AddButton({
		DOM, props$: addProps$
	});

	let view$ = addButton.model$
		.combineLatest(addButton.DOM, (model, addButton) =>
			div([
				p([
					label({
						className: 'label-number'
					}, String(model))
				]),
				addButton
			]));

	return {
		DOM: view$
	};
}

export default Counter;
