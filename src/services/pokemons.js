import axios from "axios";
export const getAllPokemons = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
