import { create } from "zustand";

const useStore = create((set) => ({
  pokemonName: "",
  setPokemonName: (pokemonName) =>
    set((state) => (state.pokemonName = pokemonName)),
}));

export default useStore;
