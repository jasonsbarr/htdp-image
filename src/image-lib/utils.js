import { Utils } from "../shared/index.js";

/**
 * @typedef {import("../shared/colors.js").Color} Color
 */

const clamp = Utils.clamp;

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

const isColorOrColorString = (val) =>
  isColor(val) || typeof colorDb.get(val) !== "undefined";

export const colorString = (color, style) => {
  const styleAlpha = isNaN(style) ? 1.0 : style;
  const cAlpha = colorAlpha(color);

  // note: flooring the numbers here to make sure it's a valid rgba string
  return `rgba(${Math.floor(colorRed(color))}, ${Math.floor(
    colorGreen(color)
  )}, ${Math.floor(colorBlue(color))}, ${styleAlpha * cAlpha})`;
};

for (let [name, value] of Object.entries(Colors)) {
  name = name.toUpperCase();

  if (isColor(value)) {
    colorDb.put(name, value);
  }
}

/**
 * Given an array of {x, y} pairs, unzip them into separate arrays
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
