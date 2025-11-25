async function getWeather(lat, lon) {
  const geo = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const geoData = await geo.json();

  const weather = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  const weatherData = await weather.json();

  return {
    name: geoData.address.city,
    country: geoData.address.country,
    ...weatherData,
  };
}

export default getWeather;
