import useUnitsStore from "../store/useUnitsStore";
import { toF, kmhToMph, mmToInch } from "../utils/convert";

function WeatherCard({ data, isLoading }) {
  const { units } = useUnitsStore();
  const current = [
    {
      title: "Feels Like",
      value:
        units.windTemp === "C"
          ? `${Math.round(data?.current.temperature_2m)}°`
          : `${toF(data?.current.temperature_2m)}°`,
    },
    { title: "Humidity", value: `${data?.current.relative_humidity_2m}%` },
    {
      title: "Wind",
      value:
        units.windSpeed === "kmh"
          ? `${Math.round(data?.current.wind_speed_10m)} km/h`
          : `${Math.round(kmhToMph(data?.current.wind_speed_10m))} mph`,
    },
    {
      title: "Precipitation",
      value:
        units.precipitation === "mm"
          ? `${data?.hourly.precipitation[0]} mm`
          : `${mmToInch(data?.hourly.precipitation[0])} in`,
    },
  ];

  return (
    <>
      {current.map((item) => (
        <div
          key={item.title}
          className={`flex flex-col gap-6 p-5 rounded-xl bg-neutral-800 border border-neutral-600 ${
            isLoading && "animate-pulse"
          }`}
        >
          <span className="text-neutral-200 text-[18px] font-medium leading-[120%]">
            {item.title}
          </span>
          <span className="text-neutral-0 text-[32px] font-light leading-[100%]">
            {isLoading || !data ? "_" : item.value}
          </span>
        </div>
      ))}
    </>
  );
}

export default WeatherCard;
