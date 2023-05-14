// Vídeo aula: https://www.youtube.com/watch?v=VS8EBgPwsSU

// Variáveis de seleção de elementos
const apiKey             = "TOKEN_WEATHER_API";
const apiCountryURL      = "https://flagsapi.com/"; // Coloca no final exemplo: BR/flat/64.png"
const cityInput          = document.querySelector("#city-input");
const searchBtn          = document.querySelector("#search");
const cityElement        = document.querySelector("#city");
const tempElement        = document.querySelector("#temperature span");
const descElement        = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement     = document.querySelector("#country");
const humidityElement    = document.querySelector("#humidity span");
const windElement        = document.querySelector("#wind span");

const weatherContainer   = document.querySelector("#weather-data");
const notFount           = document.querySelector("#not-found");

// Funções
// showWeatherData espera como parâmetro o nome de uma cidade.
const showWeatherData = async (city) => {

    if (cityInput.value === '') {
        return;
    };

    showLoading();
    try {
        const data = await getWeatherData(city);

        if (data.cod === "404") {
            notFount.classList.remove("hide");
            setTimeout(()=> notFount.classList.add("hide"), 2000);
            weatherContainer.classList.add("hide");
        }
        else{
            // Exemplo: data.name (name é uma propriedade do objeto data)
            cityElement.innerText = data.name;
            tempElement.innerText = parseInt(data.main.temp)-273; // -273 para converter para celsius. 
            descElement.innerText = data.weather[0].description;
            // setAttribute esta mudando o src da imagem
            weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            humidityElement.innerText = `${data.main.humidity}%`;
            windElement.innerText = `${data.wind.speed}km/h`;
            countryElement.setAttribute("src", apiCountryURL + data.sys.country + '/flat/64.png');
        
            weatherContainer.classList.remove("hide");
        }
        hideLoading();
    } catch (error) {
        hideLoading();
    };
};

const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${apiKey}&lang=pt_br`;

    // Receber os dados da API
    const res = await fetch(apiWeatherURL);

    // Transforma para json.
    const data = await res.json();

    // Retorna os dados
    return data;
};


// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Pegar o valor do input da cidade
    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        
        showWeatherData(city);
    };
});