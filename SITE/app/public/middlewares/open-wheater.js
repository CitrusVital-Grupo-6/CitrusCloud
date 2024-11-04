const apikey = "127c6e0558e970ff57acd2ace95a5298";
const apicountryURL = "https://flagsapi.com/flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const wheaterIconElement = document.querySelector("#wheater-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const wheaterContainer = document.querySelector("#wheater-data");

const getWeatherData = async (city) => {

    const apiWheaterURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`  

    const res = await fetch(apiWheaterURL)
    const data = await res.json()

    return data;

}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    countryElement.setAttribute("src", apicountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h `;
    wheaterContainer.classList.remove("hide");
    

}

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {

    if (e.code === "Enter") {
        
        const city = e.target.value

        showWeatherData(city);
    }
})
