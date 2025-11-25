import { create } from "zustand";

const useSearchStore = create((set) => ({
  data: null,
  isError: false,
  setData: ({ data, isError }) => set({ data, isError }),
}));

export default useSearchStore;
