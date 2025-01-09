async function getWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-37.814&longitude=144.9633&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,weather_code,visibility,relative_humidity_900hPa&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum&timezone=Australia%2FSydney";
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Change weather info

    // UV Index
    const UVIndex = document.querySelector('.uvindex-value');
    const UVIndexDesc = document.querySelector('.uvindex-desc');
    const UVIndexNotes = document.querySelector(".uvindex-notes");
    const UVIndexDot = document.querySelector(".uvindex-dot");
    const UVIndexBar = document.querySelector(".uvindex");

    let uvIndex = Math.round(data.daily.uv_index_max[1]);

    UVIndex.innerHTML = uvIndex; // buat supaya defaultnya today
    UVIndexDesc.innerHTML = uvIndexInfo[uvIndex].description;
    UVIndexNotes.innerHTML = uvIndexInfo[uvIndex].notes;

    function moveUVIndexDot(uvIndex) {
        const maxUvIndex = 11;
        const percentage = (uvIndex / maxUvIndex) * 100;
        UVIndexDot.style.left = `${percentage}%`;
    }
    moveUVIndexDot(uvIndex);

    // Sunset
    const SunsetTime = document.querySelector(".sunset-time");
    const SunsetTimeRemaining = document.querySelector(".sunset-time-remaining");
    const SunriseTimeNotes = document.querySelector(".sunrise-time-notes");

    // Wind
    const WindSpeed = document.querySelector(".wind-speed");
    const WindNotes = document.querySelector(".wind-notes");

    // Percipitation
    const PercipitationValue = document.querySelector(".percipitation-value");
    const PercipitationDesc = document.querySelector(".percipitation-desc");
    const PercipitationNotes = document.querySelector(".percipitation-notes");

    // Visibility
    const VisibilityValue = document.querySelector(".visibility");
    const VisibilityNotes = document.querySelector(".visibility-notes");

    // Humidity
    const HumidityValue = document.querySelector(".humidity");
    const HumidityNotes = document.querySelector(".humidity-notes");

    // Feels Like
    const FeelslikeValue = document.querySelector(".feels_like");
    const FeelslikeNotes = document.querySelector(".feels_like-notes");

    // Daylight Duration
    const DaylightDuration = document.querySelector(".daylight-duration");
    const DaylightNotes = document.querySelector(".daylight-notes");

    // Pressure
    const PressureValue = document.querySelector(".pressure");
    const PressureNotes = document.querySelector(".pressure-notes");

    // Average
    const AverageValue = document.querySelector(".average-value");
    const AverageDesc = document.querySelector(".average-desc");
    const AverageNotes1 = document.querySelector(".today-averages-notes-value1");
    const AverageNotes2 = document.querySelector(".today-averages-notes-value2");
}

getWeather();