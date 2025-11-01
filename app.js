
const form = document.getElementById("weatherForm");
const input = document.getElementById("location");

function getWeatherIcon(code) {
  if (code === 0) return "fa-sun"; // Clear sky
  if (code === 1 || code === 2) return "fa-cloud-sun"; // Partly cloudy
  if (code === 3) return "fa-cloud"; // Overcast
  if (code >= 45 && code <= 48) return "fa-smog"; // Fog
  if (code >= 51 && code <= 55) return "fa-cloud-rain"; // Drizzle
  if (code >= 61 && code <= 65) return "fa-cloud-showers-heavy"; // Rain
  if (code >= 71 && code <= 75) return "fa-snowflake"; // Snow
  if (code >= 95 && code <= 99) return "fa-cloud-bolt"; // Thunderstorm
  return "fa-question"; // Unknown
}
const updateIcon = (code) => {
    const iconClass = getWeatherIcon(code);
    const weatherIcon = document.getElementById("weather-icon");
weatherIcon.className = `fa-solid ${iconClass}`;

}

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  const city = input.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  // Call weather function
  await getWeatherByCity(city);
//   console.log(city);
});

const updateTemp = (a) =>{
    const tempe = document.querySelector(".data p");
    tempe.innerHTML = `${a} <sup>o</sup>`;
}
const updateWin = (a) =>{
    const win = document.querySelector(".wind p");
    win.innerHTML = `${a} Km/Hr`;
}


async function getCityLatLon(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }
  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude
  };
}
async function getWeatherByCity(city) {
   {
    const { latitude, longitude } = await getCityLatLon(city);
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const res = await fetch(weatherUrl);
    const weatherData = await res.json();

    // console.log(`Weather in ${city}:`, weatherData.current_weather);

    const alldata = weatherData.current_weather;
    const code = alldata.weathercode;
     const temp = alldata.temperature;
    const windSpeed = alldata.windspeed;
    updateTemp(temp);
    updateWin(windSpeed);
    updateIcon(code);
    
  }}


