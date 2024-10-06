// require('dotenv').config();

// if (!process.env.API_KEY) {
//     console.error("API_KEY is not set in the environment variables.");
//     alert("API_KEY is not set in the environment variables.");
// }

const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".locationNotFound");
const weatherBody = document.querySelector(".weather-body");

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


async function checkWeather(city) {
    const API_KEY = "47d22b0265e7638da98ba6baed80f03b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const weatherData = await fetch(`${url}`).then(response => response.json());
    
    // console.log(weatherData);
    if(weatherData.cod === `404`) {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        weatherImg.src = "images/4042.png";

        console.log("Error, place not found or invalid.")
        return;
    }
    else {
        weatherBody.style.display = "flex";
        locationNotFound.style.display = "none";

    }
    // locationNotFound.style.display = "none";
    // weatherBody.style.display = "flex";


    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}<sup>ºC</sup>`; 
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;        

    switch(weatherData.weather[0].main)
    {
        case 'Clouds':
            weatherImg.src = "images/cloud2.png";
            break;
        case 'Clear':
            weatherImg.src = "images/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "images/rain2.png";
            break;
        case 'Mist':
            weatherImg.src = "images/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "images/snow.png";
            break;
    }

    console.log(weatherData);
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
})

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
    checkWeather(inputBox.value);
    }
});