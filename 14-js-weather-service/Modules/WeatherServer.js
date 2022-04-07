import { CITIES_INFO } from './Constants.js';

export default class WeatherServer {
	static getDelayValue = () => {
		return Math.random() * 1500 + 500;
	};

	getData = async (delay) => {
		try {
			if (delay > 1500) {
				throw new Error('Server response time is more than 1.5s');
			}

			return await new Promise((resolve) => {
				setTimeout(resolve(CITIES_INFO), delay);
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	async getCitiesList(citiesInfo) {
		if (citiesInfo) {
			return citiesInfo.cities.map((item) => item.city);
		}
		return new Error('Fail to connect');
	}

	async calculateCityAverageTemperature(citiesInfo, city, dayYear) {
		const cityLatitude = citiesInfo.cities.find(
			(item) => item.city === city,
		).latitude;
		const averageTemperature =
			30 + cityLatitude * (Math.abs(182 - Math.abs(202 - dayYear)) / 210 - 1);

		return averageTemperature.toFixed(1);
	}
}
