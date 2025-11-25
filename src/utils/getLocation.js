function getLocation(callback) {
  navigator.geolocation.getCurrentPosition(
    (p) => {
      callback({
        lat: p.coords.latitude,
        lon: p.coords.longitude,
      });
    },
  );
}

export default getLocation;
