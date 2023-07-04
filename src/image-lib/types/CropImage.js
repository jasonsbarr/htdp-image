import { BaseImage } from "./BaseImage";

export class CropImage extends BaseImage {
  constructor(x, y, width, height, img) {}

  static new(x, y, width, height, img) {
    return new CropImage(x, y, width, height, img);
  }
}
