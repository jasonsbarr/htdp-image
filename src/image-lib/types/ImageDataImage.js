import { makeCanvas } from "../utils.js";
import { BaseImage } from "./BaseImage.js";

/**
 * Constructs an image from an array of pixel data
 * @prop {ImageData} imageData
 */
export class ImageDataImage extends BaseImage {
  /**
   * ImageDataImage constructor
   * @param {ImageData} imageData
   */
  constructor(imageData) {
    super({ width: imageData.width, height: imageData.height });
    this._imageData = imageData;
  }

  /**
   * Static constructor
   * @param {ImageData} imageData
   * @returns {ImageDataImage}
   */
  static new(imageData) {
    return new ImageDataImage(imageData);
  }

  /**
   * @returns {ImageData}
   */
  get imageData() {
    return this._imageData;
  }

  /**
   * Renders an ImageDataImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    // Simply using putImageData on ctx would ignore the current transformation matrix,
    // so it wouldn't scale or rotate images.  This temp-drawing approach solves that.
    const tempCanvas = makeCanvas(this.width, this.height);
    tempCanvas.getContext("2d").putImageData(this.imageData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0);
  }
}
