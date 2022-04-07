export default class EventEmitter {
	constructor() {
		this._events = {};
	}
	on(eventName, listener) {
		(this._events[eventName] || (this._events[eventName] = [])).push(listener);
		return this;
	}
	emit(eventName, arg) {
		(this._events[eventName] || []).slice().forEach((lsn) => lsn(arg));
	}
}
