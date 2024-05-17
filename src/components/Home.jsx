import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const setPokemonName = useStore((state) => state.setPokemonName);
  // const pokemonName = useStore((state) => state.pokemonName);
  const [name, setName] = useState("");
  const searchPokemon = (e) => {
    e.preventDefault();
    if (!name) {
      console.log("no name");
      return;
    }
    setPokemonName(name);
    navigate('/all-pokemons');
  };
  return (
    <div className="home">
      <img src="/images/pokemons.svg" alt="" />
      <p className="title">
        Poké<span>book</span>
      </p>
      <p className="text">
        Largest Pokémon index with information <br /> about every Pokemon you
        can think of.
      </p>

      <div className="search_container">
        <input
          type="text"
          placeholder="Enter pokemon name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <a href="" onClick={searchPokemon}>
          <GoSearch color="#fcfeff" size={20} />
        </a>
      </div>

      <a href="">View all</a>
    </div>
  );
}

export default Home;
