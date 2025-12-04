import { create } from "zustand";
import type { City } from "../api/geocoding";

interface SearchStore {
  data: City | undefined;
  isError: boolean;
  setData: ({
    data,
    isError,
  }: {
    data: City | undefined;
    isError: boolean;
  }) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  data: undefined,
  isError: false,
  setData: ({ data, isError }) => set({ data, isError }),
}));

export default useSearchStore;
