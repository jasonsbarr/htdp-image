import { BaseImage } from "./BaseImage.js";

export class TextImage extends BaseImage {
  constructor(str, size, color, face, family, style, weight, underline) {}

  static new(str, size, color, face, family, style, weight, underline) {
    return new TextImage(
      str,
      size,
      color,
      face,
      family,
      style,
      weight,
      underline
    );
  }
}
