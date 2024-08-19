import React from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
const WeatherDetails = ({ weatherData, toggleTemperature }) => {
  const { main, weather, wind } = weatherData || {};
  const temperature = main?.temp;
  const weatherCondition = weather?.[0]?.description;
  const windSpeed = wind?.speed;

  const temperatureUnit = toggleTemperature === "kelvin" 
    ? "K" 
    : toggleTemperature === "celsius" 
    ? "C" 
    : "F";

  return (
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Weather Details:</h2>
      {temperature !== undefined && (
       <div className='flex justify-center'>
         <DeviceThermostatIcon className='mt-1 text-red-700'/>
       <p className="text-xl mb-2 flex items-center justify-center">
          Temperature: {temperature}°{temperatureUnit}
        </p>
       </div>
      )}
      {weatherCondition && <div className='flex justify-center'>
        <CloudQueueIcon className='m-1 text-blue-500'/>
        <p className="text-lg mb-2">Condition: {weatherCondition}</p>
        </div>}
      {windSpeed && 
      <div className='flex justify-center'>
         <AirIcon className='m-1 text-slate-500'/>
        <p className="text-lg">Wind Speed: {windSpeed} m/s</p>
        </div>}
    </div>
  );
};

export default WeatherDetails;
