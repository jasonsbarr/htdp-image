import { colorToSpokenString } from "../utils.js";
import { BaseImage } from "./BaseImage.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */

/**
 * Represents an image in the shape of a rhombus
 * @class
 */
export class RhombusImage extends BaseImage {
  /**
   * RhombusImage constructor
   * @param {number} side
   * @param {number} angle
   * @param {number} style
   * @param {Color} color
   */
  constructor(side, angle, style, color) {
    super({
      width: Math.sin(((angle / 2) * Math.PI) / 180) * side * 2,
      height: Math.abs(Math.cos(((angle / 2) * Math.PI) / 180)) * side * 2,
      style,
      color,
      vertices: [
        { x: this.width / 2, y: 0 },
        { x: this.width, y: this.height / 2 },
        { x: this.width / 2, y: this.height },
        { x: 0, y: this.height / 2 },
      ],
      pinholeX: this.width / 2,
      pinholeY: this.height / 2,
      ariaText: `a ${colorToSpokenString(
        color,
        style
      )} rhombus of size ${side} and angle ${angle}`,
    });
  }

  /**
   * RhombusImage static constructor
   * @param {number} side
   * @param {number} angle
   * @param {number} style
   * @param {Color} color
   * @returns {RhombusImage}
   */
  static new(side, angle, style, color) {
    return new RhombusImage(side, angle, style, color);
  }
}
