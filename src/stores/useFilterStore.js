import { create } from "zustand";

const useFilterStore = create(set => ({
  year: "",
  isMovie: true,
  isSeries: false,
  setYear: year => set({ year }),
  toggleIsMovie: () => set(state => ({ isMovie: !state.isMovie })),
  toggleIsSeries: () => set(state => ({ isSeries: !state.isSeries })),
}));

export default useFilterStore;
