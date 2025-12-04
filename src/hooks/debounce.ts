export interface Results {
  id: number;
  name: string;
  country: string;
}

interface GeocodingResult {
  results: Results[];
}

let timer: number;
function debounce(value: string): Promise<Results[]> {
  clearTimeout(timer);
  return new Promise((resolve) => {
    timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en&format=json`
        );
        const data: GeocodingResult = await res.json();
        resolve(data.results || []);
      } catch {
        resolve([]);
      }
    }, 500);
  });
}

export default debounce;
