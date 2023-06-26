import {
  Colors,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  Utils,
  XPlace,
  YPlace,
} from "../shared/index.js";
import { ColorDB } from "./ColorDB.js";

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

const clone = Utils.clone;
const colorDb = new ColorDB();

for (let [name, value] of Object.entries(Colors)) {
  name = name.toUpperCase();

  if (isColor(value)) {
    colorDb.put(name, value);
  }
}

/**
 * Base class for all images
 * @class
 * @prop {number} height
 * @prop {number} width
 * @prop {number} pinholeX
 * @prop {number} pinholeY
 * @prop {number} alphaBaseline
 */
class BaseImage {
  /**
   * @returns {number}
   */
  get alphaBaseline() {
    return typeof this._alphaBaseline !== "undefined"
      ? this._alphaBaseline
      : this.height;
  }

  /**
   * Image height
   * @returns {number}
   */
  get height() {
    return Math.round(this._height);
  }

  /**
   * Image pinholeX value
   * @returns {number}
   */
  get pinholeX() {
    return typeof this._pinholeX !== "undefined" ? this._pinholeX : 0;
  }

  /**
   * Image pinholeY value
   * @returns {number}
   */
  get pinholeY() {
    return typeof this._pinholeY !== "undefined" ? this._pinholeY : 0;
  }

  /**
   * Vertices
   * @returns {{x: number, y: number}[]}
   */
  get vertices() {
    return typeof this._vertices !== "undefined"
      ? this._vertices
      : [
          { x: 0, y: 0 },
          { x: this.width, y: 0 },
          { x: 0, y: this.height },
          { x: this.width, y: this.height },
        ];
  }

  /**
   * Image width
   * @returns {number}
   */
  get width() {
    return Math.round(this._width);
  }

  /**
   * Calculates a new pinhole value
   * @param {number} dx
   * @param {number} dy
   * @returns {BaseImage}
   */
  offsetPinhole(dx, dy) {
    let copy = clone(this);
    copy.pinholeX += dx;
    copy.pinholeY += dy;
    return copy;
  }

  /**
   * Renders the image in its local coordinate system
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    if (!this._vertices) {
      throw new Error("render method not implemented for this type");
    }
  }

  /**
   * Updates pinhole value and returns a new image
   * @param {number} x
   * @param {number} y
   * @returns {BaseImage}
   */
  updatePinhole(x, y) {
    let copy = clone(this);
    copy.pinholeX = x;
    copy.pinholeY = y;
    return copy;
  }
}

export { FillMode, FontFamily, FontStyle, FontWeight, XPlace, YPlace };
