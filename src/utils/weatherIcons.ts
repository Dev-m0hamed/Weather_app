import sunnyIcon from "../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconCloudy from "../assets/images/icon-overcast.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  95: "Thunderstorm",
  99: "Severe thunderstorm",
};

export const getWeatherIcon = (code: number) => {
  if (code === 0 || code === 1) return sunnyIcon;
  if (code === 2) return iconPartlyCloudy;
  if (code === 3) return iconCloudy;
  if (code === 45 || code === 48) return iconFog;
  if (code >= 51 && code <= 57) return iconDrizzle;
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return iconRain;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return iconSnow;
  if (code >= 95 && code <= 99) return iconStorm;
  return sunnyIcon;
};

export const getWeatherDescription = (code: number) => {
  return weatherDescriptions[code as keyof typeof weatherDescriptions] || "Unknown";
};