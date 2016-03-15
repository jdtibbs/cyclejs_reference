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
	let DecrementButton = isolate(Button);
	let IncrementButton = isolate(Button);
	let decrementProps$ = Observable.of({
		action: -1,
		label: 'Decrement'
	});
	let incrementProps$ = Observable.of({
		action: +1,
		label: 'Increment'
	});
	let decrementButton = DecrementButton({
		DOM, props$: decrementProps$
	});
	let incrementButton = IncrementButton({
		DOM, props$: incrementProps$
	});
	let model$ = Observable
		.of(0)
		.merge(decrementButton.model$)
		.merge(incrementButton.model$)
		.scan((prev, curr) => prev + curr);
	let view$ = model$
		.combineLatest(decrementButton.DOM, incrementButton.DOM, (model, decrementButton, incrementButton) =>
			div([
				p([
					label({
						className: 'label-number'
					}, String(model))
				]),
				decrementButton,
				incrementButton
			]));

	return {
		DOM: view$
	};
}

export default Counter;
