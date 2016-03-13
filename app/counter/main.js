import {
	run
}
from '@cycle/core';
import {
	makeDOMDriver
}
from '@cycle/dom';
import Counter from './components/Counter';

const main = Counter;

run(main, {
	DOM: makeDOMDriver('#app')
});
