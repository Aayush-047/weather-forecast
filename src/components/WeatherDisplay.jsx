import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Text, Title } = Typography;

function WeatherDisplay({ data, unit }) {
  const { name, main, weather } = data;
  const temperature = unit === 'metric' ? main.temp : (main.temp * 9/5) + 32;
  const description = weather[0].description;
  const icon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

  return (
    <Card title={<Title level={3}>{name}</Title>} style={{ marginBottom: 16 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <img src={icon} alt={description} style={{ width: 100, height: 100 }} />
        <Text strong>{description}</Text>
        <Title level={2}>{Math.round(temperature)}°{unit === 'metric' ? 'C' : 'F'}</Title>
        <Text>Humidity: {main.humidity}%</Text>
        <Text>Wind Speed: {unit === 'metric' ? `${data.wind.speed} m/s` : `${(data.wind.speed * 2.237).toFixed(1)} mph`}</Text>
      </Space>
    </Card>
  );
}

export default WeatherDisplay;