function getLocation(callback) {
  navigator.geolocation.getCurrentPosition(
    (p) => {
      callback({
        lat: p.coords.latitude,
        lon: p.coords.longitude,
      });
    },
    () => {
      callback({
        lat: 30.06263,
        lon: 31.24967,
      });
    }
  );
}

export default getLocation;
