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
		label: 'Decrement',
		action: () => -2
	});
	let incrementProps$ = Observable.just({
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
		// .merge(decrementButton.model$)
		// .merge(incrementButton.model$)
		// .scan((prev, curr) => prev + curr);

	function view() {
		let view$ = Observable
			.combineLatest(model$, decrementButton.DOM, incrementButton.DOM, (number, decrementButton, incrementButton) =>
				div([
					p([
						label({
							className: 'label-number'
						}, String(number))
					]),
					decrementButton,
					incrementButton
				]));
	}
	let view$ = view();
	// let view$ = Observable.of('fred').map(() => p([label('fred')]));

	return {
		DOM: view$
	};
}

export default Counter;
