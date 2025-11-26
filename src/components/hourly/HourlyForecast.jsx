import { useState } from "react";
import {
  getWeatherIcon,
  getWeatherDescription,
} from "../../utils/weatherIcons";
import useUnitsStore from "../../store/useUnitsStore";
import { toF } from "../../utils/convert";

function HourlyForecast({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const { units } = useUnitsStore();

  const now = new Date();

  const upcomingHours = data?.hourly.time
    .map((time, i) => {
      const timeDate = new Date(time);
      if (timeDate >= now) {
        return {
          time: time,
          hour: timeDate.getHours(),
          temperature: data.hourly.temperature_2m[i],
          weatherCode: data.hourly.weather_code[i],
        };
      }
      return null;
    })
    .filter(Boolean)
    .slice(0, 24);

  const formatHour = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${period}`;
  };

  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const hours = upcomingHours || Array(8).fill(null);

  return (
    <section className="grid gap-4 pb-5  md:pb-6 rounded-[20px] bg-neutral-800 xl:h-full">
      <div className="flex justify-between items-center shrink-0 px-4 pt-5 md:p-6 md:pb-0">
        <h4 className="font-semibold text-[20px] leading-[120%] text-neutral-0">
          Hourly forecast
        </h4>
        <div
          className="flex gap-3 items-center px-4 py-2 rounded-lg bg-neutral-600 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-[16px] text-neutral-0">
            {dayName}
          </span>
          <svg
            className={`w-3 h-[18px] transition duration-300 ${
              isOpen && "scale-[-1]"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 13 8"
          >
            <path
              fill="#fff"
              d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
            />
          </svg>
        </div>
      </div>
      <div className="grid gap-4 overflow-y-auto h-[600px] px-4 md:px-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full">
        {hours?.map((hourDate, i) => (
          <div
            key={upcomingHours ? hourDate.time : i}
            className="flex items-center justify-between py-2.5 pl-3 pr-4 rounded-lg bg-neutral-700 border border-neutral-600"
          >
            <div className="flex items-center">
              {upcomingHours && (
                <img
                  src={getWeatherIcon(hourDate.weatherCode)}
                  alt={getWeatherDescription(hourDate.weatherCode)}
                  className="size-10"
                />
              )}
              <span className="text-[20px] font-medium leading-[120%] text-neutral-0">
                {upcomingHours ? formatHour(hourDate.hour) : ""}
              </span>
            </div>
            <span className="text-neutral-0 text-[16px] font-medium leading-[120%]">
              {upcomingHours
                ? units.windTemp === "C"
                  ? `${Math.round(hourDate.temperature)}°`
                  : `${toF(hourDate.temperature)}°`
                : ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;
