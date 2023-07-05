import { Utils, Colors, makeDocument } from "../shared/index.js";
import { colorDb } from "./colorDb.js";
import { makeImageDataImage } from "./make.js";
import { BaseImage } from "./types/BaseImage.js";

/**
 * @typedef {import("../shared/colors.js").Color} Color
 */

const clamp = Utils.clamp;
const makeColor = Colors.color;
const document = makeDocument();

/**
 * Extracts the red value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorRed = (c) => clamp(c.r, 0, 255);
/**
 * Extracts the green value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorGreen = (c) => clamp(c.g, 0, 255);
/**
 * Extracts the blue value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorBlue = (c) => clamp(c.b, 0, 255);
/**
 * Extracts the alpha value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorAlpha = (c) => clamp(c.a, 0, 1);

/**
 *
 * @param {Color} val
 * @returns {boolean}
 */
export const isColorOrColorString = (val) =>
  isColor(val) || typeof colorDb.get(val) !== "undefined";

export const colorString = (color, style) => {
  const styleAlpha = isNaN(style.valueOf()) ? 1.0 : style.valueOf();
  const cAlpha = colorAlpha(color);

  // note: flooring the numbers here to make sure it's a valid rgba string
  return `rgba(${Math.floor(colorRed(color))}, ${Math.floor(
    colorGreen(color)
  )}, ${Math.floor(colorBlue(color))}, ${styleAlpha * cAlpha})`;
};

export const isImage = (thing) => {
  return (
    typeof thing.height === number &&
    typeof thing.width === number &&
    typeof thing.alphaBaseline === number &&
    typeof thing.updatePinhole === "function" &&
    typeof thing.offsetPinhole === "function" &&
    typeof thing.render === "function"
  );
};

export const imageEquals = function (left, right) {
  if (!isImage(left) || !isImage(right)) {
    return false;
  }
  return left.equals(right);
};

export const imageDifference = (left, right) => {
  if (!isImage(left) || !isImage(right)) {
    return false;
  }
  return left.difference(right);
};

export const isAngle = (x) => typeof x === "number" && x >= 0 && x < 360;
export const isSideCount = Number.isInteger(x) && x >= 3;
export const isStepCount = Number.isInteger(x) && x >= 1;
export const isPointsCount = Number.isInteger(x) && x >= 2;

/**
 * Checks if 2 sets of vertices are equal
 * @param {{x: number; y: number}[]} v1
 * @param {{x: number; y: number}[]} v2
 * @returns {boolean}
 */
export const verticesEqual = function (v1, v2) {
  if (v1.length !== v2.length) {
    return false;
  }
  var v1_str = v1
      .map(function (o) {
        return "x:" + o.x + ",y:" + o.y;
      })
      .join(","),
    v2_str = v2
      .map(function (o) {
        return "x:" + o.x + ",y:" + o.y;
      })
      .join(",");
  // v1 == rot(v2) if append(v1,v1) includes v2
  return (v1_str + "," + v1_str).includes(v2_str);
};

/**
 * Given an array of {x, y} pairs, unzip them into separate arrays
 * @returns {{xs: number[]; ys: number[]}}
 */
export const unzipVertices = (vertices) => {
  return {
    xs: vertices.map((v) => v.x),
    ys: vertices.map((v) => v.y),
  };
};

/**
 * Given an array of vertices, find the width of the shape
 */
export const findWidth = (vertices) => {
  const { xs } = unzipVertices(vertices);
  return Math.max(...xs) - Math.min(...xs);
};

/**
 * Given an array of vertices, find the height of the image
 */
export const findHeight = (vertices) => {
  const { ys } = unzipVertices(vertices);
  return Math.max(...ys) - Math.min(...ys);
};

/**
 * Given a list of vertices and a translation x/y, shift them
 */
export const translateVertices = (vertices, translation = null) => {
  const vs = unzipVertices(vertices);
  const translateX = -Math.min(...vs.xs);
  const translateY = -Math.min(...vs.ys);

  if (translation) {
    translation.x = translateX;
    translation.y = translateY;
  }

  return vertices.map((v) => ({ x: v.x + translateX, y: v.y + translateY }));
};

/**
 * Constructs a canvas from a given width and height
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
export const makeCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  return canvas;
};

export const RGBtoLAB = (r, g, b) => {
  const RGBtoXYZ = (r, g, b) => {
    const process = (v) => {
      v = parseFloat(v / 255);
      return (
        (v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92) * 100
      );
    };
    const var_R = process(r),
      var_G = process(g),
      var_B = process(b);
    //Observer. = 2°, Illuminant = D65
    const X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805;
    const Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722;
    const Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505;
    return [X, Y, Z];
  };

  const XYZtoLAB = (x, y, z) => {
    let var_X = x / 95.047; //ref_X =  95.047   Observer= 2°, Illuminant= D65
    let var_Y = y / 100.0; //ref_Y = 100.000
    let var_Z = z / 108.883; //ref_Z = 108.883
    const process = (v) => {
      return v > 0.008856 ? Math.pow(v, 1 / 3) : 7.787 * v + 16 / 116;
    };
    var_X = process(var_X);
    var_Y = process(var_Y);
    var_Z = process(var_Z);
    const CIE_L = 116 * var_Y - 16;
    const CIE_a = 500 * (var_X - var_Y);
    const CIE_b = 200 * (var_Y - var_Z);
    return [CIE_L, CIE_a, CIE_b];
  };
  const xyz = RGBtoXYZ(r, g, b),
    lab = XYZtoLAB(xyz[0], xyz[1], xyz[2]);
  return { l: lab[0], a: lab[1], b: lab[2] };
};

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

/**
 *
 * @param {BaseImage} img
 * @param {number} x
 * @param {number} y
 * @returns {Color}
 */
export const colorAtPosition = (img, x, y) => {
  const width = img.width,
    height = img.height,
    canvas = makeCanvas(width, height),
    ctx = canvas.getContext("2d");
  let r, g, b, a;

  img.render(ctx);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data,
    index = (y * width + x) * 4;

  r = data[index];
  g = data[index + 1];
  b = data[index + 2];
  a = data[index + 3] / 255;

  return makeColor(r, g, b, a);
};

/**
 * Extracts a list of colors from an image
 * @param {BaseImage} img
 * @returns {Color[]}
 */
export const imageToColorList = (img) => {
  const width = img.width;
  const height = img.height;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  let imageData, data, r, g, b, a;

  img.render(ctx);
  imageData = ctx.getImageData(0, 0, width, height);
  data = imageData.data;

  let colors = [];

  for (let i = 0; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3] / 255;
    colors.push(makeColor(r, g, b, a));
  }

  return colors;
};

/**
 * Converts a list of colors into an image
 * @param {Color[]} listOfColors
 * @param {number} width
 * @param {number} height
 * @param {number} pinholeX
 * @param {number} pinholeY
 * @returns {BaseImage}
 */
export const colorListToImage = (
  listOfColors,
  width,
  height,
  pinholeX,
  pinholeY
) => {
  const canvas = makeCanvas(width, height),
    ctx = canvas.getContext("2d"),
    imageData = ctx.createImageData(width, height),
    data = imageData.data;
  let aColor;

  for (var i = 0; i < jsLOC.length * 4; i += 4) {
    aColor = listOfColors[i / 4];
    // NOTE(ben): Flooring colors here to make this a proper RGBA image
    data[i] = Math.floor(colorRed(aColor));
    data[i + 1] = Math.floor(colorGreen(aColor));
    data[i + 2] = Math.floor(colorBlue(aColor));
    data[i + 3] = colorAlpha(aColor) * 255;
  }

  const ans = makeImageDataImage(imageData);
  ans.pinholeX = pinholeX;
  ans.pinholeY = pinholeY;
  return ans;
};
