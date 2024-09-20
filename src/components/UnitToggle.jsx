import React from 'react';
import { Switch } from 'antd';

function UnitToggle({ unit, onToggle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Switch
        checked={unit === 'imperial'}
        onChange={onToggle}
        checkedChildren="°F"
        unCheckedChildren="°C"
      />
    </div>
  );
}

export default UnitToggle;