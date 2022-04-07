import WeatherServer from '../Modules/WeatherServer.js';
import { CITIES_INFO, CITIES_LIST } from '../Modules/Constants';

const weatherServer = new WeatherServer();

describe('WeatherServer methods', () => {
	let resolveValue, rejectValue;

	beforeEach(async () => {
		resolveValue = await weatherServer.getData(100);
		rejectValue = await weatherServer.getData(2100);
	});

	test('should return right data', async () => {
		expect.assertions(1);

		expect(resolveValue).toEqual(CITIES_INFO);
	});

	test('should fail connect to server', async () => {
		console.log = jest.fn();

		await weatherServer.getData(2000);

		expect(console.log).toHaveBeenCalledWith(
			'Server response time is more than 1.5s',
		);
	});

	test('should get cities list', async () => {
		expect.hasAssertions();

		const cities = await weatherServer.getCitiesList(resolveValue);

		expect(cities).toEqual(CITIES_LIST);
	});

	test('should throw an error in getCitiesList()', async () => {
		const newError = new Error('Fail to connect');

		expect(await weatherServer.getCitiesList(rejectValue)).toEqual(newError);
	});

	test('should return average temperature', async () => {
		expect.hasAssertions();

		const temperature = await weatherServer.calculateCityAverageTemperature(
			resolveValue,
			'Москва',
			62,
		);
		expect(temperature).toBe('-14.8');
	});
});
