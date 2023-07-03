import {
  Colors,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
} from "../shared/index.js";
import { BaseImage } from "./BaseImage.js";
import { SceneImage } from "./SceneImage.js";
import { TextImage } from "./TextImage.js";

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

/**
 * An image that is taken from a file
 * @class
 * @prop {string} src
 * @prop {boolean} isLoaded
 * @prop {HTMLImageElement} img
 * @prop {HTMLImageElement|undefined} animationHackImg
 */
export class FileImage extends BaseImage {
  static imageCache = {};

  /**
   * Constructs a FileImage
   * @param {string} src
   * @param {HTMLImageElement} rawImage
   */
  constructor(src, rawImage) {
    super({ ariaText: `image file from ${decodeURIComponent(src).slice(16)}` });

    let self = this;

    this._src = src;
    this._isLoaded = false;

    if (rawImage && rawImage.complete) {
      this._img = rawImage;
      this._isLoaded = true;
      self.width = this.img.width;
      self.height = this.img.height;
      self.pinholeX = this.width / 2;
      self.pinholeY = this.height / 2;
    } else {
      this._img = new Image();
      this.img.onload = function () {
        self._isLoaded = true;
        self.width = self.img.width;
        self.height = self.img.height;
        self.pinholeX = self.width / 2;
        self.pinholeY = self.height / 2;
      };
      this.img.onerror = function (e) {
        self.img.onerror = "";
        self.img.src = "http://www.wescheme.org/images/broken.png";
      };

      this.img.src = src;
    }
  }

  static installBrokenImage(src) {
    imageCache[path] = TextImage.new(
      "Unable to load " + path,
      10,
      colorDb.get("red"),
      "normal",
      "Optimer",
      "",
      "",
      false
    );
  }

  /**
   * Installs a FileImage in the cache
   * @param {string} src
   * @param {HTMLImageElement} rawImage
   */
  static installInstance(src, rawImage) {
    FileImage.imageCache[src] = new FileImage(src, rawImage);
  }

  /**
   * Static constructor that handles cache
   * @param {string} src
   * @param {HTMLImageElement} rawImage
   * @returns {FileImage}
   */
  static new(src, rawImage) {
    if (!path in FileImage.imageCache) {
      FileImage.imageCache[src] = new FileImage(src, rawImage);
    }

    return FileImage.imageCache[src];
  }

  /**
   * @returns {HTMLImageElement}
   */
  get animationHackImg() {
    return this._animationHackImg;
  }

  get img() {
    return this._img;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  get src() {
    return this._src;
  }

  /**
   * Equality check for FileImage
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof FileImage && other.src === this.src) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Hack to allow animated GIFs to show as animating on canvas
   */
  installHackToSupportAnimatedGifs() {
    if (this.animationHackImg) {
      return;
    }

    this._animationHackImg = this.img.cloneNode(true);
    document.body.appendChild(this.animationHackImg);
    this.animationHackImg.style.position = "absolute";
    this.animationHackImg.style.top = "-50000px";
  }

  /**
   * Render a FileImage to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.installHackToSupportAnimatedGifs();
    ctx.drawImage(this.animationHackImg, 0, 0);
  }
}

export {
  BaseImage,
  SceneImage,
  TextImage,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
};
