import React from 'react';
import { List, Button, Typography, Row, Col } from 'antd';

const { Title } = Typography;

function PreferredCities({ cities, onCityClick, onAddCity, onRemoveCity, currentCity }) {
  return (
    <div className="preferred-cities" style={{ marginTop: 24 }}>
      <Title level={4}>Preferred Cities</Title>
      <List
        size="small"
        bordered
        dataSource={cities}
        renderItem={(city) => (
          <List.Item>
            <Row style={{ width: '100%' }} justify="space-between" align="middle">
              <Col>{city}</Col>
              <Col>
                <Button type="link" onClick={() => onCityClick(city)}>View</Button>
                <Button type="link" danger onClick={() => onRemoveCity(city)}>Remove</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      {currentCity && !cities.includes(currentCity) && (
        <Button onClick={onAddCity} type="primary" style={{ marginTop: 16 }}>
          Add {currentCity} to Preferred Cities
        </Button>
      )}
    </div>
  );
}

export default PreferredCities;