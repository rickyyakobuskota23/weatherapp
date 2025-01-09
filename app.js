async function getWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-37.814&longitude=144.9633&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,weather_code,visibility,relative_humidity_900hPa&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum&timezone=Australia%2FSydney";
    const response = await fetch(url);
    const data = await response.json();

    // Change weather info

    // UV Index
    const UVIndex = document.querySelector('.uvindex-value');
    const UVIndexDesc = document.querySelector('.uvindex-desc');
    const UVIndexNotes = document.querySelector(".uvindex-notes");

    // Sunset
    const SunsetTime = document.querySelector(".sunset-time");
    const SunsetTimeRemaining = document.querySelector(".sunset-time-remaining");
    const SunriseTimeNotes = document.querySelector(".sunrise-time-notes");

    // Details Wind
    const WindSpeed = document.querySelector(".wind-speed");
}

getWeather();