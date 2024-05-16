import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { getAllPokemons } from "../services/pokemons";
import { IoEyeSharp } from "react-icons/io5";
function AllPokemons() {
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pokemonTotalCount, setPokemonTotalCount] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(null);
  const fetchAllPokemons = async () => {
    getAllPokemons().then((res) => {
      console.log(res);
      setPokemonData(res.results);
    });
  };
  useEffect(() => {
    fetchAllPokemons();
  }, []);
  return (
    <div className="all_pokemons">
      <div className="navbar">
        <div className="logo_container">
          <img src="/images/pokemons.svg" alt="" />
          <p>
            Poke<span>book</span>
          </p>
        </div>

        <div className="search">
          <GoSearch size={30} color="#dfdfdf" />
          <input type="text" name="" id="" placeholder="Enter pokemon name" />
        </div>

        <div className="theme_selector">
          <a href=""></a>
        </div>
      </div>
      <div className="pokemon_list">
        {pokemonData.length > 0 &&
          pokemonData.map((pokemon, index) => {
            return (
              <div
                key={`${pokemon.name}+${index}`}
                onMouseEnter={() => {
                  setPokemonIndex(index);
                }}
                onMouseLeave={() => {
                  setPokemonIndex(null);
                }}
              >
                <div className="pokemon_img_container">
                  <img
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                      index + 1
                    }.svg`}
                    alt=""
                  />
                </div>
                <p className="pokemon_name">{pokemon.name}</p>
                {pokemonIndex === index && (
                  <a href="">
                    <p>View Pokemon</p>
                    <IoEyeSharp size={25} />
                  </a>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllPokemons;
