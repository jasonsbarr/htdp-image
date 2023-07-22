import * as ImageLib from "./image-lib/index.js";
import {
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  Point,
  Point2D,
  point,
  XPlace,
  YPlace,
} from "./shared/index.js";
import { makeDocument } from "./shared/document.js";

const document = makeDocument();

/**
 * Renders an image to the DOM
 * @param {ImageLib.BaseImage} image
 * @param {HTMLElement} element
 */
export const render = (image, element = document.body) => {
  const canvas = ImageLib.makeCanvas(image.width, image.height);
  const context = canvas.getContext("2d");

  element.appendChild(canvas);
  image.render(context);
};

/**
 * Checks if a given string matches a color in the color DB
 * @param {string} color
 * @returns {boolean}
 */
export const isImageColor = (color) => ImageLib.isColorOrColorString(color);

/**
 * Checks if the value is a FillMode
 * @param {any} mode
 * @returns {boolean}
 */
export const isMode = (mode) => FillMode.isFillMode(mode);

/**
 * Checks if a given value is a PlaceX value
 * @param {any} x
 * @returns {boolean}
 */
export const isXPlace = (x) =>
  typeof x === "string" &&
  (x.toLowerCase() === "left" ||
    x.toLowerCase() === "right" ||
    x.toLowerCase() === "center" ||
    x.toLowerCase() === "pinhole" ||
    x.toLowerCase() === "middle");

export const isYPlace = (x) =>
  typeof x === "string" &&
  (x.toLowerCase() === "top" ||
    x.toLowerCase() === "bottom" ||
    x.toLowerCase() === "baseline" ||
    x.toLowerCase() === "center" ||
    x.toLowerCase() === "pinhole" ||
    x.toLowerCase() === "middle");

export {
  FontFamily,
  FontStyle,
  FontWeight,
  Point,
  Point2D,
  point,
  XPlace,
  YPlace,
};
