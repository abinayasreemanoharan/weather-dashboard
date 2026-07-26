const apiKey = "940481a1d4e8917d381d269ea8f85eb8";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        error.innerText = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        error.innerText = "";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.innerText = data.name + ", " + data.sys.country;

        temperature.innerText =
            Math.round(data.main.temp) + "°C";

        description.innerText =
            data.weather[0].description;

        humidity.innerText =
            data.main.humidity + "%";

        wind.innerText =
            data.wind.speed + " km/h";

    }

    catch(err){

        cityName.innerText = "No Data";
        temperature.innerText = "--°C";
        description.innerText = "--";
        humidity.innerText = "--";
        wind.innerText = "--";

        error.innerText = err.message;

    }

}
