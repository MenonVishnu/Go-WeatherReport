import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
// import "./script.js";

function App() {
	const [city, setCity] = useState("");

	const [userData, setUserData] = useState({
		name: "",
		email: "",
		city: "",
	});

	const [hideInitial, setHideInitial] = useState(true);

	const weatherResult = document.getElementById("weatherResult");
	const weatherError = document.getElementById("weatherError");
	const initialState = document.getElementById("initialState");

	const hideInitialDiv = () => {
		setHideInitial(false);
	};

	const ApiData = {
		city: null,
		date: null,
		temperature: "9",
		description: "Rain",
		feels_like: 11.0,
		humidity: 75,
		wind: 16,
		pressure: 1001,
	};

	const filterData = (result) => {
		ApiData.city = result.name;
		ApiData.date = new Intl.DateTimeFormat("en-US", {
			dateStyle: "full",
			timeStyle: "short",
			timeZone: "Asia/Kolkata",
		}).format(result.dt);
		ApiData.temperature = result.main.temp;
		ApiData.description = result.weather.description;
		ApiData.feels_like = result.main.feels_like;
		ApiData.humidity = result.main.humidity;
		ApiData.pressure = result.main.pressure;
		ApiData.wind = result.wind.speed;
	};

	const getWeather = () => {
		//API Call to Weather Application.
		console.log("Weather Called for city: ", city);
		//once getWeather API call is called then remove the initial state div
		hideInitialDiv();
		var result;
		if (city === "berlin") {
			result = {
				coord: { lon: 13.4105, lat: 52.5244 },
				weather: [
					{
						id: 803,
						main: "Clouds",
						description: "broken clouds",
						icon: "04d",
					},
				],
				base: "stations",
				main: {
					temp: 22.35,
					feels_like: 21.76,
					temp_min: 22.35,
					temp_max: 22.35,
					pressure: 1023,
					humidity: 43,
					sea_level: 1023,
					grnd_level: 1018,
				},
				visibility: 10000,
				wind: { speed: 4.4, deg: 308, gust: 5.3 },
				clouds: { all: 78 },
				dt: 1745937571,
				sys: { country: "DE", sunrise: 1745897919, sunset: 1745951311 },
				timezone: 7200,
				id: 2950159,
				name: "Berlin",
				cod: 200,
			};
		} else {
			result = null; //API Results;
		}

		if (result) {
			//if result is present
			weatherResult.classList.remove("hidden");
			weatherError.classList.add("hidden");

			filterData(result);

			const cityNameEl = document.getElementById("cityName");
			const dateEl = document.getElementById("date");
			const temperatureEl = document.getElementById("temperature");
			const descriptionEl = document.getElementById("description");
			const feelsLikeEl = document.getElementById("feelsLike");
			const humidityEl = document.getElementById("humidity");
			const windEl = document.getElementById("wind");
			const pressureEl = document.getElementById("pressure");

			cityNameEl.textContent = ApiData.city;
			dateEl.textContent = ApiData.date;
			temperatureEl.textContent = `${ApiData.temperature}°C`;
			descriptionEl.textContent = ApiData.description;
			feelsLikeEl.textContent = `${ApiData.feels_like.toFixed(1)}°C`;
			humidityEl.textContent = `${ApiData.humidity}%`;
			windEl.textContent = `${ApiData.wind} km/h`;
			pressureEl.textContent = `${ApiData.pressure} hPa`;
		} else {
			weatherError.classList.remove("hidden");
			weatherResult.classList.add("hidden");
		}
	};

	const subscribeUser = () => {
		//API Call to add user to subscription list.
		console.log("User Added: ", userData);

		userData.name = "";
		userData.email = "";
		userData.city = "";
		document.getElementById("name").value = "";
		document.getElementById("email").value = "";
		document.getElementById("notifCity").value = "";
	};

	// useEffect(() => {
	//   document.addEventListener("DOMContentLoaded", function () {
	//     const searchBtn = document.getElementById("searchBtn");
	//     const cityInput = document.getElementById("cityInput");
	//     const weatherResult = document.getElementById("weatherResult");
	//     const weatherError = document.getElementById("weatherError");
	//     const initialState = document.getElementById("initialState");
	//     const notificationForm = document.getElementById("notificationForm");
	//     const formSuccess = document.getElementById("formSuccess");

	//     // Weather search functionality
	//     searchBtn.addEventListener("click", function () {
	//       console.log("clicked");
	//       getWeather(cityInput.value);
	//     });

	//     cityInput.addEventListener("keypress", function (e) {
	//       console.log("clicked");
	//       if (e.key === "Enter") {
	//         getWeather(cityInput.value);
	//       }
	//     });

	//     function getWeather(city) {
	//       if (!city.trim()) return;

	//       // This is a demo that simulates API behavior
	//       // In a real app, you would call a weather API
	//       simulateWeatherAPI(city);
	//     }

	//     function simulateWeatherAPI(city) {
	//       // Hide initial state and error
	//       initialState.classList.add("hidden");
	//       weatherError.classList.add("hidden");

	//       // Simulate API call with timeout
	//       setTimeout(() => {
	//         // 90% chance of success for demo purposes
	//         if (Math.random() > 0.1 && city.length > 1) {
	//           displayWeather(city);
	//         } else {
	//           weatherResult.classList.add("hidden");
	//           weatherError.classList.remove("hidden");
	//         }
	//       }, 500);
	//     }

	//     function displayWeather(city) {
	//       // Get elements
	//       const cityNameEl = document.getElementById("cityName");
	//       const dateEl = document.getElementById("date");
	//       const temperatureEl = document.getElementById("temperature");
	//       const descriptionEl = document.getElementById("description");
	//       const feelsLikeEl = document.getElementById("feelsLike");
	//       const humidityEl = document.getElementById("humidity");
	//       const windEl = document.getElementById("wind");
	//       const pressureEl = document.getElementById("pressure");

	//       // Generate random weather data for demo
	//       const temp = Math.floor(Math.random() * 35) + 5; // 5 to 40°C
	//       const feelsLike = temp + (Math.random() > 0.5 ? 2 : -2);
	//       const humidity = Math.floor(Math.random() * 60) + 30; // 30% to 90%
	//       const wind = (Math.random() * 20).toFixed(1); // 0 to 20 km/h
	//       const pressure = Math.floor(Math.random() * 50) + 1000; // 1000 to 1050 hPa

	//       const descriptions = [
	//         "clear sky",
	//         "few clouds",
	//         "scattered clouds",
	//         "broken clouds",
	//         "shower rain",
	//         "rain",
	//         "thunderstorm",
	//         "snow",
	//         "mist",
	//       ];
	//       const description =
	//         descriptions[Math.floor(Math.random() * descriptions.length)];

	//       // Format date
	//       const now = new Date();
	//       const options = {
	//         weekday: "long",
	//         year: "numeric",
	//         month: "long",
	//         day: "numeric",
	//       };
	//       const formattedDate = now.toLocaleDateString("en-US", options);

	//       // Update UI
	//       cityNameEl.textContent = city;
	//       dateEl.textContent = formattedDate;
	//       temperatureEl.textContent = `${temp}°C`;
	//       descriptionEl.textContent = description;
	//       feelsLikeEl.textContent = `${feelsLike.toFixed(1)}°C`;
	//       humidityEl.textContent = `${humidity}%`;
	//       windEl.textContent = `${wind} km/h`;
	//       pressureEl.textContent = `${pressure} hPa`;

	//       // Show weather result
	//       weatherResult.classList.remove("hidden");
	//     }

	//     // Notification form functionality
	//     notificationForm.addEventListener("submit", function (e) {
	//       e.preventDefault();

	//       // Get form values
	//       const name = document.getElementById("name").value;
	//       const email = document.getElementById("email").value;
	//       const city = document.getElementById("notifCity").value;

	//       // In a real app, you would send this data to a server
	//       console.log("Subscription data:", { name, email, city });

	//       // Show success message
	//       formSuccess.classList.remove("hidden");

	//       // Reset form
	//       notificationForm.reset();

	//       // Hide success message after 3 seconds
	//       setTimeout(() => {
	//         formSuccess.classList.add("hidden");
	//       }, 3000);
	//     });
	//   });
	// });

	return (
		<>
			<div className="container mx-auto max-w-5xl py-8">
				<header className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
						Go Weather
					</h1>
					<p className="text-blue-100">Your personal weather companion</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
					{/* <!-- Weather Search Section --> */}
					<div className="md:col-span-3">
						<div className="glass-effect rounded-xl p-6 h-full">
							<h2 className="text-xl font-semibold text-white mb-4">
								Check Weather
							</h2>

							<div className="flex mb-6">
								<input
									type="text"
									id="cityInput"
									placeholder="Enter city name"
									className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-700"
									value={city}
									onChange={(e) => setCity(e.target.value)}
								/>
								<button
									id="searchBtn"
									className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg transition duration-300"
									onClick={getWeather}>
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
											<div
												id="temperature"
												className="text-4xl font-bold"></div>
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
								className="hidden bg-red-500 bg-opacity-20 text-white p-4 rounded-lg mt-4">
								<p>City not found. Please try again.</p>
							</div>

							{hideInitial && (
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
											strokeLinejoin="round">
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

					{/* <!-- Weather Notification Signup --> */}
					<div className="md:col-span-2">
						<div className="glass-effect rounded-xl p-6 h-full">
							<h2 className="text-xl font-semibold text-white mb-4">
								Daily Weather Alerts
							</h2>
							<p className="text-blue-100 text-sm mb-4">
								Get weather updates for your city delivered to your inbox every
								day.
							</p>

							<div id="notificationForm" className="space-y-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-blue-100 mb-1">
										Name
									</label>
									<input
										type="text"
										id="name"
										required
										className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-700"
										value={userData.name}
										onChange={(e) =>
											setUserData((prev) => ({ ...prev, name: e.target.value }))
										}
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-blue-100 mb-1">
										Email
									</label>
									<input
										type="email"
										id="email"
										required
										className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-700"
										value={userData.email}
										onChange={(e) =>
											setUserData((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
									/>
								</div>

								<div>
									<label
										htmlFor="notifCity"
										className="block text-sm font-medium text-blue-100 mb-1">
										City
									</label>
									<input
										type="text"
										id="notifCity"
										required
										className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-700"
										value={userData.city}
										onChange={(e) =>
											setUserData((prev) => ({ ...prev, city: e.target.value }))
										}
									/>
								</div>

								<button
									className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
									onClick={subscribeUser}>
									Subscribe
								</button>
							</div>

							<div
								id="formSuccess"
								className="hidden mt-4 bg-green-500 bg-opacity-20 text-white p-3 rounded-lg text-center">
								<p>Successfully subscribed!</p>
							</div>
						</div>
					</div>
				</div>

				<footer className="mt-8 text-center text-blue-100 text-sm">
					<p>
						© 2023 SkyView Weather App |{" "}
						<span className="opacity-70">Demo Version</span>
					</p>
				</footer>
			</div>
		</>
	);
}

export default App;
