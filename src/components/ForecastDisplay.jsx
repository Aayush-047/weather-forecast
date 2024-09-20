import React from 'react';
import { Card, Typography, Row, Col } from 'antd';

const { Text, Title } = Typography;

function ForecastDisplay({ data, unit }) {
  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

  return (
    <Card title={<Title level={4}>3-Day Forecast</Title>} style={{ marginTop: 16 }}>
      <Row gutter={[16, 16]}>
        {dailyForecasts.map((forecast) => (
          <Col xs={24} sm={8} key={forecast.dt}>
            <Card>
              <Text strong>{new Date(forecast.dt * 1000).toLocaleDateString()}</Text>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                style={{ width: 50, height: 50 }}
              />
              <Title level={3}>{Math.round(forecast.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</Title>
              <Text>{forecast.weather[0].description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default ForecastDisplay;