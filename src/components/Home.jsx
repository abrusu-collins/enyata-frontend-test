import React from "react";
import { GoSearch } from "react-icons/go";
function Home() {
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
        <input type="text" placeholder="Enter pokemon name" />
        <a href="">
          <GoSearch color="#fcfeff" size={20} />
        </a>
      </div>

      <a href="">View all</a>
    </div>
  );
}

export default Home;
