import { useQuery } from "@tanstack/react-query";
import getWeather from "../api/weather";

function useWeather(lat, lon) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat, lon),
    enabled: !!lat && !!lon,
  });
}

export default useWeather;
