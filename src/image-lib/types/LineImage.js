import { FillMode } from "../../shared/index.js";
import { colorToSpokenString } from "../utils.js";
import { BaseImage } from "./BaseImage.js";
import { point } from "../../shared/index.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */

/**
 * An image that is a line
 *
 * Line: Number Number Color -> Image
 * @class
 */
export class LineImage extends BaseImage {
  /**
   * LineImage constructor
   * @param {number} x
   * @param {number} y
   * @param {Color} color
   */
  constructor(x, y, color) {
    super({
      width: Math.abs(x),
      height: Math.abs(y),
      style: FillMode.Outline(),
      color,
      pinholeX: Math.abs(x) / 2,
      pinholeY: Math.abs(y) / 2,
      ariaText: `a ${colorToSpokenString(
        color,
        "outline"
      )} line of width ${x} and height ${y}`,
    });

    if (x >= 0) {
      if (y >= 0) {
        this.vertices = [point(0, 0), point(x, y)];
      } else {
        this.vertices = [point(0, -y), point(x, 0)];
      }
    } else {
      if (y >= 0) {
        this.vertices = [point(-x, 0), point(0, y)];
      } else {
        this.vertices = [point(-x, -y), point(0, 0)];
      }
    }
  }

  /**
   * LineImage static constructor
   * @param {number} x
   * @param {number} y
   * @param {Color} color
   * @returns {LineImage}
   */
  static new(x, y, color) {
    return new LineImage(x, y, color);
  }
}
