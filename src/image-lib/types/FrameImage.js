import { BaseImage } from "./BaseImage.js";
import { imageEquals } from "../utils.js";

/**
 * Sticks a frame around the image
 * @class
 * @prop {BaseImage} img
 */
export class FrameImage extends BaseImage {
  /**
   * FrameImage constructor
   * @param {BaseImage} img
   */
  constructor(img) {
    super({
      width: img.width,
      height: img.height,
      pinholeX: img.pinholeX,
      pinholeY: img.pinholeY,
      alphaBaseline: img.alphaBaseline,
      ariaText: `Framed image: ${img.ariaText}`,
    });

    this.img = img;
  }

  /**
   * FrameImage static constructor
   * @param {BaseImage} img
   * @returns {FrameImage}
   */
  static new(img) {
    return new FrameImage(img);
  }

  equals(other) {
    return (
      (other instanceof FrameImage &&
        BaseImage.prototype.equals.call(this, other)) ||
      imageEquals(this.img, other.img)
    );
  }

  /**
   * Renders a FrameImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    this.img.render(ctx);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.closePath();
    ctx.restore();
  }
}
