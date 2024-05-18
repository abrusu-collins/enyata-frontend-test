import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
function Home() {
  const navigate = useNavigate();
  const setPokemonName = useStore((state) => state.setPokemonName);
  const pokemonName = useStore((state) => state.pokemonName);
  const theme = useStore((state) => state.theme);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const openTheSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const searchPokemon = (e) => {
    e.preventDefault();
    if (!pokemonName) {
      console.log("no name");
      openTheSnackBar();
      return;
    }
    navigate("/all-pokemons");
  };
  useEffect(() => {
    setPokemonName("");
  }, []);
  return (
    <div className="home">
      <img src="/images/pokemons.svg" alt="" />
      <p className="title">
        Poké<span style={{ color: theme }}>book</span>
      </p>
      <p className="text">
        Largest Pokémon index with information <br /> about every Pokemon you
        can think of.
      </p>

      <div
        className="search_container"
        style={{ border: `10px solid ${theme}` }}
      >
        <input
          type="text"
          placeholder="Enter pokemon name"
          onChange={(e) => {
            setPokemonName(e.currentTarget.value);
          }}
        />
        <a href=" " onClick={searchPokemon} style={{ backgroundColor: theme }}>
          <GoSearch color="#fcfeff" size={20} />
        </a>
      </div>

      <a href="/all-pokemons">View all</a>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please enter pokemon name
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
