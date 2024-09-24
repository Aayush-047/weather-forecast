import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Typography, message, Spin } from 'antd';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import UnitToggle from './components/UnitToggle';
import PreferredCities from './components/PreferredCities';
import ForecastDisplay from './components/ForecastDisplay';
import { fetchWeather, fetchForecast } from './api/apiConfig';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState('metric'); 
  const [loading, setLoading] = useState(false);
  const [preferredCities, setPreferredCities] = useState([]);
  let cache={}

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem('preferredCities') || '[]');
    setPreferredCities(storedCities);
  }, []);

  

  const fetchWeatherData = async (cityName) => {
  setLoading(true);
  
  if (cityName in cache) {
    setWeatherData(cache[cityName].weather);
    setForecastData(cache[cityName].forecast);
    setCity(cityName);
    setLoading(false);
    return;
  }

  try {
    const [weather, forecast] = await Promise.all([
      fetchWeather(cityName, unit),
      fetchForecast(cityName, unit)
    ]);
    
    setWeatherData(weather);
    setForecastData(forecast);
    setCity(cityName);
    
    cache[cityName] = { weather, forecast };

    setLoading(false);
  } catch (err) {
    message.error(err.message);
    setLoading(false);
  }
};


  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [unit,city]);

  const handleCitySearch = (cityName) => {
    fetchWeatherData(cityName);
  };

  const handleUnitToggle = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  const handleAddPreferredCity = () => {
    if (city && !preferredCities.includes(city)) {
      const updatedCities = [...preferredCities, city];
      setPreferredCities(updatedCities);
      localStorage.setItem('preferredCities', JSON.stringify(updatedCities));
      message.success(`${city} added to preferred cities`);
    }
  };

  const handleRemovePreferredCity = (cityToRemove) => {
    const updatedCities = preferredCities.filter(c => c !== cityToRemove);
    setPreferredCities(updatedCities);
    localStorage.setItem('preferredCities', JSON.stringify(updatedCities));
    message.success(`${cityToRemove} removed from preferred cities`);
  };

  return (
    <Layout className="layout" style={{minHeight:"100vh"}}>
      <Header style={{ padding: '0 16px' ,display:"flex" , justifyContent:"center" , alignItems:"center"}}>
        <Title level={2} style={{ color: 'white', margin: 0, fontSize: '24px' }}>Weather Forecast App</Title>
      </Header>
      <Content style={{ padding: '0 16px' }}>
        <Spin spinning={loading} tip="Loading...">
          <div className="site-layout-content" style={{ padding: 24, minHeight: 280 }}>
            <div style={{display:"flex",justifyContent:"center"}}>
              <CitySearch onSearch={handleCitySearch} loading={loading} />
            </div>
            <UnitToggle unit={unit} onToggle={handleUnitToggle} />
            {weatherData && (
              <>
                <WeatherDisplay data={weatherData} unit={unit} />
                <ForecastDisplay data={forecastData} unit={unit} />
              </>
            )}
            <PreferredCities
              cities={preferredCities}
              onCityClick={handleCitySearch}
              onAddCity={handleAddPreferredCity}
              onRemoveCity={handleRemovePreferredCity}
              currentCity={city}
            />
          </div>
        </Spin>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Weather Forecast App by Aayush Khunger</Footer>
    </Layout>
  );
}

export default App;
