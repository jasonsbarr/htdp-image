import { BaseImage } from "./BaseImage.js";
import { imageEquals } from "../utils.js";
import { point } from "../../shared/index.js";

/**
 * Scale an image
 * @class
 * @prop {number} xFactor
 * @prop {number} yFactor
 * @prop {BaseImage} img`
 */
export class ScaleImage extends BaseImage {
  /**
   * Constructor for ScaleImage
   * @param {number} xFactor
   * @param {number} yFactor
   * @param {BaseImage} img
   */
  constructor(xFactor, yFactor, img) {
    super({
      width: img.width * Math.abs(xFactor),
      height: img.height * Math.abs(yFactor),
      pinholeX: img.pinholeX * xFactor,
      pinholeY: img.pinholeY * yFactor,
      ariaText: `Scaled image, ${
        xFactor === yFactor
          ? `by ${xFactor}`
          : `horizontally by ${xFactor} and vertically by ${yFactor}`
      }`,
    });

    this.img = img;
    this._vertices = img.vertices.map((v) =>
      point(v.x * xFactor, v.y * yFactor)
    );
    this.xFactor = xFactor;
    this.yFactor = yFactor;

    if (xFactor < 0) {
      // translate pinhole into image region
      this.pinholeX += this.width;
      this.vertices.forEach((v) => (v.x += this.width));
    }

    if (yFactor < 0) {
      // translate pinhole into image region
      this.pinholeY += this.height;
      this.vertices.forEach((v) => (v.y += this.height));
    }
  }

  /**
   * Static constructor for ScaleImage
   * @param {number} xFactor
   * @param {number} yFactor
   * @param {BaseImage} img
   * @returns {ScaleImage}
   */
  static new(xFactor, yFactor, img) {
    return new ScaleImage(xFactor, yFactor, img);
  }

  /**
   * Equality check for ScaleImage
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof ScaleImage &&
        this.width === other.width &&
        this.height === other.height &&
        this.xFactor === other.xFactor &&
        this.yFactor === other.yFactor &&
        imageEquals(this.img, other.img)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders a ScaleImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.scale(this.xFactor, this.yFactor);

    if (this.xFactor < 0) {
      ctx.translate(this.width / this.xFactor, 0);
    }

    if (this.yFactor < 0) {
      ctx.translate(0, this.height / this.yFactor);
    }

    this.img.render(ctx);
    ctx.restore();
  }
}
