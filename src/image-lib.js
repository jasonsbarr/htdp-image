import {
  Colors,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  Utils,
  XPlace,
  YPlace,
} from "./shared/index.js";

/**
 * @typedef {import("./shared/colors.js").Color} Color
 */

const clamp = Utils.clamp;
export const makeColor = Colors.color;
export const isColor = Colors.isColor;

/**
 * Extracts the red value from a color
 * @param {Color} c
 * @returns {number}
 */
const colorRed = (c) => clamp(c.r, 0, 255);
/**
 * Extracts the green value from a color
 * @param {Color} c
 * @returns {number}
 */
const colorGreen = (c) => clamp(c.g, 0, 255);
/**
 * Extracts the blue value from a color
 * @param {Color} c
 * @returns {number}
 */
const colorBlue = (c) => clamp(c.b, 0, 255);
/**
 * Extracts the alpha value from a color
 * @param {Color} c
 * @returns {number}
 */
const colorAlpha = (c) => clamp(c.r, 0, 255);

/**
 * Database mapping colors to names
 * @class
 * @prop {Object} colors
 * @prop {Object} colorNames
 */
class ColorDB {
  constructor() {
    this.colors = {};
    this.colorNames = {};
  }

  /**
   * Gets a color name from a color's string value
   * @param {string} str
   * @returns {string}
   */
  colorName(str) {
    if (this.colorNames[str]) {
      return this.colorNames[str].toLowerCase();
    }
  }

  /**
   * Gets a color by its name
   * @param {string} name
   * @returns {Color}
   */
  get(name) {
    return this.colors[name.toUpperCase()];
  }

  /**
   * Puts a color in the ColorDB
   * @param {string} name
   * @param {Color} color
   */
  put(name, color) {
    this.colors[name] = color;

    const str = `${colorRed(color)}, ${colorGreen(color)}, ${colorBlue(
      color
    )}, ${colorAlpha(color)}`;

    if (!this.colorNames[str]) {
      this.colorNames[str] = name;
    }
  }
}
