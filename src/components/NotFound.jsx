import React from "react";
import useStore from "../store/store";

function NotFound() {
  const theme = useStore((state) => state.theme);
  return (
    <div className="not_found">
      <div>
        <img src="/images/404.jpg" alt="" />
        <p>
          Looks like the page you <br /> are looking for does not exist
        </p>
        <div>
          <a href="/" style={{ background: theme }}>
            Go Home
          </a>
          <a href="/all-pokemons" style={{ background: theme }}>
            View All
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
