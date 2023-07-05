import { BaseImage } from "./BaseImage.js";
import { colorToSpokenString } from "../utils.js";

/**
 * @typedef {import("../../shared/types/FillMode.js").FillMode} FillMode
 */

/**
 * An image that is a rectangle
 * @class
 */
export class RectangleImage extends BaseImage {
  /**
   * RectangleImage constructor
   * @param {number} width
   * @param {number} height
   * @param {FillMode} style
   * @param {import("../../shared/colors").Color} color
   */
  constructor(width, height, style, color) {
    super({
      width,
      height,
      style,
      color,
      vertices: [
        { x: 0, y: height },
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
      ],
      pinholeX: width / 2,
      pinholeY: height / 2,
      ariaText: `a ${colorToSpokenString(color, style)}${
        width === height
          ? ` square of size ${width}`
          : `rectangle of width ${width} and height ${height}`
      }`,
    });
  }

  /**
   * RectangleImage static constructor
   * @param {number} width
   * @param {number} height
   * @param {FillMode} style
   * @param {import("../../shared/colors").Color} color
   * @returns {RectangleImage}
   */
  static new(width, height, style, color) {
    return new RectangleImage(width, height, style, color);
  }
}
