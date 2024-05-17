import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { getAllPokemons } from "../services/pokemons";
import { IoEyeSharp } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { GoChevronDown } from "react-icons/go";
import Popover from "@mui/material/Popover";
function AllPokemons() {
  const paginationSizes = [8, 12, 16, 24];
  const [displayCount, setDisplayCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pokemonTotalCount, setPokemonTotalCount] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(null);
  const [paginationSizeIndex, setPaginationIndex] = useState(0);

  const fetchAllPokemons = async () => {
    const tempArray = [];
    getAllPokemons().then((res) => {
      console.log(res);

      for (let i of res.results) {
        tempArray.push({ ...i, id: res.results.indexOf(i) + 1 });
      }
      setPokemonData(tempArray);
      setDisplayCount(paginationSizes[0]);
    });
  };
  useEffect(() => {
    fetchAllPokemons();
  }, []);
  const changeDisplayData = (displayCount) => {
    if (pokemonData.length > 0) {
      const tempArray = [...pokemonData];
      setDisplayData(tempArray.splice(0, displayCount));
    }
  };
  useEffect(() => {
    if (displayCount > 0) {
      changeDisplayData(displayCount);
    }
  }, [displayCount]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
        {displayData.length > 0 &&
          displayData.map((pokemon, index) => {
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
                <p>{pokemon.id}</p>
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

      <div className="pagination_and_page_size_selector">
        <div className="pagination">
          <Pagination
            count={10}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                fontFamily: "clashDisplay",
                color: "black",
                backgroundColor: "#e1e1e1",
                "&:hover": {
                  backgroundColor: "#e1e1e1",
                },
                "&.Mui-selected": {
                  backgroundColor: "#e85382",
                },
              },
            }}
          />
        </div>
        <div className="popover_and_selector">
          <button className="page_size_selector" onClick={handleClick}>
            <div className="number">{paginationSizes[paginationSizeIndex]}</div>
            <GoChevronDown size={20} />
          </button>
          <div className="sizes">
            {paginationSizes.map((paginationSize, index) => {
              return (
                <a
                  href=" "
                  key={`${index + paginationSize}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setPaginationIndex(index);
                    setDisplayCount(paginationSizes[index]);
                  }}
                >
                  {paginationSize}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPokemons;
