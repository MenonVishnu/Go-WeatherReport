import { useEffect, useState } from "react";
import Search from "./components/Search";
import Notification from "./components/Notification";

import "./App.css";

function App() {
	const [city, setCity] = useState("");
	const [userData, setUserData] = useState({
		name: null,
		email: null,
		city: null,
	});

	const [hideInitial, setHideInitial] = useState(true);

	const weatherResult = document.getElementById("weatherResult");
	const weatherError = document.getElementById("weatherError");
	const formSuccess = document.getElementById("formSuccess");
	const formError = document.getElementById("formError");
	// const initialState = document.getElementById("initialState");

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
			timeZone: "Asia/Kolkata",
		}).format(result.dt * 1000);
		ApiData.temperature = result.main.temp;
		ApiData.description = result.weather.description;
		ApiData.feels_like = result.main.feels_like;
		ApiData.humidity = result.main.humidity;
		ApiData.pressure = result.main.pressure;
		ApiData.wind = result.wind.speed;
	};

	const getWeather = async () => {
		//API Call to Weather Application.
		console.log("Weather API Called for city: ", city);
		hideInitialDiv(); //once getWeather API call is called then remove the initial state div

		//api url
		var url = `http://localhost:8080/weather/${city}`;

		var result = await fetch(url);
		if (!result.ok) {
			throw new Error(`Response status: ${result.status}`);
		}
		result = await result.json();
		console.log(result);
		// var result;

		// if (city === "berlin") {
		// 	result = {
		// 		coord: { lon: 13.4105, lat: 52.5244 },
		// 		weather: [
		// 			{
		// 				id: 803,
		// 				main: "Clouds",
		// 				description: "broken clouds",
		// 				icon: "04d",
		// 			},
		// 		],
		// 		base: "stations",
		// 		main: {
		// 			temp: 22.35,
		// 			feels_like: 21.76,
		// 			temp_min: 22.35,
		// 			temp_max: 22.35,
		// 			pressure: 1023,
		// 			humidity: 43,
		// 			sea_level: 1023,
		// 			grnd_level: 1018,
		// 		},
		// 		visibility: 10000,
		// 		wind: { speed: 4.4, deg: 308, gust: 5.3 },
		// 		clouds: { all: 78 },
		// 		dt: 1745937571,
		// 		sys: { country: "DE", sunrise: 1745897919, sunset: 1745951311 },
		// 		timezone: 7200,
		// 		id: 2950159,
		// 		name: "Berlin",
		// 		cod: 200,
		// 	};
		// } else {
		// 	result = null; //API Results;
		// }

		if (result.name) {
			//if result is
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

	const subscribeUser = async () => {
		console.log(userData);

		if (userData.name && userData.city && userData.email) {
			//API Call to add user to subscription list.
			console.log("User Added: ", userData);
			var url = `http://localhost:8080/addname/`;

			var result = await fetch(url, {
				method: "POST",
				body: JSON.stringify(userData),
			});
			if (!result.ok) {
				throw new Error(`Response status: ${result.status}`);
			}
			result = await result.json();
			console.log(result);

			formSuccess.classList.remove("hidden");
			formError.classList.add("hidden");

			userData.name = null;
			userData.email = null;
			userData.city = null;
			document.getElementById("name").value = "";
			document.getElementById("email").value = "";
			document.getElementById("notifCity").value = "";
		} else {
			formSuccess.classList.add("hidden");
			formError.classList.remove("hidden");
		}
	};

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
					<Search
						getWeather={getWeather}
						hideInitial={hideInitial}
						city={city}
						setCity={setCity}
					/>
					<Notification
						userData={userData}
						setUserData={setUserData}
						subscribeUser={subscribeUser}
					/>
				</div>

				<footer className="mt-8 text-center text-blue-100 text-sm">
					<p>
						© 2025 Go Weather App{" "}
						{/* <span className="opacity-70">Demo Version</span> */}
					</p>
				</footer>
			</div>
		</>
	);
}

export default App;
