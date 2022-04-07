import ClientApp from '../Modules/ClientApp';
import { CITIES_LIST } from '../Modules/Constants';

const clientApp = new ClientApp();

describe('ClientApp methods', () => {
	let resolveValue, rejectValue;

	beforeEach(async () => {
		resolveValue = await clientApp.weatherServer.getData(100);
		rejectValue = await clientApp.weatherServer.getData(2100);
	});

	test('should console cities list', async () => {
		expect.hasAssertions();

		const citiesArray = await clientApp.weatherServer.getCitiesList(
			resolveValue,
		);

		console.log = jest.fn();
		clientApp.showCitiesList(citiesArray);

		expect(console.log).toHaveBeenCalledWith(CITIES_LIST);
	});

	test('should return date', async () => {
		const date = clientApp.getDateFromDay(62);

		expect(date).toEqual(new Date(2021, 0, 62));
	});

	test('should fail date', () => {
		expect(() => clientApp.getDateFromDay(490)).toThrow(
			'Day of the year must be >= 1 and <= 365',
		);
	});

	test('should return true if city is in the list', async () => {
		expect(await clientApp.checkCityInList(resolveValue, 'Париж')).toBeTruthy();
	});

	test('should return error if city is not in the list', async () => {
		const newError = new Error('Нет такого города в списке');

		expect(await clientApp.checkCityInList(resolveValue, 'Рязань')).toEqual(
			newError,
		);
	});

	test('should return object with city info', async () => {
		const cityInfo = { date: 3, month: 2, averageTemperature: '-14.8' };
		expect(await clientApp.getCityInfo(resolveValue, 'Москва', 62)).toEqual(
			cityInfo,
		);
	});

	test('should return undefined if wrong city', async () => {
		expect(
			await clientApp.getCityInfo(resolveValue, 'Рязань', 45),
		).toBeUndefined();
	});

	test('should return error if wrong day', async () => {
		expect(
			await clientApp.getCityInfo(resolveValue, 'Париж', 450),
		).toBeUndefined();
	});

	test('should return undefined if wrong day', async () => {
		expect.hasAssertions();

		expect(await clientApp.showCityInfo('Париж', 450)).toBeUndefined();
	});

	test('should return undefined if wrong city', async () => {
		expect.hasAssertions();

		expect(await clientApp.showCityInfo('Рязань', 45)).toBeUndefined();
	});
});
