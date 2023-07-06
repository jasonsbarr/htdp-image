import {
  Colors,
  FontFamily,
  FontStyle,
  FontWeight,
  Point,
  XPlace,
  YPlace,
  FillMode,
} from "../shared/index.js";
import * as ImageLib from "../image-lib/index.js";

/**
 * @typedef {import("../shared/index.js").Colors.Color} Color
 */
/**
 * @typedef {"solid"|"outline"|number|FillMode} Fill
 */

const toFillMode = FillMode.toFillMode;

/**
 * Converts a string to color or passes a color through
 * @param {Color|string} val
 * @returns {Color}
 */
const toColor = (val) => {
  if (Colors.isColor(val)) {
    return val;
  }

  return ImageLib.stringToColor(val);
};

/**
 * Makes a circle image
 * @param {number} radius
 * @param {Fill} mode
 * @param {Color} color
 * @returns {ImageLib.EllipseImage}
 */
export const circle = (radius, mode, color) =>
  ImageLib.makeCircleImage(radius, toFillMode(mode), toColor(color));

/**
 * Makes a simple text image with sensible defaults
 * @param {string} str
 * @param {number} size
 * @param {Color|string} color
 * @returns {ImageLib.TextImage}
 */
export const text = (str, size, color) =>
  ImageLib.makeTextImage(
    str,
    size,
    toColor(color),
    "Arial",
    FontFamily.Default,
    FontStyle.Normal,
    FontWeight.Normal,
    false
  );

/**
 * Makes a text image with all options set
 * @param {number} str
 * @param {number} size
 * @param {Color|string} color
 * @param {string} face
 * @param {FontFamily} family
 * @param {FontStyle} style
 * @param {FontWeight} weight
 * @param {boolean} underline
 * @returns {ImageLib.TextImage}
 */
export const textFont = (
  str,
  size,
  color,
  face,
  family,
  style,
  weight,
  underline
) =>
  ImageLib.makeTextImage(
    str,
    size,
    toColor(color),
    face,
    family,
    style,
    weight,
    underline
  );

export const overlay = (img1, img2) =>
  ImageLib.makeOverlayImage(
    img1,
    XPlace.Pinhole,
    YPlace.Pinhole,
    0,
    0,
    img2,
    XPlace.Pinhole,
    YPlace.Pinhole
  );

/**
 * Makes a single image from a list of images
 * @param {ImageLib.BaseImage[]} imgs
 * @returns {ImageLib.SceneImage}
 */
export const overlayList = (imgs) => {
  return imgs.reduce((acc, img, i) => {
    if (i === 0) return img;
    else {
      return ImageLib.makeOverlayImage(
        acc,
        XPlace.Pinhole,
        YPlace.Pinhole,
        0,
        0,
        img,
        XPlace.Pinhole,
        YPlace.Pinhole
      );
    }
  }, ImageLib.makeSceneImage(0, 0, [], false, ImageLib.colorDb.get("transparent")));
};

/**
 * Makes an overlay image with a defined relative point for the overlaid image
 * @param {ImageLib.BaseImage} img1
 * @param {number} dx
 * @param {number} dy
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const overlayXY = (img1, dx, dy, img2) =>
  ImageLib.makeOverlayImage(
    img1,
    XPlace.Left,
    YPlace.Top,
    dx,
    dy,
    img2,
    XPlace.Left,
    YPlace.Top
  );

/**
 * Makes an overlay image where you set the alignment
 * @param {XPlace} placeX
 * @param {YPlace} placeY
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const overlayAlign = (placeX, placeY, img1, img2) =>
  ImageLib.makeOverlayImage(img1, placeX, placeY, 0, 0, img2, placeX, placeY);
