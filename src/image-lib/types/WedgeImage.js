import { BaseImage } from "./BaseImage.js";

/**
 * An image in the shape of a wedge
 * @class
 * @prop {number} radius
 * @prop {number} angle
 */
export class WedgeImage extends BaseImage {
  constructor(radius, angle, style, color) {}

  static new(radius, angle, style, color) {
    return new WedgeImage(radius, angle, style, color);
  }
}
