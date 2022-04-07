class WeatherServer {
	URL = 'data.json';

	getJson() {
		return fetch(this.URL)
			.then((response) => response.json())
			.catch((error) => {
				console.log(`Failed to connect to server`, error);
			});
	}

	getData() {
		return this.getJson()
			.then((data) => {
				return new Promise((resolve) => {
					const delay = Math.random() * 1500 + 500;

					if (delay > 1500)
						throw new Error('Server response time is more than 1.5s');

					setTimeout(() => {
						resolve(data);
					}, delay);
				});
			})
			.catch((error) => console.log(error.message));
	}

	getCitiesList() {
		return this.getData()
			.then((data) => {
				if (!data) throw new Error('Failed to connect to the server');

				return data.cities.map((item) => item.city);
			})
			.catch((error) => console.log(error.message));
	}

	calculateCityAverageTemperature(city, dayYear) {
		return this.getData()
			.then((data) => {
				const cityLatitude = data.cities.find(
					(item) => item.city === city,
				).latitude;
				const averageTemperature =
					30 +
					cityLatitude * (Math.abs(182 - Math.abs(202 - dayYear)) / 210 - 1);

				return averageTemperature.toFixed(1);
			})
			.catch((error) => console.log(error));
	}
}

class ClientApp {
	constructor() {
		this.weatherServer = new WeatherServer();
	}

	showCitiesList() {
		this.weatherServer
			.getCitiesList()
			.then((citiesArray) => console.log(citiesArray));
	}

	getCityAverageTemperature(cityName, dayYear) {
		return this.weatherServer.calculateCityAverageTemperature(
			cityName,
			dayYear,
		);
	}

	getDate(dayYear) {
		if (dayYear <= 365 && dayYear > 0) {
			const date = new Date(2021, 0, dayYear);

			return date;
		}

		throw new Error('Day of the year must be >= 1 and <= 365');
	}

	showCityInfo(cityName, dayYear) {
		const monthsArray = [
			'января',
			'февраля',
			'марта',
			'апреля',
			'мая',
			'июня',
			'июля',
			'августа',
			'сентября',
			'октября',
			'ноября',
			'декабря',
		];

		this.weatherServer
			.getCitiesList()
			.then((cityList) => {
				if (!cityList.includes(cityName))
					throw new Error('Нет такого города в списке');

				const date = this.getDate(dayYear).getDate();
				const month = this.getDate(dayYear).getMonth();

				this.getCityAverageTemperature(cityName, dayYear).then(
					(averageTemperature) => {
						if (averageTemperature) {
							console.log(
								`Город ${cityName}, ${date} ${monthsArray[month]}, средняя температура: ${averageTemperature}`,
							);
						}
					},
				);
			})
			.catch((error) => console.log(error));
	}
}

const clientApplication = new ClientApp();

clientApplication.showCityInfo('Женева', 365);
clientApplication.showCityInfo('Москва', 65);
clientApplication.showCityInfo('Париж', 565);
