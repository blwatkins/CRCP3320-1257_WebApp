export class WeatherClient {
    static #API_KEY = process.env.OPENWEATHER_API_KEY;
    static #LATITUDE = 32.8404271;
    static #LONGITUDE = -96.7820649;
    static #UNITS = 'imperial';
    static #BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    static async getCurrentTemperature() {
        let temp = undefined;

        try {
            const weatherData = await WeatherClient.#fetchWeatherData();
            
            if (weatherData && weatherData.main) {
                temp = weatherData.main.temp;
            }
        } catch (error) {
            console.error(error);
        }
        
        return temp;
    }

    static async getCurrentConditions() {
        let conditions = undefined;

        try {
            const weatherData = await WeatherClient.#fetchWeatherData();
            
            if (weatherData && weatherData.weather) {
                if (weatherData.weather.length > 0) {
                    conditions = weatherData.weather[0].description;
                }
            }
        } catch (error) {
            console.error(error);
        }
        
        return conditions;
    }

    static async #fetchWeatherData() {
        let weatherData = null;
        const params = new URLSearchParams();
        params.append('lat', WeatherClient.#LATITUDE);
        params.append('lon', WeatherClient.#LONGITUDE);
        params.append('units', WeatherClient.#UNITS);
        params.append('appid', WeatherClient.#API_KEY);
        const url = `${WeatherClient.#BASE_URL}?${params.toString()}`;
        
        try {
            const response = await fetch(url);

            if (response && response.ok && response.body) {
                weatherData = await response.json();
            }
        } catch (error) {
            console.error(error);
        }

        return weatherData;
    }
}
