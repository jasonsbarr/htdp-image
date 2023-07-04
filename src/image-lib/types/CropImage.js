import { BaseImage } from "./BaseImage";

/**
 * Represents a cropped image
 * @class
 * @prop {number} x
 * @prop {number} y
 * @prop {BaseImage} img
 */
export class CropImage extends BaseImage {
  /**
   * CropImage constructor
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {BaseImage} img
   */
  constructor(x, y, width, height, img) {
    super({
      height,
      width,
      ariaText: `Cropped image, from ${x}, ${y} to ${+x + width}, ${
        +y + height
      }: ${img.ariaText}`,
    });

    this.x = x;
    this.y = y;
    this.img = img;
    if (
      img.pinholeX >= x &&
      img.pinholeX <= x + width &&
      img.pinholeY >= y &&
      img.pinholeY <= y + height
    ) {
      this.pinholeX = img.pinholeX - x;
      this.pinholeY = img.pinholeY - y;
    } else {
      this.pinholeX = width / 2;
      this.pinholeY = height / 2;
    }
  }

  /**
   * CropImage static constructor
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {BaseImage} img
   * @returns {CropImage}
   */
  static new(x, y, width, height, img) {
    return new CropImage(x, y, width, height, img);
  }

  /**
   * Equality check for CropImage
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof CropImage &&
        this.width === other.width &&
        this.height === other.height &&
        this.x === other.x &&
        this.y === other.y &&
        imageEquals(this.img, other.img)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders a CropImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.clip();
    ctx.translate(-this.x, -this.y);
    this.img.render(ctx);
    ctx.restore();
  }
}
