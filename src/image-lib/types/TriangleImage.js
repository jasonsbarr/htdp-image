import { point } from "../../shared/index.js";
import { colorToSpokenString } from "../colorToSpokenString.js";
import { BaseImage } from "./BaseImage.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */
/**
 * @typedef {import("../../shared/types/FillMode.js").FillMode} FillMode
 */

/**
 * Draws a triangle with the base = sideC, and the angle between sideC and sideB being angleA
 * See @link http://docs.racket-lang.org/teachpack/2htdpimage.html#(def._((lib._2htdp/image..rkt)._triangle))
 * @class
 */
export class TriangleImage extends BaseImage {
  /**
   * TriangleImage constructor
   * @param {number} sideC
   * @param {number} angleA
   * @param {number} sideB
   * @param {FillMode} style
   * @param {Color} color
   */
  constructor(sideC, angleA, sideB, style, color) {
    super({
      style,
      color,
      ariaText: `a ${colorToSpokenString(
        color,
        style
      )} triangle whose base is of length ${sideC} with an angle of ${
        angleA % 180
      } degrees between it and a side of length ${sideB}`,
    });

    const thirdX = sideB * Math.cos((angleA * Math.PI) / 180);
    const thirdY = sideB * Math.sin((angleA * Math.PI) / 180);
    const offsetX = 0 - Math.min(0, thirdX); // angleA could be obtuse
    let vertices = [];

    // if angle < 180 start at the top of the canvas, otherwise start at the bottom
    if (thirdY > 0) {
      vertices.push(point(offsetX + 0, 0));
      vertices.push(point(offsetX + sideC, 0));
      vertices.push(point(offsetX + thirdX, thirdY));
    } else {
      vertices.push(point(offsetX + 0, -thirdY));
      vertices.push(point(offsetX + sideC, -thirdY));
      vertices.push(point(offsetX + thirdX, 0));
    }

    this.width = Math.max(sideC, thirdX) + offsetX;
    this.height = Math.abs(thirdY);
    this.vertices = vertices;
    // pinhole is set to centroid (or barycenter): average of three corners
    this.pinholeX = (vertices[0].x + vertices[1].x + vertices[2].x) / 3;
    this.pinholeY = (vertices[0].y + vertices[1].y + vertices[2].y) / 3;
  }

  /**
   * TriangleImage static constructor
   * @param {number} sideC
   * @param {number} angleA
   * @param {number} sideB
   * @param {FillMode} style
   * @param {Color} color
   * @returns {TriangleImage}
   */
  static new(sideC, angleA, sideB, style, color) {
    return new TriangleImage(sideC, angleA, sideB, style, color);
  }
}
