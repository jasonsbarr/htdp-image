import { point } from "../../shared/index.js";
import { colorToSpokenString } from "../utils.js";
import { BaseImage } from "./BaseImage.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */
/**
 * @typedef {import("../../shared/types/FillMode.js").FillMode} FillMode
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
   * @param {FillMode} style
   * @param {Color} color
   */
  constructor(side, angle, style, color) {
    super({
      width: Math.sin(((angle / 2) * Math.PI) / 180) * side * 2,
      height: Math.abs(Math.cos(((angle / 2) * Math.PI) / 180)) * side * 2,
      style,
      color,
      vertices: [
        point(this.width / 2, 0),
        point(this.width, this.height / 2),
        point(this.width / 2, this.height),
        point(0, this.height / 2),
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
   * @param {FillMode} style
   * @param {Color} color
   * @returns {RhombusImage}
   */
  static new(side, angle, style, color) {
    return new RhombusImage(side, angle, style, color);
  }
}
