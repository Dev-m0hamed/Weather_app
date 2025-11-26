import { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather";
import getLocation from "../utils/getLocation";
import useSearchStore from "../store/useSearchStore";
import { getWeatherIcon, getWeatherDescription } from "../utils/weatherIcons";

function CurrentWeather() {
  const [location, setLocation] = useState(null);
  const { data: searchData, isError: searchError } = useSearchStore();

  useEffect(() => {
    getLocation((pos) => setLocation(pos));
  }, []);

  const coords = searchData
    ? { lat: searchData.latitude, lon: searchData.longitude }
    : location || { lat: 30.06263, lon: 31.24967 };

  const { data } = useWeather(coords.lat, coords.lon);

  const formattedDate = data?.current?.time
    ? new Date(data.current.time).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return searchError ? (
    <h2 className="font-bold text-[28px] leading-[120%] text-neutral-0 mx-auto">
      No search result found!
    </h2>
  ) : (
    <section className="flex flex-col gap-5 lg:gap-8">
      <article className="flex flex-col items-center justify-center gap-4 w-full h-[286px] bg-cover bg-center rounded-[20px] current md:flex-row md:justify-between md:px-6">
        <div className="flex flex-col items-center gap-3 text-neutral-0">
          <h2 className="font-bold text-[28px] leading-[120%]">
            {`${data?.name}, ${data?.country}`}
          </h2>
          <time
            className="opacity-80 font-medium text-[18px] leading-[120%]"
            dateTime={data?.current?.time}
          >
            {formattedDate}
          </time>
        </div>
        <div className="flex items-center gap-5">
          <img
            src={getWeatherIcon(data?.current.weather_code)}
            alt={getWeatherDescription(data?.current.weather_code)}
            className="size-[120px]"
          />
          <span className="text-neutral-0 text-[96px] font-semibold italic leading-[100%] tracking-[-2%]">
            {Math.round(data?.current?.temperature_2m)}°
          </span>
        </div>
      </article>
      <article className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-1 md:gap-5 lg:gap-6">
        <div className="flex flex-col gap-6 p-5 rounded-xl bg-neutral-800 border border-neutral-600">
          <span className="text-neutral-200 text-[18px] font-medium leading-[120%]">
            Feels Like
          </span>
          <span className="text-neutral-0 text-[32px] font-light leading-[100%]">
            {Math.round(data?.current?.temperature_2m)}°
          </span>
        </div>
        <div className="flex flex-col gap-6 p-5 rounded-xl bg-neutral-800 border border-neutral-600">
          <span className="text-neutral-200 text-[18px] font-medium leading-[120%]">
            Humidity
          </span>
          <span className="text-neutral-0 text-[32px] font-light leading-[100%]">
            {data?.current.relative_humidity_2m}%
          </span>
        </div>
        <div className="flex flex-col gap-6 p-5 rounded-xl bg-neutral-800 border border-neutral-600">
          <span className="text-neutral-200 text-[18px] font-medium leading-[120%]">
            Wind
          </span>
          <span className="text-neutral-0 text-[32px] font-light leading-[100%]">
            {data?.current.wind_speed_10m} km/h
          </span>
        </div>
        <div className="flex flex-col gap-6 p-5 rounded-xl bg-neutral-800 border border-neutral-600">
          <span className="text-neutral-200 text-[18px] font-medium leading-[120%]">
            Precipitation
          </span>
          <span className="text-neutral-0 text-[32px] font-light leading-[100%]">
            {data?.hourly.precipitation[0]} mm
          </span>
        </div>
      </article>
    </section>
  );
}

export default CurrentWeather;
