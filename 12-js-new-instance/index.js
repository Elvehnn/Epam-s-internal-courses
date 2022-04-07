function newInstance(constructorFunction, args) {
	const newInstance = Object.create(constructorFunction.prototype);

	const resultOfConstructor = constructorFunction.apply(newInstance, args);

	if (typeof resultOfConstructor === "object") return resultOfConstructor;

	return newInstance;
}
