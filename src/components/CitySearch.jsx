import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function CitySearch({ onSearch, loading }) {
  const [inputCity, setInputCity] = useState('');

  const handleSearch = (value) => {
    if (value.trim()) {
      onSearch(value.trim());
      setInputCity('');
    }
  };

  return (
    <Search
      placeholder="Enter city name"
      enterButton="Search"
      size="large"
      value={inputCity}
      onChange={(e) => setInputCity(e.target.value)}
      onSearch={handleSearch}
      loading={loading}
      style={{ marginBottom: 16, maxWidth: 400, width: '100%',alignSelf: "center" }}
    />
  );
}

export default CitySearch;