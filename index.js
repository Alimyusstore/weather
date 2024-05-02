//  WEATHER

const getWeather = document.querySelector(".getWeather");
const weatherInput = document.querySelector(".weatherInput");
const card = document.querySelector(".card");
const apiKey = "cdd5042cb9fce72343a8cf39f3aaefca";

getWeather.addEventListener("submit", async event => {
    event.preventDefault();
    const city = weatherInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            weatherinfo(weatherData);
        }
        catch(error){
            console.error(error);
            errorDisplay(error)
        }

    }
    else{
        return errorDisplay("Please Enter a City Name");
    }

});

async function getWeatherData(city){
    const getApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   
    const response = await fetch(getApi);
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();
}

function weatherinfo(data){
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityWeather = document.createElement("h1");
  const weatherDegree = document.createElement("p");
  const weatherHumidity = document.createElement("p");
  const descWeather = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityWeather.textContent = city;
  weatherDegree.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
  weatherHumidity.textContent = `humidity: ${humidity}%`;
  descWeather.textContent = description;
  weatherEmoji.textContent = weatherEmojiId(id);

  cityWeather.classList.add("cityWeather");
  weatherDegree.classList.add("weatherDegree"); 
  weatherHumidity.classList.add("weatherHumidity");
  descWeather.classList.add("descWeather");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityWeather);
  card.appendChild(weatherDegree);
  card.appendChild(weatherHumidity);
  card.appendChild(descWeather);
  card.appendChild(weatherEmoji);
}

function weatherEmojiId(weatherId){

    switch(true){
        case (weatherId  >= 200 && weatherId < 300 ):
        return "⛈️";
        case (weatherId  >= 300 && weatherId < 400 ):
        return "🌧️" ;
        case (weatherId  >= 400 && weatherId < 500 ):
        return "🌥️"
        case (weatherId  >= 500 && weatherId < 600 ):
        return "🌨️";
        case (weatherId  >= 600 && weatherId < 700 ):
        return "❄️";
        case (weatherId  >= 700 && weatherId < 800 ):
        return "🌦️";
        case (weatherId === 800 ):
        return "🌞";
        case (weatherId  >= 801 && weatherId < 810 ):
        return "☀️";
        default :
        return "❓";
    }
}

function errorDisplay(message){
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorDisplay");

    card.textContent = '';
    card.style.display = 'flex'
    card.appendChild(errorMessage);

}