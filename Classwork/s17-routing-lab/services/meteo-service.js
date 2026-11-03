import axios from 'axios';

export const getWeatherFrom = async (lat, lon, cityName) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const response = await axios(apiUrl);
  const currentWeather = response.data;
  console.log(currentWeather);
  return `In ${cityName} the current weather is ${currentWeather.current_weather.temperature} C`;
};

// Export default getWeatherFrom
// module.exports = {getWeatherFrom};