import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      pokemonName: "",
      theme: "#DE527F",
      setPokemonName: (pokemonName) =>
        set((state) => ({ ...state, pokemonName })),
      setTheme: (theme) => set((state) => ({ ...state, theme })),
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export default useStore;
