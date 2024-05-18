import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { getAllPokemons } from "../services/pokemons";
import { IoEyeSharp } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { GoChevronDown } from "react-icons/go";
import { getSinglePokemon } from "../services/pokemons";
// import Popover from "@mui/material/Popover";
import Drawer from "@mui/material/Drawer";
function AllPokemons() {
  const [open, setOpen] = useState(false);
  const paginationSizes = [8, 12, 16, 24];
  const [displayCount, setDisplayCount] = useState(0);
  // const [offset, setOffset] = useState(0);
  const [singlePokemonData, setSinglePokemonData] = useState(null);
  const [currentPokemon, setcurrentPokemon] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(null);
  const [paginationSizeIndex, setPaginationIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [showPageSizeController, setShowPageSizeController] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const changeCurrentPokemon = (e, activePokemon) => {
    // console.log(activePokemon);
    e.preventDefault();
    setcurrentPokemon(activePokemon);
    // toggleDrawer(true);
    setOpen(true);
  };
  const fetchSinglePokemon = async (name) => {
    getSinglePokemon(name).then((res) => {
      console.log(res);
      setSinglePokemonData(res);
    });
  };

  useEffect(() => {
    if (currentPokemon) {
      fetchSinglePokemon(currentPokemon.name);
    }
  }, [currentPokemon]);
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
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleChange = (event, value) => {
    setPage(value);
    // console.log(value);
  };
  const changePage = (value) => {
    const tempArray = [...pokemonData];
    setDisplayData(
      tempArray.splice(value * displayCount - displayCount, displayCount)
    );
  };
  useEffect(() => {
    changePage(page);
  }, [page]);
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
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    alt=""
                  />
                </div>
                {/* <p>{pokemon.id}</p> */}
                <p className="pokemon_name">{pokemon.name}</p>
                {pokemonIndex === index && (
                  <a
                    href=" "
                    onClick={(e) => {
                      changeCurrentPokemon(e, {
                        name: pokemon.name,
                        id: pokemon.id,
                      });
                    }}
                  >
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
            count={Math.ceil(500 / displayCount)}
            onChange={handleChange}
            page={page}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                fontFamily: "clashDisplay",
                color: "black",
                backgroundColor: "#e1e1e1",
                padding: "20px",
                "&:hover": {
                  backgroundColor: "#e1e1e1",
                },
                "&.Mui-selected": {
                  backgroundColor: "#e85382",
                },
                "&.MuiPaginationItem-ellipsis": {
                  background: "transparent",
                },
              },
            }}
          />
        </div>
        <div
          className="popover_and_selector"
          onMouseEnter={() => {
            setShowPageSizeController(true);
          }}
          onMouseLeave={() => {
            setShowPageSizeController(false);
          }}
        >
          <button className="page_size_selector">
            <div className="number">{paginationSizes[paginationSizeIndex]}</div>
            <GoChevronDown size={20} />
          </button>
          {showPageSizeController && (
            <div className="sizes">
              {paginationSizes.map((paginationSize, index) => {
                return (
                  paginationSizeIndex !== index && (
                    <a
                      href=" "
                      key={`${index + paginationSize}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setPaginationIndex(index);
                        setDisplayCount(paginationSizes[index]);
                        setPage(1);
                      }}
                    >
                      {paginationSize}
                    </a>
                  )
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <div className="drawer_inner_container">
          <div>
            <div>back</div>
            {currentPokemon && (
              <img
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${currentPokemon.id}.svg`}
                alt=""
              />
            )}
          </div>
          {singlePokemonData && (
            <div>
              <p>{singlePokemonData.name}</p>

              <div className="types">
                {singlePokemonData.types.map((type, i) => {
                  return <p key={`${type.type.name}+${i}`}>{type.type.name}</p>;
                })}
              </div>

              <div className="about">
                <p>About</p>
                <div>
                  <p>Height</p>
                  <p>{singlePokemonData.height}</p>
                </div>
                <div>
                  <p>Weight</p>
                  <p>{singlePokemonData.weight}</p>
                </div>
                <div>
                  <p>Abilities</p>
                  <ul>
                    {singlePokemonData.abilities.map((ability, i) => {
                      return (
                        <li key={`${ability.ability.name}+${i}`}>
                          {ability.ability.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="stats">
                <p>Stats</p>

                <div>
                  {singlePokemonData.stats.map((stat, i) => {
                    return (
                      <div>
                        <p>{stat.stat.name}</p>
                        <div
                          style={{
                            background: "red",
                            width: "100%",
                            position: "relative",
                            height: "50px",
                          }}
                        >
                          <div
                            style={{
                              background: "green",
                              width: `${stat.base_stat}%`,
                              position: "absolute",
                              height: "50px",
                            }}
                          ></div>
                        </div>
                        <p>{stat.base_stat}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default AllPokemons;
