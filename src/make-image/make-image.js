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
 * @returns {ImageLib.OverlayImage}
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

/**
 * Overlay a list of images with x and y alignment into a single image
 * @param {XPlace} placeX
 * @param {YPlace} placeY
 * @param {ImageLib.BaseImage[]} imgs
 * @returns {ImageLib.OverlayImage}
 */
export const overlayAlignList = (placeX, placeY, imgs) =>
  imgs.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      acc,
      placeX,
      placeY,
      0,
      0,
      img,
      placeX,
      placeY
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Makes an overlay image from 2 images with offsets
 * @param {ImageLib.BaseImage} img1
 * @param {XPlace} placeX1
 * @param {YPlace} placeY1
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {ImageLib.BaseImage} img2
 * @param {XPlace} placeX2
 * @param {YPlace} placeY2
 * @returns {ImageLib.OverlayImage}
 */
export const overlayOntoOffset = (
  img1,
  placeX1,
  placeY1,
  offsetX,
  offsetY,
  img2,
  placeX2,
  placeY2
) =>
  ImageLib.makeOverlayImage(
    img1,
    placeX1,
    placeY1,
    offsetX,
    offsetY,
    img2,
    placeX2,
    placeY2
  );

/**
 * Makes an underlay image
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const underlay = (img1, img2) =>
  ImageLib.makeOverlayImage(
    img2,
    XPlace.Pinhole,
    YPlace.Pinhole,
    0,
    0,
    img1,
    XPlace.Pinhole,
    YPlace.Pinhole
  );

/**
 * Creates an underlay image from a list of images
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const underlayList = (images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      img,
      XPlace.Pinhole,
      YPlace.Pinhole,
      0,
      0,
      acc,
      XPlace.Pinhole,
      YPlace.Pinhole
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Make an underlay image offset by dx and dy
 * @param {ImageLib.BaseImage} img1
 * @param {number} dx
 * @param {number} dy
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const underlayXY = (img1, dx, dy, img2) =>
  ImageLib.makeOverlayImage(
    img2,
    XPlace.Left,
    YPlace.Top,
    -dx,
    -dy,
    img1,
    XPlace.Left,
    YPlace.Top
  );

/**
 * Constructs an underlay aligned image from a list of images
 * @param {XPlace} placeX
 * @param {YPlace} placeY
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const underlayAlignList = (placeX, placeY, images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      img,
      placeX,
      placeY,
      0,
      0,
      acc,
      placeX,
      placeY
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Places one image beside another
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const beside = (img1, img2) =>
  ImageLib.makeOverlayImage(
    img1,
    XPlace.Right,
    YPlace.Center,
    0,
    0,
    img2,
    XPlace.Left,
    YPlace.Center
  );

/**
 * Turns a list of images into a beside image
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const besideList = (images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      acc,
      XPlace.Right,
      YPlace.Center,
      0,
      0,
      img,
      XPlace.Left,
      YPlace.Center
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Sets 2 images next to each other based on placeY alignment
 * @param {YPlace} placeY
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const besideAlign = (placeY, img1, img2) =>
  ImageLib.makeOverlayImage(
    img1,
    XPlace.Right,
    placeY,
    0,
    0,
    img2,
    XPlace.Left,
    placeY
  );

/**
 * Creates an aligned beside image from a list of images
 * @param {YPlace} placeY
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const besideAlignList = (placeY, images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.OverlayImage(
      acc,
      XPlace.Right,
      placeY,
      0,
      0,
      img,
      XPlace.Left,
      placeY
    );
  }, ImageLib.SceneImage(0, 0, [], false, Colors.transparent));

/**
 * Places one image above another
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const above = (img1, img2) =>
  ImageLib.makeOverlayImage(
    img1,
    XPlace.Middle,
    YPlace.Bottom,
    0,
    0,
    img2,
    XPlace.Middle,
    YPlace.Top
  );

/**
 * Creates an above image out of a list of images
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const aboveList = (images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      acc,
      XPlace.Middle,
      YPlace.Bottom,
      0,
      0,
      img,
      XPlace.Middle,
      YPlace.Top
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Place an image above another based on placeX alignment
 * @param {XPlace} placeX
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const aboveAlign = (placeX, img1, img2) =>
  ImageLib.makeOverlayImage(
    img1,
    placeX,
    YPlace.Bottom,
    0,
    0,
    img2,
    placeX,
    YPlace.Top
  );

/**
 * Creates above image from a list of images based on placeX alignment
 * @param {XPlace} placeX
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const aboveAlignList = (placeX, images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      acc,
      placeX,
      YPlace.Bottom,
      0,
      0,
      img,
      placeX,
      YPlace.Top
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Places one image below another
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const below = (img1, img2) =>
  ImageLib.makeOverlayImage(
    img2,
    XPlace.Middle,
    YPlace.Bottom,
    0,
    0,
    img1,
    XPlace.Middle,
    YPlace.Top
  );

/**
 * Makes a below image from a list of images
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const belowList = (images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      img,
      XPlace.Middle,
      YPlace.Bottom,
      0,
      0,
      acc,
      XPlace.Middle,
      YPlace.Top
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Places 1 image below the other based on placeX alignment
 * @param {XPlace} placeX
 * @param {ImageLib.BaseImage} img1
 * @param {ImageLib.BaseImage} img2
 * @returns {ImageLib.OverlayImage}
 */
export const belowAlign = (placeX, img1, img2) =>
  ImageLib.makeOverlayImage(
    img1,
    placeX,
    YPlace.Bottom,
    0,
    0,
    img2,
    placeX,
    YPlace.Top
  );

/**
 * Makes a below image out of a list of images aligned according to placeX
 * @param {ImageLib.BaseImage[]} images
 * @returns {ImageLib.OverlayImage}
 */
export const belowAlignList = (placeX, images) =>
  images.reduce((acc, img, i) => {
    if (i === 0) {
      return img;
    }

    return ImageLib.makeOverlayImage(
      img,
      placeX,
      YPlace.Bottom,
      0,
      0,
      acc,
      placeX,
      YPlace.Top
    );
  }, ImageLib.makeSceneImage(0, 0, [], false, Colors.transparent));

/**
 * Creates a new image with the pinhole offset by dx, dy
 * @param {number} dx
 * @param {number} dy
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.BaseImage}
 */
export const movePinhole = (dx, dy, img) => img.offsetPinhole(dx, dy);

/**
 * Creates an empty scene
 * @param {number} width
 * @param {number} height
 * @returns {ImageLib.SceneImage}
 */
export const emptyScene = (width, height) =>
  ImageLib.makeSceneImage(width, height, [], true, Colors.transparent);

/**
 * Creates an empty scene with the specified color
 * @param {number} width
 * @param {number} height
 * @param {Color|string} color
 * @returns {ImageLib.SceneImage}
 */
export const emptyColorScene = (width, height, color) =>
  ImageLib.makeSceneImage(width, height, [], true, toColor(color));

/**
 * Puts an image on a background image at x and y coordinates
 * @param {ImageLib.BaseImage} picture
 * @param {number} x
 * @param {number} y
 * @param {ImageLib.BaseImage} background
 * @returns {ImageLib.SceneImage}
 */
export const putImage = (picture, x, y, background) => {
  if (ImageLib.isScene(background)) {
    return background.add(picture, x, background.height - y);
  }

  let newScene = ImageLib.makeSceneImage(
    background.width,
    background.height,
    [],
    false,
    Colors.transparent
  );
  newScene = newScene.add(
    background,
    background.width / 2,
    background.height / 2
  );
  newScene = newScene.add(picture, x, background.height - y);

  return newScene;
};

/**
 * Places an image on a background image
 * @param {ImageLib.BaseImage} picture
 * @param {number} x
 * @param {number} y
 * @param {ImageLib.BaseImage} background
 * @returns {ImageLib.SceneImage}
 */
export const placeImage = (picture, x, y, background) => {
  if (ImageLib.isScene(background)) {
    return background.add(picture, x, y);
  }

  let newScene = ImageLib.makeSceneImage(
    background.width,
    background.height,
    [],
    false,
    Colors.transparent
  );
  newScene = newScene.add(
    background,
    background.width / 2,
    background.height / 2
  );
  newScene = newScene.add(picture, x, y);

  return newScene;
};

export const translate = placeImage;
