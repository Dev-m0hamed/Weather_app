import useUnitsStore from "../../store/useUnitsStore";
import WeatherCard from "./WeatherCard";
import {
  getWeatherIcon,
  getWeatherDescription,
} from "../../utils/weatherIcons";
import { toF } from "../../utils/convert";

function CurrentWeather({ data, isLoading, searchError }) {
  const { units } = useUnitsStore();

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
      <article
        className={`flex flex-col items-center justify-center gap-4 w-full h-[286px] bg-cover bg-center rounded-[20px] md:flex-row md:justify-between md:px-6 ${
          isLoading || !data ? "bg-neutral-800" : "current"
        }`}
      >
        {isLoading || !data ? (
          <div className="flex flex-col items-center gap-4 m-auto">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-neutral-0 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-neutral-0 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-3 h-3 bg-neutral-0 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            <span className="font-medium leading-[120%] text-[18px] text-neutral-200 m-auto">
              Loading...
            </span>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-3 text-neutral-0">
              <h2 className="font-bold text-[28px] leading-[120%]">
                {`${data?.name ? data?.name : data?.country}, ${data?.country}`}
              </h2>
              <time
                className="opacity-80 font-medium text-[18px] leading-[120%]"
                dateTime={data?.current.time}
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
                {units.windTemp === "C"
                  ? `${Math.round(data?.current.temperature_2m)}°`
                  : `${toF(data?.current.temperature_2m)}°`}
              </span>
            </div>
          </>
        )}
      </article>
      <article className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-1 md:gap-5 lg:gap-6">
        <WeatherCard data={data} isLoading={isLoading} />
      </article>
    </section>
  );
}

export default CurrentWeather;
