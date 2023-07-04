import { BaseImage } from "./BaseImage.js";
import { Utils } from "../../shared/index.js";
import {
  colorToSpokenString,
  findHeight,
  findWidth,
  translateVertices,
} from "../utils.js";

const gcd = Utils.gcd;

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */

/**
 * See @link http://www.algebra.com/algebra/homework/Polygons/Inscribed-and-circumscribed-polygons.lesson
 * the polygon is inscribed in a circle, whose radius is length/2sin(pi/count)
 * another circle is inscribed in the polygon, whose radius is length/2tan(pi/count)
 * RegularPolygons are drawn to keep their bottoms flat.
 * Stars are drawn to keep the points at top.
 * (so an even-sided star would be rotated from an even-sided polygon)
 * @class
 * @prop {number} outerRadius
 */
export class RegularPolygonImage extends BaseImage {
  #vertices;

  /**
   * RegularPolygonImage constructor
   * @param {number} length
   * @param {number} count
   * @param {number} step
   * @param {string} style
   * @param {Color} color
   * @param {boolean} flatBottom
   */
  constructor(length, count, step, style, color, flatBottom) {
    super({
      style,
      color,
      ariaText: `a ${colorToSpokenString(
        color,
        style
      )}, ${count} sided polygon with each side of length ${length}`,
    });

    this.outerRadius = Math.round(length / (2 * Math.sin(Math.PI / count)));

    const adjust = Math.PI / 2; // rotate 1/4 turn, with y pointing down

    if (flatBottom && count % 2 == 0) {
      adjust += Math.PI / count;
    }

    let radians = 0,
      vertices = [];
    const numComponents = gcd(count, step);
    const pointsPerComponent = count / numComponents;
    const angle = (2 * Math.PI) / count;

    for (let curComp = 0; curComp < numComponents; curComp++) {
      radians = curComp * angle;

      for (let i = 0; i < pointsPerComponent; i++) {
        radians = radians + step * angle;

        vertices.push({
          x: Math.round(this.outerRadius * Math.cos(radians - adjust)),
          y: Math.round(this.outerRadius * Math.sin(radians - adjust)),
        });
      }
    }

    this.width = findWidth(vertices);
    this.height = findHeight(vertices);

    let translate = {};

    // mutates translate object
    this.vertices = translateVertices(vertices, translate);
    this.#vertices = [];

    for (let curComp = 0; curComp < numComponents; curComp++) {
      let component = [];

      for (let point = 0; point < pointsPerComponent; point++) {
        // grab the translated point from the vertices array
        component.push(this.vertices[curComp * pointsPerComponent + point]);
      }

      this.#vertices.push(component);
    }

    for (let v = 0; v < this.vertices.length; v++) {
      this.pinholeX += this.vertices[v].x;
      this.pinholeY += this.vertices[v].y;
    }

    this.pinholeX /= this.vertices.length;
    this.pinholeY /= this.vertices.length;
  }

  /**
   * RegularPolygonImage static constructor
   * @param {number} length
   * @param {number} count
   * @param {number} step
   * @param {string} style
   * @param {Color} color
   * @param {boolean} flatBottom
   * @returns {RegularPolygonImage}
   */
  static new(length, count, step, style, color, flatBottom) {
    return new RegularPolygonImage(
      length,
      count,
      step,
      style,
      color,
      flatBottom
    );
  }

  /**
   * Renders a RegularPolygonImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    const actualVertices = this.vertices;

    for (let i = 0; i < this.#vertices.length; i++) {
      this.vertices = this.#vertices[i];
      BaseImage.prototype.render.call(this, ctx);
    }

    this.vertices = actualVertices;
  }
}
