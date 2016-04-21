export function handleChildAppError(message) {
	//detect if running in browser, where it's safer to throw lots of uncaught exceptions
	if (typeof global === 'undefined') {
		//The set timeout ensures that single-spa doesn't die with this erro
		setTimeout(() => {
			throw new SingleSpaChildAppError(message);
		});
	} else {
		console.log(`---------------`)
		console.error((new SingleSpaChildAppError(message)).stack);
		console.log(`---------------`)
	}
}

function SingleSpaChildAppError(obj) {
	this.name = 'SingleSpaChildAppError';
	if (obj instanceof Error) {
		this.message = obj.message
		this.stack = obj.stack;
	} else {
		const err = new Error(obj || 'An error has occurred within a ChildApp of single-spa');
		this.message = err.message;
		this.stack = err.stack;
	}
}

SingleSpaChildAppError.prototype = Object.create(Error.prototype);
SingleSpaChildAppError.prototype.constructor = SingleSpaChildAppError;
