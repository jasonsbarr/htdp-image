import { BaseImage } from "./BaseImage.js";
import { imageEquals } from "../utils.js";

/**
 * Draw a small mark at the pinhole of the image
 * @class
 * @prop {BaseImage} img
 */
export class PinholeImage extends BaseImage {
  /**
   * PinholeImage constructor
   * @param {BaseImage} img
   */
  constructor(img) {
    super({
      width: img.width,
      height: img.height,
      pinholeX: img.pinholeX,
      pinholeY: img.pinholeY,
      ariaText: `Pinhole image: ${img.ariaText}`,
    });

    this.img = img;
  }

  /**
   * PinholeImage static constructor
   * @param {BaseImage} img
   * @returns {PinholeImage}
   */
  static new(img) {
    return new PinholeImage(img);
  }

  get vertices() {
    return this.img.vertices;
  }

  /**
   * PinholeImage equality check
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof PinholeImage &&
        BaseImage.prototype.equals.call(this, other)) ||
      imageEquals(this.img, other.img)
    );
  }

  /**
   * Renders a PinholeImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.save();
    this.img.render(ctx);
    ctx.restore();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.moveTo(this.pinholeX - 5, this.pinholeY);
    ctx.lineTo(this.pinholeX + 5, this.pinholeY);
    ctx.moveTo(this.pinholeX, this.pinholeY - 5);
    ctx.lineTo(this.pinholeX, this.pinholeY + 5);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.75;
    ctx.moveTo(this.pinholeX - 5, this.pinholeY);
    ctx.lineTo(this.pinholeX + 5, this.pinholeY);
    ctx.moveTo(this.pinholeX, this.pinholeY - 5);
    ctx.lineTo(this.pinholeX, this.pinholeY + 5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
