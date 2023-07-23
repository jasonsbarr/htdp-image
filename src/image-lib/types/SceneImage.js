import equals from "fast-deep-equal/es6/index.js";
import { BaseImage } from "./BaseImage.js";
import { colorString } from "../utils.js";

/**
 * @typedef {[BaseImage number number]} Child
 */
/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */
/**
 * Scene images box in a scene
 * @class
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
   * @param {Color} color
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

  /**
   * Static onstructor for SceneImage
   * @param {number} width
   * @param {number} height
   * @param {Child[]} children
   * @param {boolean} withBorder
   * @param {Color} color
   */
  static new(width, height, children, withBorder, color) {
    return new SceneImage(width, height, children, withBorder, color);
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
        [[image, x - image.width / 2, y - image.height / 2]],
      ]),
      this.withBorder,
      this.color
    );
  }

  /**
   * Checks if other is equal to self
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof SceneImage &&
        this.width === other.width &&
        this.height === other.height &&
        equals(this.color, other.color) &&
        this.children.length === other.children.length &&
        this.children.every((child1, i) => {
          const child2 = other.children[i];

          return (
            child1[1] === child2[1] &&
            child1[2] === child2[2] &&
            child1[0].equals(child2[0])
          );
        })) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders a SceneImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    // create a clipping region around the boundaries of the scene
    ctx.save();
    ctx.fillStyle = colorString(this.color, this.style);
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
