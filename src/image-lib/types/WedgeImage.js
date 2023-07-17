import equals from "fast-deep-equal/es6/index.js";
import {
  colorToSpokenString,
  findHeight,
  findWidth,
  translateVertices,
} from "../utils.js";
import { BaseImage } from "./BaseImage.js";
import { point } from "../../shared/index.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */
/**
 * @typedef {import("../../shared/types/FillMode.js").FillMode} FillMode
 */

/**
 * An image in the shape of a wedge
 * @class
 * @prop {number} radius
 * @prop {number} angle
 */
export class WedgeImage extends BaseImage {
  /**
   * WedgeImage constructor
   * @param {number} radius
   * @param {number} angle
   * @param {FillMode} style
   * @param {Color} color
   */
  constructor(radius, angle, style, color) {
    super({
      style,
      color,
      ariaText: `a ${colorToSpokenString(
        color,
        style
      )} wedge of angle ${angle}`,
    });

    this.radius = radius;
    this.angle = ((angle % 360.0) * Math.PI) / 180;

    const endPointX = radius * Math.cos(this.angle);
    const endPointY = radius * Math.sin(this.angle);
    let vertices = [point(0, 0), point(radius, 0)];
    // Going in 5-degree increments ensures we hit the extremal points if they are part of the wedge
    // Negate the y-components, because we want y-up behavior
    for (let i = 5; i < angle; i += 5) {
      vertices.push(
        point(
          radius * Math.cos((i * Math.PI) / 180),
          -1 * radius * Math.sin((i * Math.PI) / 180)
        )
      );
    }

    vertices.push(point(endPointX, -endPointY));
    this.width = findWidth(vertices);
    this.height = findHeight(vertices);

    let translate = {};
    // mutates translate object
    this.vertices = translateVertices(vertices, translate);
    this.pinholeX = this.vertices[0].x;
    this.pinholeY = this.vertices[0].y;
  }

  /**
   * WedgeImage static constructor
   * @param {number} radius
   * @param {number} angle
   * @param {FillMode} style
   * @param {Color} color
   * @returns {WedgeImage}
   */
  static new(radius, angle, style, color) {
    return new WedgeImage(radius, angle, style, color);
  }

  /**
   * WedgeImage equality check
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof WedgeImage &&
        this.radius === other.radius &&
        this.angle === other.angle &&
        this.style.toString() === other.style.toString() &&
        equals(this.color, other.color)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders a WedgeImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.beginPath();

    // if it's a solid wedge...
    const isSolid = this.style.toString().toLowerCase() !== "outline";
    const adjust = isSolid ? 0 : 0.5;
    // ...account for the 1px border width
    const width = this.width - 2 * adjust, // never used - why?
      height = this.height - 2 * adjust; // never used - why?
    const aX = adjust,
      aY = adjust;

    ctx.moveTo(aX + this.pinholeX - adjust, aY + this.pinholeY - adjust);
    ctx.arc(
      aX + this.pinholeX - adjust,
      aY + this.pinholeY - adjust,
      this.radius - 2 * adjust,
      0,
      -this.angle,
      true
    );
    ctx.closePath();
    if (this.style.toString().toLowerCase() === "outline") {
      ctx.strokeStyle = colorString(this.color);
      ctx.stroke();
    } else {
      ctx.fillStyle = colorString(this.color, this.style);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Rotates a WedgeImage by angle
   * @param {number} angle
   * @returns {WedgeImage}
   */
  // Not only is there no way this is correct, but I don't even know how to fix it
  rotate(angle) {
    return new WedgeImage(
      this.radius,
      this.startAngle + angle,
      this.angle,
      this.style,
      this.color
    );
  }
}
