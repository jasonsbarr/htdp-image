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

  get animationHackImg() {
    return this._animationHackImg;
  }

  set animationHackImg(image) {
    this._animationHackImg = image;
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
}

export {
  BaseImage,
  SceneImage,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
};
