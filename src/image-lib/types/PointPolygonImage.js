import { BaseImage } from "./BaseImage.js";
import { findWidth, findHeight, translateVertices } from "../utils.js";
import { colorToSpokenString } from "../colorToSpokenString.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */
/**
 * @typedef {import("../../shared/types/FillMode.js").FillMode} FillMode
 */

export class PointPolygonImage extends BaseImage {
  /**
   * PointPolygonImage constructor
   * @param {import("../../shared/types/Point.js").PointXY[]} vertices
   * @param {FillMode} style
   * @param {Color} color
   */
  constructor(vertices, style, color) {
    super({
      style,
      color,
      ariaText: `a ${colorToSpokenString(color, style)}, polygon with ${
        vertices.length
      } points`,
    });

    this.width = findWidth(vertices);
    this.height = findHeight(vertices);

    for (let vertex of vertices) {
      vertex.y *= -1;
    }

    let translate = {};
    // mutates the translate object
    this.vertices = translateVertices(vertices, translate);

    for (let v of vertices) {
      this.pinholeX += v.x;
      this.pinholeY += v.y;
    }

    this.pinholeX /= vertices.length;
    this.pinholeY /= vertices.length;
  }

  /**
   * PointPolygonImage static constructor
   * @param {{x: number; y: number}[]} vertices
   * @param {FillMode} style
   * @param {Color} color
   * @returns {PointPolygonImage}
   */
  static new(vertices, style, color) {
    return new PointPolygonImage(vertices, style, color);
  }
}
