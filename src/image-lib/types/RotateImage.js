import { point } from "../../shared/index.js";
import {
  findHeight,
  findWidth,
  translateVertices,
  unzipVertices,
  imageEquals,
} from "../utils.js";
import { BaseImage } from "./BaseImage.js";
import { EllipseImage } from "./EllipseImage.js";

/**
 * Class representing a rotated image
 * @class
 * @prop {number} angle
 * @prop {BaseImage} img
 * @prop {number} translateX
 * @prop {number} translateY
 */
export class RotateImage extends BaseImage {
  #vertices;

  /**
   * RotateImage constructor
   * @param {number} angle
   * @param {BaseImage} image
   */
  constructor(angle, image) {
    if (image instanceof EllipseImage && image.width === image.height) {
      // optimization for circle
      angle = 0;
    }

    const sin = Math.sin((angle * Math.PI) / 180);
    const cos = Math.cos((angle * Math.PI) / 180);
    const vertices = image.vertices.map((v) =>
      point(v.x * cos - v.y * sin, v.x * sin + v.y * cos)
    );
    // extract the xs and ys separately
    // why do this if we never use it?
    const vs = unzipVertices(vertices);

    super({
      width: findWidth(vertices),
      height: findHeight(vertices),
      pinholeX: image.pinholeX * cos - image.pinholeY * sin + translate.x,
      pinholeY: image.pinholeX * sin + image.pinholeY * cos + translate.y,
      ariaText: `Rotated image, ${-1 * angle} degrees: ${image.ariaText}`,
    });

    let translate = {};
    // mutates translate object
    this.#vertices = translateVertices(vertices, translate);
    this.img = image;
    this.angle = Math.round(angle);
    this.translateX = translate.x;
    this.translateY = translate.y;
  }

  /**
   * Static constructor
   * @param {number} angle
   * @param {BaseImage} image
   * @returns {RotateImage}
   */
  static new(angle, image) {
    return new RotateImage(angle, image);
  }

  /**
   * @returns {{x: number; y: number}[]}
   */
  get vertices() {
    return this.#vertices;
  }

  /**
   * Equality check for RotateImage
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof RotateImage &&
        this.width === other.width &&
        this.height === other.height &&
        this.angle === other.angle &&
        this.pinholeX === other.pinholeX &&
        this.pinholeY === other.pinholeX &&
        imageEquals(this.img, other.img)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders a RotateImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.translate(this.translateX, this.translateY);
    ctx.rotate((this.angle * Math.PI) / 180);
    this.img.render(ctx);
    ctx.restore();
  }
}
