import {
  getWeatherIcon,
  getWeatherDescription,
} from "../../utils/weatherIcons";
import useUnitsStore from "../../store/useUnitsStore";
import { toF } from "../../utils/convert";

function DailyForecast({ data }) {
  const { units } = useUnitsStore();

  return (
    <section className="grid gap-5">
      <h3 className="font-semibold text-[20px] text-neutral-0 leading-[120%]">
        Daily forecast
      </h3>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-7 md:grid-rows-1">
        {data?.daily?.time?.map((date, i) => {
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
          });
          return (
            <div
              key={date}
              className="grid gap-4 py-4 px-2.5 rounded-xl bg-neutral-800 border border-neutral-600 text-center"
            >
              <time
                className="font-medium text-[18px] text-neutral-0 leading-[120%]"
                dateTime={date}
              >
                {formattedDate}
              </time>
              <img
                src={getWeatherIcon(data?.daily.weather_code[i])}
                alt={getWeatherDescription(data?.daily.weather_code[i])}
                className="size-[60px] mx-auto"
              />
              <div className="flex items-center justify-between">
                <span className="font-medium text-[16px] text-neutral-0 leading-[120%]">
                  {units.windTemp === "C"
                    ? `${Math.round(data?.daily.temperature_2m_max[i])}°`
                    : `${toF(data?.daily.temperature_2m_max[i])}°`}
                </span>
                <span className="font-medium text-[16px] text-neutral-200 leading-[120%]">
                  {units.windTemp === "C"
                    ? `${Math.round(data?.daily.temperature_2m_min[i])}°`
                    : `${toF(data?.daily.temperature_2m_min[i])}°`}
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
