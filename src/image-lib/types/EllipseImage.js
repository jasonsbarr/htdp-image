import { BaseImage } from "./BaseImage.js";

export class EllipseImage extends BaseImage {
  constructor(width, height, style, color) {}

  static new(width, height, style, color) {
    return new EllipseImage(width, height, style, color);
  }
}
