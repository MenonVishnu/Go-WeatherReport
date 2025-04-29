document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");
  const weatherError = document.getElementById("weatherError");
  const initialState = document.getElementById("initialState");
  const notificationForm = document.getElementById("notificationForm");
  const formSuccess = document.getElementById("formSuccess");

  // Weather search functionality
  searchBtn.addEventListener("click", function () {
    console.log("clicked");
    getWeather(cityInput.value);
  });

  cityInput.addEventListener("keypress", function (e) {
    console.log("clicked");
    if (e.key === "Enter") {
      getWeather(cityInput.value);
    }
  });

  function getWeather(city) {
    if (!city.trim()) return;

    // This is a demo that simulates API behavior
    // In a real app, you would call a weather API
    simulateWeatherAPI(city);
  }

  function simulateWeatherAPI(city) {
    // Hide initial state and error
    initialState.classList.add("hidden");
    weatherError.classList.add("hidden");

    // Simulate API call with timeout
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1 && city.length > 1) {
        displayWeather(city);
      } else {
        weatherResult.classList.add("hidden");
        weatherError.classList.remove("hidden");
      }
    }, 500);
  }

  function displayWeather(city) {
    // Get elements
    const cityNameEl = document.getElementById("cityName");
    const dateEl = document.getElementById("date");
    const temperatureEl = document.getElementById("temperature");
    const descriptionEl = document.getElementById("description");
    const feelsLikeEl = document.getElementById("feelsLike");
    const humidityEl = document.getElementById("humidity");
    const windEl = document.getElementById("wind");
    const pressureEl = document.getElementById("pressure");

    // Generate random weather data for demo
    const temp = Math.floor(Math.random() * 35) + 5; // 5 to 40°C
    const feelsLike = temp + (Math.random() > 0.5 ? 2 : -2);
    const humidity = Math.floor(Math.random() * 60) + 30; // 30% to 90%
    const wind = (Math.random() * 20).toFixed(1); // 0 to 20 km/h
    const pressure = Math.floor(Math.random() * 50) + 1000; // 1000 to 1050 hPa

    const descriptions = [
      "clear sky",
      "few clouds",
      "scattered clouds",
      "broken clouds",
      "shower rain",
      "rain",
      "thunderstorm",
      "snow",
      "mist",
    ];
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];

    // Format date
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = now.toLocaleDateString("en-US", options);

    // Update UI
    cityNameEl.textContent = city;
    dateEl.textContent = formattedDate;
    temperatureEl.textContent = `${temp}°C`;
    descriptionEl.textContent = description;
    feelsLikeEl.textContent = `${feelsLike.toFixed(1)}°C`;
    humidityEl.textContent = `${humidity}%`;
    windEl.textContent = `${wind} km/h`;
    pressureEl.textContent = `${pressure} hPa`;

    // Show weather result
    weatherResult.classList.remove("hidden");
  }

  // Notification form functionality
  notificationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("notifCity").value;

    // In a real app, you would send this data to a server
    console.log("Subscription data:", { name, email, city });

    // Show success message
    formSuccess.classList.remove("hidden");

    // Reset form
    notificationForm.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
      formSuccess.classList.add("hidden");
    }, 3000);
  });
});
