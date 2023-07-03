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
import {
  colorAlpha,
  colorBlue,
  colorGreen,
  colorRed,
  unzipVertices,
  findWidth,
  findHeight,
  translateVertices,
  colorString,
  makeCanvas,
} from "./utils.js";

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

const clone = Utils.clone;
const colorDb = new ColorDB();

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
  constructor({
    width = 0,
    height = 0,
    pinholeX = 0,
    pinholeY = 0,
    alphaBaseline = 0,
    vertices = [
      { x: 0, y: 0 },
      { x: this.width, y: 0 },
      { x: 0, y: this.height },
      { x: this.width, y: this.height },
    ],
  } = {}) {
    this._width = width;
    this._height = height;
    this._pinholeX = pinholeX;
    this._pinholeY = pinholeY;
    this._alphaBaseline = alphaBaseline;
    this._vertices = vertices;
  }
  /**
   * @returns {number}
   */
  get alphaBaseline() {
    return this._alphaBaseline !== 0 ? this._alphaBaseline : this.height;
  }

  /**
   * Sets alpha baseline
   * @param {number} val
   */
  set alphaBaseline(val) {
    this._alphaBaseline = val;
  }

  /**
   * Image height
   * @returns {number}
   */
  get height() {
    return Math.round(this._height);
  }

  /**
   * Sets height
   * @param {number} val
   */
  set height(val) {
    this._height = val;
  }

  /**
   * Image pinholeX value
   * @returns {number}
   */
  get pinholeX() {
    return this._pinholeX;
  }

  /**
   * Sets pinholeX
   * @param {number} val
   */
  set pinholeX(val) {
    this._pinholeX = val;
  }

  /**
   * Image pinholeY value
   * @returns {number}
   */
  get pinholeY() {
    return this._pinholeY;
  }

  /**
   * Sets pinholeY
   * @param {number} val
   */
  set pinholeY(val) {
    this._pinholeY = val;
  }

  /**
   * Vertices
   * @returns {{x: number, y: number}[]}
   */
  get vertices() {
    return this._vertices;
  }

  /**
   * Sets vertices
   * @param {{x: number; y: number}[]} vs
   */
  set vertices(vs) {
    this._vertices = vs;
  }

  /**
   * Image width
   * @returns {number}
   */
  get width() {
    return Math.round(this._width);
  }

  /**
   * Setter for image width
   * @param {number} val
   */
  set width(val) {
    this._width = val;
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
   * @param {CanvasRenderingContext2D & {isEqualityTest: boolean}} ctx
   */
  render(ctx) {
    if (!this._vertices) {
      throw new Error("render method not implemented for this type");
    }

    ctx.save();
    ctx.beginPath();

    let isSolid = this.style.toLowerCase() !== "outline";
    let vertices;

    if (isSolid || ctx.isEqualityTest) {
      // disable offsetting
      vertices = this.vertices;
    } else {
      // offset vertices for browsers that don't support pixel-perfect vertices
      const midX = findHeight(this.vertices) / 2;
      const midY = findWidth(this.vertices) / 2;

      // compute 0.5px offsets to ensure we draw on the pixel, not on its boundary
      vertices = this.vertices.map((v) => ({
        x: v.x + (v.x < midX ? 0.5 : -0.5),
        y: v.y + (v.y < midY ? 0.5 : -0.5),
      }));
    }

    ctx.moveTo(vertices[0].x, vertices[0].y);
    vertices.forEach((v) => {
      ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();

    if (isSolid) {
      ctx.fillStyle = colorString(this.color, this.style);
      ctx.fill();
    } else {
      ctx.strokeStyle = colorString(this.color);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * To displayed string
   * @returns {string}
   */
  toDisplayedString(cache) {
    return "<image>";
  }

  /**
   * Images are expected to define a render method, used here to draw to the canvas
   * @returns {HTMLCanvasElement}
   */
  toDomNode(params) {
    const width = this.width;
    const height = this.height;
    const canvas = makeCanvas(width, height);
    const ctx = canvas.getContext("2d");

    this.render(ctx);
    canvas.ariaValueText = this.ariaText || "image";
    return canvas;
  }

  /**
   * To written string
   * @returns {string}
   */
  toWrittenString(cache) {
    return "<image>";
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
