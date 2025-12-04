import { create } from "zustand";

export interface Units {
  temp: "C" | "F";
  speed: "kmh" | "mph";
  precipitation: "mm" | "inch";
}

interface UnitsStore {
  units: Units;
  setUnits: (units: Units) => void;
}

const metric: Units = { temp: "C", speed: "kmh", precipitation: "mm" };
const getStoredUnits = (): Units => {
  try {
    const stored = localStorage.getItem("units");
    return stored ? JSON.parse(stored) : metric;
  } catch {
    return metric;
  }
};

const useUnitsStore = create<UnitsStore>((set) => ({
  units: getStoredUnits(),
  setUnits: (units: Units) => {
    set({ units });
    localStorage.setItem("units", JSON.stringify(units));
  },
}));

export default useUnitsStore;
