import React from "react";

const TemperatureDropdown = ({ toggleTemperature, handleToggleTemperature }) => {
  return (
    <div className="mb-6">
      <label className="block text-blue-700 font-bold mb-2">Temperature Unit:</label>
      <select
        value={toggleTemperature}
        onChange={handleToggleTemperature}
        className="border rounded-lg py-2 px-4 w-full"
      >
        <option value="kelvin">Kelvin</option>
        <option value="celsius">Celsius</option>
        <option value="fahrenheit">Fahrenheit</option>
      </select>
    </div>
  );
};

export default TemperatureDropdown;
