# Cycle.js Reference

Doing things with Cycle.js

See:

[Cycle.js](http://cycle.js.org/)

[RxJS](https://github.com/Reactive-Extensions/RxJS)

[hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers)


###Notes

A Cycle.js application is made up of two basic components, a driver() and a main().
main() represents is the human interaction. driver() is an adapter to the external environment/effects, the users interaction with the computer. These two functions operate where input to one is the output of the other.  Cycle.js run() ties the two functions together circularly.

A driver can be anything, DOM, or console, etc.

createVTree(driverSources){
	return driverSources.DOM.select('button').events('click').map(div(p()));	
}

main(driverSources){
	var sinks = {DOM: createVirtualDOMTree(driverSources)};
	return sinks;
}

var driverSources = {DOM: makeDOMDriver('#app')};

Cycle.run(main, driverSources);

