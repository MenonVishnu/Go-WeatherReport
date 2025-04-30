import { useState } from "react";

function Search(props) {
  return (
    // {/* <!-- Weather Search Section --> */}
    <div className="md:col-span-3">
      <div className="glass-effect rounded-xl p-6 h-full">
        <h2 className="text-xl font-semibold text-white mb-4">Check Weather</h2>

        <div className="flex mb-6">
          <input
            type="text"
            id="cityInput"
            placeholder="Enter city name"
            className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-700"
            value={props.city}
            onChange={(e) => props.setCity(e.target.value)}
          />
          <button
            id="searchBtn"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg transition duration-300"
            onClick={props.getWeather}
          >
            Search
          </button>
        </div>

        <div id="weatherResult" className="hidden">
          <div className="weather-card bg-white bg-opacity-20 rounded-xl p-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 id="cityName" className="text-2xl font-bold"></h3>
                <p id="date" className="text-sm opacity-80"></p>
              </div>
              <div className="text-right">
                <div id="temperature" className="text-4xl font-bold"></div>
                <p id="description" className="capitalize"></p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-sm opacity-80">Feels Like</div>
                <div id="feelsLike" className="font-semibold"></div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-sm opacity-80">Humidity</div>
                <div id="humidity" className="font-semibold"></div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-sm opacity-80">Wind</div>
                <div id="wind" className="font-semibold"></div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-sm opacity-80">Pressure</div>
                <div id="pressure" className="font-semibold"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="weatherError"
          className="hidden bg-red-500 bg-opacity-20 text-white p-4 rounded-lg mt-4"
        >
          <p>City not found. Please try again.</p>
        </div>

        {props.hideInitial && (
          <div id="initialState" className="text-center py-10">
            <div className="weather-icon mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
              </svg>
            </div>
            <p className="text-white text-lg">
              Enter a city name to get the current weather
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
