import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather
}) {
  return (
    <div className="w-[100%] mt-5 mb-5">
      <div className="flex w-[100%] items-center justify-center py-6 text-xl text-cyan-300">
        <p>{weather.current.condition.text}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={weather.current.condition.icon} alt="" className="w-25" />
        <p className="text-5xl">{`${weather.current.temp_c}°C`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{`${weather.current.feelslike_c}°C`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${weather.current.humidity}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${weather.current.wind_kph} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-2 text-white text-sm py-3 space-y-2 md:space-y-0">
  <div className="flex flex-row items-center space-x-2">
    <UilSun />
    <p className="font-light">
      Rise:
      <span className="font-medium ml-1">
        {weather.forecast.forecastday[0].astro.sunrise}
      </span>
    </p>
    <p className="font-light">|</p>
    <UilSunset />
    <p className="font-light">
      Set:
      <span className="font-medium ml-1">
        {weather.forecast.forecastday[0].astro.sunset}
      </span>
    </p>
  </div>
  <div className="flex flex-row items-center space-x-2">
    <UilSun />
    <p className="font-light">
      High:
      <span className="font-medium ml-1">{`${weather.forecast.forecastday[0].day.maxtemp_c}°`}</span>
    </p>
    <p className="font-light">|</p>
    <UilSun />
    <p className="font-light">
      Low:
      <span className="font-medium ml-1">{`${weather.forecast.forecastday[0].day.mintemp_c}°`}</span>
    </p>
  </div>
</div>

    </div>
  );
}

export default TemperatureAndDetails;
