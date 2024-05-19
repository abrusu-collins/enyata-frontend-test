import axios from "axios";
export const getAllPokemons = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=500`);
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


export const getSimilarPokemons = async (type)=>{
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/type/${type}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}