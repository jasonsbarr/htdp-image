import { colorDb } from "./colorDb.js";

let colorLabs = [],
  colorRgbs = colorDb.colors;

for (var p in colorRgbs) {
  if (colorRgbs.hasOwnProperty(p)) {
    // NOTE(ben): Not flooring numbers here, since RGBtoLAB supports float values
    var lab = RGBtoLAB(
      colorRed(colorRgbs[p]),
      colorGreen(colorRgbs[p]),
      colorBlue(colorRgbs[p])
    );
    colorLabs.push({ name: p, l: lab.l, a: lab.a, b: lab.b });
  }
}

export const colorToSpokenString = (aColor, aStyle) => {
  if (aStyle.valueOf() === 0) {
    return " transparent ";
  }

  // NOTE(ben): Not flooring numbers here, since RGBtoLAB supports float values
  const lab1 = RGBtoLAB(
    colorRed(aColor),
    colorGreen(aColor),
    colorBlue(aColor)
  );
  let distances = colorLabs.map(function (lab2) {
    return {
      l: lab2.l,
      a: lab2.a,
      b: lab2.b,
      name: lab2.name,
      d: Math.sqrt(
        Math.pow(lab1.l - lab2.l, 2) +
          Math.pow(lab1.a - lab2.a, 2) +
          Math.pow(lab1.b - lab2.b, 2)
      ),
    };
  });

  distances = distances.sort(function (a, b) {
    return a.d < b.d ? -1 : a.d > b.d ? 1 : 0;
  });

  const match = distances[0].name;
  const style = isNaN(aStyle.valueOf())
    ? aStyle.toString() === "solid"
      ? " solid"
      : "n outline"
    : " translucent ";
  return style + " " + match.toLowerCase();
};
