import {
	Observable
}
from 'rx';
import {
	div, label, p
}
from '@cycle/dom';
import isolate from '@cycle/isolate';
import Button from './Button';

function Counter({
	DOM
}) {
	let DecrementButton = isolate(Button);
	let IncrementButton = isolate(Button);
	let decrementProps$ = Observable.just({
		id: '#dec',
		label: 'Decrement',
		action: () => -2
	});
	let incrementProps$ = Observable.just({
		id: '#inc',
		label: 'Increment',
		action: () => +2
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
		.combineLatest(decrementButton.DOM, incrementButton.DOM, (number, incrementButton, decrementButton) =>
			div([
				p([
					label({
						className: 'label-number'
					}, String(number))
				]),
				decrementButton,
				incrementButton
			]));

	return {
		DOM: view$
	};
}

export default Counter;
