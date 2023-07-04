import { BaseImage } from "./BaseImage.js";
import { imageEquals } from "../utils.js";

/**
 * Flip an image either horizontally or vertically
 * @class
 * @prop {BaseImage} img
 * @prop {"horizontal"|"vertical"} direction
 */
export class FlipImage extends BaseImage {
  /**
   * FlipImage constructor
   * @param {BaseImage} img
   * @param {"horizontal"|"vertical"} direction
   */
  constructor(img, direction) {
    super({
      width: img.width,
      height: img.height,
      ariaText: `${direction}ally flipped image: ${img.ariaText}`,
    });

    this.img = img;
    this.direction = direction;

    if (direction === "horizontal") {
      this.pinholeX = this.width - img.pinholeX;
      this.pinholeY = img.pinholeY;
    } else {
      this.pinholeX = img.pinholeX;
      this.pinholeY = this.height - img.pinholeY;
    }
  }

  /**
   * FlipImage static constructor
   * @param {BaseImage} img
   * @param {"horizontal"|"vertical"} direction
   * @returns {FlipImage}
   */
  static new(img, direction) {
    return new FlipImage(img, direction);
  }

  /**
   * FlipImage equality check
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof FlipImage &&
        this.width === other.width &&
        this.height === other.height &&
        this.direction === other.direction &&
        imageEquals(this.img, other.img)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders a FlipImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    // when flipping an image of dimension M across an axis,
    // we need to translate the canvas by M in the opposite direction
    ctx.save();
    if (this.direction === "horizontal") {
      ctx.scale(-1, 1);
      ctx.translate(-this.width, 0);
      this.img.render(ctx);
    }
    if (this.direction === "vertical") {
      ctx.scale(1, -1);
      ctx.translate(0, -this.height);
      this.img.render(ctx);
    }
    ctx.restore();
  }
}
