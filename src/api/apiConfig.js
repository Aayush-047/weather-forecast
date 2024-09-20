const API_KEY = process.env.REACT_APP_API_KEY; 
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchWeather = async (cityName, unit = 'metric') => {
  const weatherResponse = await fetch(
    `${API_BASE_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
  );
  if (!weatherResponse.ok) {
    throw new Error('City not found');
  }
  return await weatherResponse.json();
};

const fetchForecast = async (cityName, unit = 'metric') => {
  const forecastResponse = await fetch(
    `${API_BASE_URL}/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
  );
  if (!forecastResponse.ok) {
    throw new Error('City not found');
  }
  return await forecastResponse.json();
};

export { fetchWeather, fetchForecast };
