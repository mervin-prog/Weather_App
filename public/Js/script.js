
//client-side

const container =document.querySelector(".container");
const search =document.querySelector(".search-box button");
const weatherBox =document.querySelector(".weather-box");
const weatherDetails =document.querySelector(".weather-details");
const errorFound =document.querySelector(".not-found");


async function getWeather(city){
    try{
        const res = await fetch(`/weather?city=${city}`);
        const data=await res.json();
        console.log(data);

        if (data.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            errorFound.style.display = 'block';
            errorFound.classList.add('fadeIn');
            return;
        }

        errorFound.style.display = 'none';
        errorFound.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (data.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;

            default:
                image.src = '';
        }
        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '600px';
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
search.addEventListener("click", ()=>{
    
    const city=document.querySelector(".search-box input").value;

    if(city==="")
    return;

    getWeather(city);
});