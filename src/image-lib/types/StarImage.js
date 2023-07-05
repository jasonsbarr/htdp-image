import {
  colorToSpokenString,
  findHeight,
  findWidth,
  translateVertices,
} from "../utils.js";
import { BaseImage } from "./BaseImage.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */
/**
 * @typedef {import("../../shared/types/FillMode.js").FillMode} FillMode
 */

/**
 * Represents an image in the shape of a star
 * Most of this code here adapted from the Canvas tutorial at:
 * @link http://developer.apple.com/safari/articles/makinggraphicswithcanvas.html
 * @class
 */
export class StarImage extends BaseImage {
  /**
   * StarImage constructor
   * @param {number} points
   * @param {number} outer
   * @param {number} inner
   * @param {FillMode} style
   * @param {Color} color
   */
  constructor(points, outer, inner, style, color) {
    super({
      style,
      color,
      ariaText: `a ${colorToSpokenString(
        color,
        style
      )}, ${points} pointed star with inner radius ${inner} and outer radius ${outer}`,
    });

    const maxRadius = Math.max(inner, outer);
    let vertices = [];
    const oneDegreeAsRadian = Math.PI / 180;

    for (let pt = 0; pt < points * 2; pt++) {
      const rads = (360 / (2 * points)) * pt * oneDegreeAsRadian - 0.5;
      const whichRadius = pt % 2 === 1 ? outer : inner;

      vertices.push({
        x: maxRadius + Math.sin(rads) * whichRadius,
        y: maxRadius + Math.cos(rads) * whichRadius,
      });
    }

    // calculate width and height of the bounding box
    this.width = findWidth(vertices);
    this.height = findHeight(vertices);

    let translate = {};
    // mutates translate object
    this.vertices = translateVertices(vertices, translate);

    for (let vertex of vertices) {
      this.pinholeX += vertex.x;
      this.pinholeY += vertex.y;
    }

    this.pinholeX /= vertices.length;
    this.pinholeY /= vertices.length;
  }

  /**
   * StarImage static constructor
   * @param {number} points
   * @param {number} outer
   * @param {number} inner
   * @param {FillMode} style
   * @param {Color} color : ;
   * @returns {StarImage}
   */
  static new(points, outer, inner, style, color) {
    return new StarImage(points, outer, inner, style, color);
  }
}
