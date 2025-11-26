import {
  getWeatherIcon,
  getWeatherDescription,
} from "../../utils/weatherIcons";
import useUnitsStore from "../../store/useUnitsStore";
import { toF } from "../../utils/convert";

function DailyForecast({ data }) {
  const { units } = useUnitsStore();
  const days = data?.daily?.time || Array(7).fill(null);

  return (
    <section className="grid gap-5">
      <h3 className="font-semibold text-[20px] text-neutral-0 leading-[120%]">
        Daily forecast
      </h3>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-7 md:grid-rows-1">
        {days.map((date, i) => {
          const formattedDate =
            data &&
            new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
            });
          return (
            <div
              key={date || i}
              className={`grid gap-4 py-4 px-2.5 rounded-xl bg-neutral-800 border border-neutral-600 text-center ${
                !data && "animate-pulse"
              }`}
            >
              <time
                className="font-medium text-[18px] text-neutral-0 leading-[120%]"
                dateTime={date || ""}
              >
                {formattedDate || ""}
              </time>
              {data ? (
                <img
                  src={getWeatherIcon(data?.daily.weather_code[i])}
                  alt={getWeatherDescription(data?.daily.weather_code[i])}
                  className="size-[60px] mx-auto"
                />
              ) : (
                <div className="size[60px] mx-auto bg-neutral-800 animate-pulse text-transparent">
                  _
                </div>
              )}
              <div className="flex items-center justify-between">
                <span
                  className={`font-medium text-[16px] text-neutral-0 leading-[120%] ${
                    !data && "text-transparent"
                  }`}
                >
                  {data
                    ? units.windTemp === "C"
                      ? `${Math.round(data?.daily.temperature_2m_max[i])}°`
                      : `${toF(data?.daily.temperature_2m_max[i])}°`
                    : "_"}
                </span>
                <span className="font-medium text-[16px] text-neutral-200 leading-[120%]">
                  {data
                    ? units.windTemp === "C"
                      ? `${Math.round(data?.daily.temperature_2m_min[i])}°`
                      : `${toF(data?.daily.temperature_2m_min[i])}°`
                    : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DailyForecast;
