import equals from "fast-deep-equal/es6/index.js";
import { colorToSpokenString } from "../colorToSpokenString.js";
import { colorString } from "../utils.js";
import { BaseImage } from "./BaseImage.js";

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */
/**
 * @typedef {import("../../shared/types/FillMode.js").FillMode} FillMode
 */

export class EllipseImage extends BaseImage {
  /**
   * EllipseImage constructor
   * @param {number} width
   * @param {number} height
   * @param {FillMode} style
   * @param {Color} color
   */
  constructor(width, height, style, color) {
    super({
      width,
      height,
      style,
      color,
      pinholeX: width / 2,
      pinholeY: height / 2,
      ariaText: `a ${colorToSpokenString(color, style)} ${
        width === height
          ? `circle of radius ${width / 2}`
          : `ellipse of width ${width} and height ${height}`
      }`,
    });
  }

  /**
   * EllipseImage static constructor
   * @param {number} width
   * @param {number} height
   * @param {FillMode} style
   * @param {Color} color
   * @returns {EllipseImage}
   */
  static new(width, height, style, color) {
    return new EllipseImage(width, height, style, color);
  }

  /**
   * EllipseImage equality check
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof EllipseImage &&
        this.width === other.width &&
        this.height === other.height &&
        this.style.toString() === other.style.toString() &&
        equals(this.color, other.color)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders an EllipseImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.beginPath();

    // if it's a solid ellipse...
    const isSolid = this.style.toString().toLowerCase() !== "outline";
    const adjust = isSolid ? 0 : 0.5;
    // ...account for the 1px border width
    const width = this.width - 2 * adjust,
      height = this.height - 2 * adjust;
    const aX = adjust,
      aY = adjust;

    // Most of this code is taken from:
    // http://webreflection.blogspot.com/2009/01/ellipse-and-circle-for-canvas-2d.html
    const hB = (width / 2) * 0.5522848,
      vB = (height / 2) * 0.5522848,
      eX = aX + width,
      eY = aY + height,
      mX = aX + width / 2,
      mY = aY + height / 2;
    ctx.moveTo(aX, mY);
    ctx.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
    ctx.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
    ctx.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
    ctx.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
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
}
