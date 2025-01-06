// Fetch data function
async function fetchData() {
    try {
        let response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-37.814&longitude=144.9633&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,weather_code,visibility,relative_humidity_900hPa&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum&timezone=Australia%2FSydney');
        let data = await response.json();

        console.log(data);

        let hourly_temperature = data.hourly.map((time, index) => ({
            time: time,
            currentTemperature: data.hourly.temperature_2m[index],
            unit: item.current_units.temperature_2m
        }));
        createHourlyTemperatureCards(hourly_temperature);
    } catch (error) {
        console.log('Error fetching data: ', error);
    }
}

// Create hourly temperature cards
function createHourlyTemperatureCards(hourly_temperature) {
    let card_container = document.querySelector('.details-perhour');
    hourly_temperature.forEach((item) => {
        let hourlycard = document.createElement('div');
        hourlycard.classList.add('hourly-card');
        hourlycard.innerHTML = `
        <p>${item.time}</p>
        <p>${item.temperature} ${item.unit}</p>
        `;
        card_container.appendChild(hourlycard);
    });
}

fetchData();