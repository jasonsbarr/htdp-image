import { BaseImage } from "./BaseImage.js";

/**
 * Creates an image that overlays img1 on top of the
 * other image img2, by aligning the given (x/y)-place of img1
 * with the given (x/y)-place of img2, and offsetting by the given amount
 * @class
 * @prop {number} x1
 * @prop {number} x2
 * @prop {number} y1
 * @prop {number} y2
 * @prop {BaseImage} img1
 * @prop {BaseImage} img2
 */
export class OverlayImage extends BaseImage {
  /**
   * OverlayImage constructor
   * @param {BaseImage} img1
   * @param {"left"|"middle"|"pinhole"|"right"} placeX1
   * @param {"top"|"center"|"pinhole"|"baseline"|"bottom"} placeY1
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {BaseImage} img2
   * @param {"left"|"middle"|"pinhole"|"right"} placeX2
   * @param {"top"|"center"|"pinhole"|"baseline"|"bottom"} placeY2
   */
  constructor(
    img1,
    placeX1,
    placeY1,
    offsetX,
    offsetY,
    img2,
    placeX2,
    placeY2
  ) {
    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0;
    let anchor1, anchor2;

    switch (placeX1.toLowerCase()) {
      case "left":
        x1 -= 0;
        anchor1 = "left";
        break;
      case "middle":
        x1 -= img1.width / 2;
        anchor1 = "-middle";
        break;
      case "pinhole":
        x1 -= img1.pinholeX;
        anchor1 = "-pinhole";
        break;
      case "right":
        x1 -= img1.width;
        anchor1 = "-right";
        break;
      default:
        throw new Error(`Unknown XPlace option for image1: ${placeX1}`);
    }

    switch (placeY1.toLowerCase()) {
      case "top":
        y1 -= 0;
        anchor1 = "top" + anchor1;
        break;
      case "center":
        y1 -= img1.height / 2;
        anchor1 = "center" + anchor1;
        break;
      case "pinhole":
        y1 -= img1.pinholeY;
        anchor1 = "pinhole" + anchor1;
        break;
      case "baseline":
        y1 -= img1.alphaBaseline;
        anchor1 = "baseline" + anchor1;
        break;
      case "bottom":
        y1 -= img1.height;
        anchor1 = "bottom" + anchor1;
        break;
      default:
        throw new Error(`Unknown YPlace option for image1: ${placeY1}`);
    }

    switch (placeX2.toLowerCase()) {
      case "left":
        x2 -= 0;
        anchor2 = "left";
        break;
      case "middle":
        x2 -= img2.width / 2;
        anchor2 = "-middle";
        break;
      case "pinhole":
        x2 -= img2.pinholeX;
        anchor2 = "-pinhole";
        break;
      case "right":
        x2 -= img2.width;
        anchor2 = "-right";
        break;
      default:
        throw new Error(`Unknown XPlace option for image1: ${placeX1}`);
    }

    switch (placeY2.toLowerCase()) {
      case "top":
        y2 -= 0;
        anchor2 = "top" + anchor2;
        break;
      case "center":
        y2 -= img2.height / 2;
        anchor2 = "center" + anchor2;
        break;
      case "pinhole":
        y2 -= img2.pinholeY;
        anchor2 = "pinhole" + anchor2;
        break;
      case "baseline":
        y2 -= img2.alphaBaseline;
        anchor2 = "baseline" + anchor2;
        break;
      case "bottom":
        y2 -= img2.height;
        anchor2 = "bottom" + anchor2;
        break;
      default:
        throw new Error(`Unknown YPlace option for image1: ${placeY1}`);
    }
  }

  /**
   * OverlayImage static constructor
   * @param {HTMLImageElement} img1
   * @param {"left"|"middle"|"pinhole"|"right"} placeX1
   * @param {"top"|"center"|"pinhole"|"baseline"|"bottom"} placeY1
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {HTMLImageElement} img2
   * @param {"left"|"middle"|"pinhole"|"right"} placeX2
   * @param {"top"|"center"|"pinhole"|"baseline"|"bottom"} placeY2
   */
  static new(img1, placeX1, placeY1, offsetX, offsetY, img2, placeX2, placeY2) {
    return new OverlayImage(
      img1,
      placeX1,
      placeY1,
      offsetX,
      offsetY,
      img2,
      placeX2,
      placeY2
    );
  }
}
