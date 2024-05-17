import axios from "axios";
export const getAllPokemons = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSinglePokemon = async (name) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
