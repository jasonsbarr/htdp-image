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
import { colorAlpha, colorBlue, colorGreen, colorRed } from "./utils.js";

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

const clone = Utils.clone;
const colorDb = new ColorDB();

const isColorOrColorString = (val) =>
  isColor(val) || typeof colorDb.get(val) !== "undefined";

const colorString = (color, style) => {
  const styleAlpha = isNaN(style) ? 1.0 : style;
  const cAlpha = colorAlpha(color);

  // note: flooring the numbers here to make sure it's a valid rgba string
  return `rgba(${Math.floor(colorRed(color))}, ${Math.floor(
    colorGreen(color)
  )}, ${Math.floor(colorBlue(color))}, ${styleAlpha * cAlpha})`;
};

for (let [name, value] of Object.entries(Colors)) {
  name = name.toUpperCase();

  if (isColor(value)) {
    colorDb.put(name, value);
  }
}

/**
 * Given an array of {x, y} pairs, unzip them into separate arrays
 */
const unzipVertices = (vertices) => {
  return {
    xs: vertices.map((v) => v.x),
    ys: vertices.map((v) => v.y),
  };
};

/**
 * Given an array of vertices, find the width of the shape
 */
const findWidth = (vertices) => {
  const { xs } = unzipVertices(vertices);
  return Math.max(...xs) - Math.min(...xs);
};

/**
 * Given an array of vertices, find the height of the image
 */
const findHeight = (vertices) => {
  const { ys } = unzipVertices(vertices);
  return Math.max(...ys) - Math.min(...ys);
};

/**
 * Given a list of vertices and a translation x/y, shift them
 */
const translateVertices = (vertices, translation = null) => {
  const vs = unzipVertices(vertices);
  const translateX = -Math.min(...vs.xs);
  const translateY = -Math.min(...vs.ys);

  if (translation) {
    translation.x = translateX;
    translation.y = translateY;
  }

  return vertices.map((v) => ({ x: v.x + translateX, y: v.y + translateY }));
};

/**
 * Constructs a canvas from a given width and height
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
const makeCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  return canvas;
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
