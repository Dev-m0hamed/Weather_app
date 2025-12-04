import { useQuery } from "@tanstack/react-query";
import geocoding from "../api/geocoding";

function useSearch(name: string) {
  return useQuery({
    queryKey: ["city", name],
    queryFn: () => geocoding(name),
    enabled: !!name,
  });
}

export default useSearch;
