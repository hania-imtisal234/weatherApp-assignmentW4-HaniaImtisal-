import React, { useRef, useCallback, useState } from "react";
import { useGetWeatherByCityQuery, useToggleTemperatureQuery } from "../store/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import Input from "../components/Input/Input";
import Loader from "../components/Loader/Loader";
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";
import RecentSearches from "../components/RecentSearches/RecentSearches";
import TemperatureDropdown from "../components/DropDown/DropDown";

const WeatherPage = () => {
  const [cityName, setCityName] = useState("");
  const [toggleTemperature, setToggleTemperature] = useState("kelvin");
  const inputRef = useRef(null);
  const [showClearButton, setShowClearButton] = useState(false);

  const { data: currentWeatherData, isLoading: currentWeatherLoading, isError: currentWeatherError } =
    useGetWeatherByCityQuery(cityName ? cityName : skipToken);

  const { data: currentTemperatureData, isLoading: currentTemperatureLoading, isError: currentTemperatureError } =
    useToggleTemperatureQuery(
      currentWeatherData && toggleTemperature !== "kelvin"
        ? {
            lat: currentWeatherData?.coord.lat,
            long: currentWeatherData?.coord.lon,
            units: toggleTemperature === 'fahrenheit' ? 'imperial' : 'metric',
          }
        : skipToken
    );

  const handleToggleTemperature = (event) => {
    setToggleTemperature(event.target.value);
  };

  const handleOnChange = (newValue) => {
    setCityName(newValue);
    setShowClearButton(!!newValue);
  };

  const handleClearButton = () => {
    setCityName("");
    setShowClearButton(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (cityName.trim()) {
        setCityName(cityName);
      }
    },
    [cityName]
  );

  if (currentWeatherLoading || currentTemperatureLoading) return <Loader />;

  const weatherData = toggleTemperature === "kelvin" ? currentWeatherData : currentTemperatureData;

  return (
    <div className="bg-blue-100 h-screen flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-blue-700 font-bold text-4xl">Weather App</h1>
          <WbSunnyRoundedIcon fontSize="large" className="text-yellow-500 text-8xl ml-4" />
        </div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              ref={inputRef}
              className="outline-none border rounded-lg py-2 px-4 text-sm bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-300 w-full"
              placeholder="Search location"
              onChange={handleOnChange}
              value={cityName}
            />
            {showClearButton && (
              <button
                type="button"
                onClick={handleClearButton}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full"
              >
                clear
              </button>
            )}
          </div>
        </form>
        <RecentSearches />
        <TemperatureDropdown 
          toggleTemperature={toggleTemperature} 
          handleToggleTemperature={handleToggleTemperature} 
        />
        {cityName && (
          <WeatherDetails
            weatherData={weatherData}
            toggleTemperature={toggleTemperature}
            onToggleTemperature={handleToggleTemperature}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
