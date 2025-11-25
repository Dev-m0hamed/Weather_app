async function searchCity(name) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`
  );
  const data = await res.json();
  return data.results?.[0];
}

export default searchCity;