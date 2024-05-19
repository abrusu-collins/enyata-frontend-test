import { FastAverageColor } from "fast-average-color";
export const getAbundantColor = async (pokemonId, callback) => {
  const fac = new FastAverageColor();
  const img = document.createElement("IMG");
  img.crossOrigin = "Anonymous";
  img.setAttribute(
    "src",
    `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`
  );
  fac
    .getColorAsync(img)
    .then((color) => {
      const topRGBtempArray = [];
      const bottomRGBtempArray = [];
      let topRGB;
      let bottomRGB;
      const rgb = color.value.splice(0, 3);

      for (let i of rgb) {
        topRGBtempArray.push(i + 29.9);
      }
      for (let i of rgb) {
        bottomRGBtempArray.push(i - 29.9);
      }
      topRGB = `rgb(${topRGBtempArray.join(",")})`;
      bottomRGB = `rgb(${bottomRGBtempArray.join(",")})`;
      callback({ topRGB, bottomRGB });
    })
    .catch((e) => {
      console.log(e);
    });
};
