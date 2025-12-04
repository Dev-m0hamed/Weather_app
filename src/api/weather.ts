interface GeoData {
  address: {
    city: string;
    country: string;
  };
}

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface Data extends WeatherData {
  name: string;
  country: string;
};

async function getWeather(lat: number | undefined, lon: number | undefined): Promise<Data> {
  const geo = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const geoData: GeoData = await geo.json();

  const weather = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  const weatherData: WeatherData = await weather.json();

  return {
    name: geoData.address.city,
    country: geoData.address.country,
    ...weatherData,
  };
}

export default getWeather;
