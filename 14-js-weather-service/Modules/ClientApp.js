import WeatherServer from './WeatherServer.js';
import { MONTHS_LIST } from './Constants.js';

export default class ClientApp {
	constructor() {
		this.weatherServer = new WeatherServer();
	}

	showCitiesList(citiesList) {
		console.log(citiesList);
	}

	getDateFromDay(dayYear) {
		if (dayYear <= 365 && dayYear > 0) {
			const date = new Date(2021, 0, dayYear);

			return date;
		}

		throw new Error('Day of the year must be >= 1 and <= 365');
	}

	async checkCityInList(citiesInfo, cityName) {
		const cityList = await this.weatherServer.getCitiesList(citiesInfo);

		if (cityList.includes(cityName)) {
			return true;
		}

		return new Error('Нет такого города в списке');
	}

	async getCityInfo(citiesInfo, cityName, dayYear) {
		try {
			if (!citiesInfo) return;

			if (!(await this.checkCityInList(citiesInfo, cityName))) return;

			const date = this.getDateFromDay(dayYear).getDate();

			if (!date) return;

			const month = this.getDateFromDay(dayYear).getMonth();
			const averageTemperature =
				await this.weatherServer.calculateCityAverageTemperature(
					citiesInfo,
					cityName,
					dayYear,
				);

			return { date, month, averageTemperature };
		} catch (error) {
			console.log(error.message);
		}
	}

	async showCityInfo(cityName, dayYear) {
		const citiesInfo = await this.weatherServer.getData(
			WeatherServer.getDelayValue(),
		);
		const cityInformation = await this.getCityInfo(
			citiesInfo,
			cityName,
			dayYear,
		);

		if (cityInformation) {
			const { date, month, averageTemperature } = cityInformation;

			console.log(
				`Город ${cityName}, ${date} ${MONTHS_LIST[month]}, средняя температура: ${averageTemperature}`,
			);

			return cityInformation;
		}

		return;
	}
}
