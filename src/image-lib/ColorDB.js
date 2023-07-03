import { colorRed, colorGreen, colorBlue, colorAlpha } from "./utils.js";
/**
 * @typedef {import("../shared/colors.js").Color} Color
 */

/**
 * Database mapping colors to names
 * @class
 * @prop {Object} colors
 * @prop {Object} colorNames
 */
export class ColorDB {
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

export const colorDb = new ColorDB();

for (let [name, value] of Object.entries(Colors)) {
  name = name.toUpperCase();

  if (isColor(value)) {
    colorDb.put(name, value);
  }
}
