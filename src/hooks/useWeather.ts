import { useQuery } from "@tanstack/react-query";
import getWeather from "../api/weather";

function useWeather(lat: number | undefined, lon: number | undefined) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat, lon),
    staleTime: 5 * 60 * 1000,
    enabled: !!lat && !!lon,
  });
}

export default useWeather;
