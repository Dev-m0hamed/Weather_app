export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

interface Data {
  results: City[];
}

async function searchCity(name: string) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`
  );
  const data: Data = await res.json();
  return data.results?.[0];
}

export default searchCity;
