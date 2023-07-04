import { findHeight, findWidth, imageEquals } from "../utils.js";
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
  #vertices;

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
    super();

    // To find where to place the two images relative to one another
    // start in a coordinate system with origin at top/left corners
    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0;
    let anchor1, anchor2;

    // compute the x1/y1 and x2/y2 offsets, relative to the top/left of img1/img2:
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

    // Next, offset x2/y2 by the given offsetX/Y
    const xMax = Math.max(img1.width, img2.width);
    const yMax = Math.max(img1.height, img2.height);

    x1 += xMax;
    x2 += xMax;
    y1 += yMax;
    y2 += yMax;

    // Last, translate both offset pairs so that none are negative
    const xMin = Math.min(x1, x2);
    const yMin = Math.min(y1, y2);

    x1 -= xMin;
    x2 -= xMin;
    y1 -= yMin;
    y2 -= yMin;

    // calculate the vertices of this image by translating the vertices of the sub-images
    let i;
    let v1 = img1.vertices;
    let v2 = img2.vertices;
    let xs = [];
    let ys = [];

    v1 = v1.map((v) => ({ x: v.x + x1, y: v.y + y1 }));
    v2 = v2.map((v) => ({ x: v.x + x2, y: v.y + y2 }));

    // store the vertices as something private, so this.vertices will still return null
    this.#vertices = v1.concat(v2);

    // store the offsets for rendering
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.img1 = img1;
    this.img2 = img2;
    this.pinholeX = img1.pinholeX + x1;
    this.pinholeY = img1.pinholeY + y1;
    this.alphaBaseline = img1._alphaBaseline
      ? img1.alphaBaseline + y1
      : img2.alphaBaseline + y2;

    let shiftText = "";

    if (offsetX > 0) {
      shiftText += `shifted right by ${offsetX}`;
    } else if (offsetX < 0) {
      shiftText += `shifted left by ${-offsetX}`;
    }

    if (shiftText !== "") {
      shiftText += ", and ";
    }

    if (offsetY > 0) {
      shiftText += `shifted up by ${offsetY}`;
    } else if (offsetY < 0) {
      shiftText += `shifted down by ${-offsetY}`;
    }

    if (shiftText !== "") {
      shiftText = `, and ${shiftText}`;
    }

    this.width = findWidth(this.#vertices);
    this.height = findHeight(this.#vertices);
    this.ariaText = `an overlay: first image is ${img1.ariaText}, second image is ${img2.ariaText}, aligning ${anchor1} of first image with ${anchor2} of second image${shiftText}`;
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

  /**
   * @returns {{x: number; y: number}[]}
   */
  get vertices() {
    return this.#vertices;
  }

  /**
   * Equality check with other image
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof OverlayImage &&
        this.width === other.width &&
        this.height === other.height &&
        this.x1 === other.x1 &&
        this.y1 === other.y1 &&
        this.x2 === other.x2 &&
        this.y2 === other.y2 &&
        imageEquals(this.img1, other.img1) &&
        imageEquals(this.img2, other.img2)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders an OverlayImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.translate(this.x2, this.y2);
    this.img2.render();
    ctx.restore();
    ctx.save();
    ctx.translate(this.x1, this.y1);
    this.img1.render();
    ctx.restore();
  }
}
