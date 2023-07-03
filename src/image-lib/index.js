import { BaseImage } from "./BaseImage.js";
import {
  Colors,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
} from "../shared/index.js";
import { colorString } from "./utils.js";

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

/**
 * @typedef {[BaseImage number number]} Child
 */
/**
 * Scene images box in a scene
 * @prop {Child[]} children
 * @prop {boolean} withBorder
 */
export class SceneImage extends BaseImage {
  /**
   * Constructor for SceneImage
   * @param {number} width
   * @param {number} height
   * @param {Child[]} children
   * @param {boolean} withBorder
   * @param {string} color
   */
  constructor(width, height, children, withBorder, color) {
    super({
      width,
      height,
      color,
      ariaText: `Scene that is ${width} by ${height}`,
      pinholeX: width / 2,
      pinholeY: height / 2,
    });

    this._children = children;
    this._withBorder = withBorder;
    this._ariaText +=
      ". " +
      children
        .map(
          (c, i) =>
            `Child ${i + 1}: ${c[0].ariaText}, positioned at ${c[1]}, ${c[2]}`
        )
        .join(". ");
  }

  get children() {
    return this._children;
  }

  get withBorder() {
    return this._withBorder;
  }

  /**
   * Adds an image to the scene
   * @param {BaseImage} image
   * @param {number} x
   * @param {number} y
   * @returns {SceneImage}
   */
  add(image, x, y) {
    return new SceneImage(
      this.width,
      this.height,
      this.children.concat([
        [image, x - image.width / 2, y - image.height / 2],
      ]),
      this.withBorder,
      this.color
    );
  }

  /**
   * Renders a SceneImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    // create a clipping region around the boundaries of the scene
    ctx.save();
    ctx.fillStyle = colorString(this.color);
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();

    // save the context, reset the path, and clip to the path around the scene edge
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.clip();

    // ask every image to render itself within the region
    this.children.forEach((child) => {
      let childImage = child[0];
      let childX = child[1];
      let childY = child[2];

      ctx.save();
      ctx.translate(childX, childY);
      childImage.render(ctx);
      ctx.restore();
    });

    // unclip
    ctx.restore();

    if (this.withBorder) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(0, 0, this.width, this.height);
    }
  }
}

export {
  BaseImage,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
};
