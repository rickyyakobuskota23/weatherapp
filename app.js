async function getWeather(cityName) {
    async function getCoordinates(cityName) {
        const geocodeurl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`;
        const responsegeo = await fetch(geocodeurl);
        const datageo = await responsegeo.json();
        const { latitude, longitude } = datageo.results[0];
        return { latitude, longitude };
    }
    const { latitude, longitude } = await getCoordinates(cityName);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,weather_code,visibility,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum&timezone=Australia%2FSydney`;
    const response = await fetch(url);
    const data = await response.json();

    // Change weather info

    //
    const CityName = document.querySelector(".card-subtitle");
    const CurrentTemperature = document.querySelector(".card-title");
    const CurrentCondition = document.querySelector(".card-weather");
    const HighTemperature = document.querySelector(".highest-temperature");
    const LowTemperature = document.querySelector(".lowest-temperature");
    const currentCode = data.current.weather_code;
    const currentDay = data.current.is_day === 0 ? "night" : "day";

    CityName.innerHTML = cityName;

    console.log(cityName);


    // UV Index
    const UVIndex = document.querySelector('.uvindex-value');
    const UVIndexDesc = document.querySelector('.uvindex-desc');
    const UVIndexNotes = document.querySelector(".uvindex-notes");
    const UVIndexDot = document.querySelector(".uvindex-dot");
    const UVIndexBar = document.querySelector(".uvindex");

    let uvIndex = Math.round(data.daily.uv_index_max[0]);

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

    const CurrentSunsetTime = data.daily.sunset[0];

    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strTime = hours + ' ' + ampm;
        return strTime;
    }

    SunsetTime.innerHTML = formatTime(CurrentSunsetTime);

    // Wind
    const WindSpeed = document.querySelector(".wind-speed");
    const WindNotes = document.querySelector(".wind-notes");

    function windDirection(degree) {
        const winddirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const windindex = Math.round(degree / 45) % 8;

        WindNotes.innerHTML = `Gust: ${data.current.wind_gusts_10m} ${data.current_units.wind_gusts_10m} ${winddirections[windindex]}`;
    }
    windDirection(data.current.wind_direction_10m);

    WindSpeed.innerHTML = data.current.wind_speed_10m;

    // Percipitation
    const PercipitationValue = document.querySelector(".percipitation-value");
    const PercipitationDesc = document.querySelector(".percipitation-desc")
    const PercipitationNotes = document.querySelector(".percipitation-notes");

    let precipitationCurrent = Math.round(data.daily.precipitation_sum[0]);

    PercipitationValue.innerHTML = precipitationCurrent;
    PercipitationDesc.innerHTML = precipitationGuide[precipitationCurrent].description;
    PercipitationNotes.innerHTML = precipitationGuide[precipitationCurrent].notes;

    // Visibility
    const VisibilityValue = document.querySelector(".visibility");
    const VisibilityNotes = document.querySelector(".visibility-notes");
    const VisibilityDesc = document.querySelector(".visibility-desc");

    visibilityCurrent = Math.round(data.hourly.visibility[0] / 1000);

    VisibilityValue.innerHTML = `${visibilityCurrent} KM`;

    function VisibilityNote() {
        let visiblenotes = '';
        let visibledesc = '';
        if (visibilityCurrent >= 10) {
            visiblenotes = visibilityGuide[10].notes;
            visibledesc = visibilityGuide[10].description;
        } else if (visibilityCurrent >= 8) {
            visiblenotes = visibilityGuide[8].notes;
            visibledesc = visibilityGuide[8].description;
        } else if (visibilityCurrent >= 5) {
            visiblenotes = visibilityGuide[5].notes;
            visibledesc = visibilityGuide[5].description;
        } else if (visibilityCurrent >= 2) {
            visiblenotes = visibilityGuide[2].notes;
            visibledesc = visibilityGuide[2].description;
        } else if (visibilityCurrent === 1) {
            visiblenotes = visibilityGuide[1].notes;
            visibledesc = visibilityGuide[1].description;
        } else if (visibilityCurrent >= 0.5) {
            visiblenotes = visibilityGuide[0.5].notes;
            visibledesc = visibilityGuide[0.5].description;
        } else if (visibilityCurrent >= 0.2) {
            visiblenotes = visibilityGuide[0.2].notes;
            visibledesc = visibilityGuide[0.2].description;
        } else if (visibilityCurrent === 0){
            visiblenotes = visibilityGuide[0].notes;
            visibledesc = visibilityGuide[0].description;
        } else {
            console.error(Error);
        }

        VisibilityNotes.innerHTML = visiblenotes;
        VisibilityDesc.innerHTML = visibledesc;
    }

    VisibilityNote();

    // Humidity
    const HumidityValue = document.querySelector(".humidity");
    const HumidityNotes = document.querySelector(".humidity-notes");

    HumidityValue.innerHTML = `${data.hourly.relative_humidity_2m[0]}${data.hourly_units.relative_humidity_2m}`;
    HumidityNotes.innerHTML = `The dew point is ${Math.round(data.hourly.dew_point_2m[0])}${data.hourly_units.dew_point_2m} right now.`;

    // Feels Like
    const FeelslikeValue = document.querySelector(".feels_like");
    const FeelslikeNotes = document.querySelector(".feels_like-notes");

    FeelslikeValue.innerHTML = `${Math.round(data.current.apparent_temperature)}${data.current_units.apparent_temperature}`;

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

document.getElementById('search-button').addEventListener('click', async () => {
    const cityName = document.getElementById('query').value;
    getWeather(cityName);
})

getWeather("Sidney");