import { create } from "zustand";

const useSearchStore = create((set) => ({
  data: undefined,
  isError: false,
  setData: ({ data, isError }) => set({ data, isError }),
}));

export default useSearchStore;
