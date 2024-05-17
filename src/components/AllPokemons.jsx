import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { getAllPokemons } from "../services/pokemons";
import { IoEyeSharp } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { GoChevronDown } from "react-icons/go";
import Popover from "@mui/material/Popover";
function AllPokemons() {
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pokemonTotalCount, setPokemonTotalCount] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(null);
  const paginationSizes = [8, 12, 16, 24];
  const fetchAllPokemons = async () => {
    getAllPokemons().then((res) => {
      console.log(res);
      setPokemonData(res.results);
    });
  };
  useEffect(() => {
    fetchAllPokemons();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
            <div className="number">8</div>
            <GoChevronDown size={20} />
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="sizes">
              {paginationSizes.map((paginationSize, index) => {
                return (
                  <a href="" key={`${index + paginationSize}`}>
                    {paginationSize}
                  </a>
                );
              })}
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default AllPokemons;
