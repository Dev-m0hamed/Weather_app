import { create } from "zustand";

const metric = { windTemp: "C", windSpeed: "kmh", precipitation: "mm" };

const useUnitsStore = create((set) => ({
  units: JSON.parse(localStorage.getItem("units")) || metric,
  setUnits: (units) => {
    set({ units });
    localStorage.setItem("units", JSON.stringify(units));
  },
}));

export default useUnitsStore;
