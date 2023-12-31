import {
  Colors,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
  FillMode,
  makeDocument,
} from "../shared/index.js";
import * as ImageLib from "../image-lib/index.js";
import { canonicalizeAngle, convertPointsToCartesian, less } from "./utils.js";
import { cosRel, excess } from "./trig.js";

const document = makeDocument();

/**
 * @typedef {import("../shared/index.js").Colors.Color} Color
 */
/**
 * @typedef {"solid"|"outline"|number|FillMode} Fill
 */

const toFillMode = FillMode.toFillMode.bind(FillMode);

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
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.EllipseImage}
 */
export const circle = (radius, mode, color) =>
  ImageLib.makeCircleImage(radius, toFillMode(mode), toColor(color));

/**
 * Makes a file image from a source URL
 * @param {string} src
 * @returns {ImageLib.FileImage}
 */
export const imageURL = (src) => {
  const rawImage = document.createElement("img");
  rawImage.src = src;

  return ImageLib.makeFileImage(src, rawImage);
};

export const bitmapURL = imageURL;

/**
 * Makes a file video from a source URL
 * @param {string} src
 * @returns {ImageLib.FileVideo}
 */
export const videoURL = (src) => {
  const rawVideo = document.createElement("video");
  rawVideo.src = src;

  return ImageLib.makeFileVideo(src, rawVideo);
};

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
 * Puts an image on a background image at x and y coordinates relative to the bottom left
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
 * Places an image on a background image with x and y coordinates relative to the top left
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

/**
 * Places the pinhole of img at x, y
 * @param {number} x
 * @param {number} y
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.BaseImage}
 */
export const placePinhole = (x, y, img) => img.updatePinhole(x, y);

/**
 * Centers the pinhole of img
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.BaseImage}
 */
export const centerPinhole = (img) =>
  img.updatePinhole(img.width / 2, img.height / 2);

/**
 * Places an image in alignment with x, y according to placeX and placeY
 * @param {ImageLib.BaseImage} img
 * @param {number} x
 * @param {number} y
 * @param {XPlace} placeX
 * @param {YPlace} placeY
 * @param {ImageLib.BaseImage} background
 * @returns {ImageLib.SceneImage}
 */
export const placeImageAlign = (img, x, y, placeX, placeY, background) => {
  if (placeX === XPlace.Left) {
    x += img.width / 2;
  } else if (placeX === XPlace.Right) {
    x -= img.width / 2;
  }

  if (placeY === YPlace.Top) {
    y += img.height / 2;
  } else if (placeY === YPlace.Bottom) {
    y -= img.height / 2;
  }

  if (ImageLib.isScene(background)) {
    return background.add(img, x, y);
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
  newScene = newScene.add(img, x, y);

  return newScene;
};

/**
 * Rotates an image by angle
 * @param {number} angle
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.RotateImage}
 */
export const rotate = (angle, img) => {
  angle = canonicalizeAngle(angle);
  return ImageLib.makeRotateImage(-angle, img);
};

/**
 * Scales an image both horizontally and vertically by factor
 * @param {number} factor
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.ScaleImage}
 */
export const scale = (factor, img) =>
  ImageLib.makeScaleImage(factor, factor, img);

/**
 * Scales an image horizontally by x and vertically by y
 * @param {number} xFactor
 * @param {number} yFactor
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.ScaleImage}
 */
export const scaleXY = (xFactor, yFactor, img) =>
  ImageLib.makeScaleImage(xFactor, yFactor, img);

/**
 * Flips an image horizontally
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.FlipImage}
 */
export const flipHorizontal = (img) =>
  ImageLib.makeFlipImage(img, "horizontal");

/**
 * Flips an image vertically
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.FlipImage}
 */
export const flipVertical = (img) => ImageLib.makeFlipImage(img, "vertical");

export const reflectY = flipHorizontal;

export const reflectX = flipVertical;

/**
 * Creates a frame around an image
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.FrameImage}
 */
export const frame = (img) => ImageLib.makeFrameImage(img);

/**
 * Draws the pinhole on an image
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.PinholeImage}
 */
export const drawPinhole = (img) => ImageLib.makePinholeImage(img);

/**
 * Crops an image to the specified dimensions
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {ImageLib.BaseImage} img
 * @returns {ImageLib.CropImage}
 */
export const crop = (x, y, width, height, img) =>
  ImageLib.makeCropImage(x, y, width, height, img);

/**
 * Draws a line from the origin (0, 0) to x, y
 * @param {number} x
 * @param {number} y
 * @param {string|Color} c
 * @returns {ImageLib.LineImage}
 */
export const line = (x, y, c) => ImageLib.makeLineImage(x, y, toColor(c));

/**
 * Draws a line over an image from x1, y1 to x2, y2
 * @param {ImageLib.BaseImage} img
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {string|Color} c
 * @returns {ImageLib.OverlayImage}
 */
export const addLine = (img, x1, y1, x2, y2, c) => {
  const line = ImageLib.makeLineImage(x2 - x1, y2 - y1, toColor(c));
  const leftmost = Math.min(x1, x2);
  const topmost = Math.min(y1, y2);

  return ImageLib.makeOverlayImage(
    line,
    XPlace.Middle,
    YPlace.Center,
    -leftmost,
    -topmost,
    img,
    XPlace.Middle,
    YPlace.Center
  );
};

/**
 * Overlays a line over an image and constructs a scene to hold them
 * @param {ImageLib.BaseImage} img
 * @param {number} x1
 * @param {number} y2
 * @param {number} x2
 * @param {number} y2
 * @param {string|Color} c
 * @returns {ImageLib.SceneImage}
 */
export const sceneLine = (img, x1, y1, x2, y2, c) => {
  const line = ImageLib.makeLineImage(x2 - x1, y2 - y1, toColor(color));
  let newScene = ImageLib.makeSceneImage(
    img.width,
    img.height,
    [],
    true,
    Colors.transparent
  );

  newScene = newScene.add(img, img.width / 2, img.height / 2);

  const leftmost = Math.min(x1, x2);
  const topmost = Math.min(y1, y2);

  return newScene.add(
    line,
    line.width / 2 + leftmost,
    line.height / 2 + topmost
  );
};

/**
 * Makes a square image
 * @param {number} side
 * @param {FillMode|string|number} mode
 * @param {string|Color} color
 */
export const square = (side, mode, color) =>
  ImageLib.makeSquareImage(side, toFillMode(mode), toColor(color));

/**
 * Makes a rectangle image
 * @param {number} width
 * @param {number} height
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.RectangleImage}
 */
export const rectangle = (width, height, mode, color) =>
  ImageLib.makeRectangleImage(width, height, toFillMode(mode), toColor(color));

/**
 * Creates a regular polygon image with count points and sides of length length
 * @param {number} length
 * @param {number} count
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.RegularPolygonImage}
 */
export const regularPolygon = (length, count, mode, color) =>
  ImageLib.makeRegularPolygonImage(
    length,
    count,
    1,
    toFillMode(mode),
    toColor(color),
    true
  );

/**
 * Creates a point polygon image from a list of x, y coordinates
 * @param {import("../shared/types/Point.js").PointXY[]} points
 * @param {FillMode|string|number} mode
 * @param {string|Color} color
 * @returns {ImageLib.PointPolygonImage}
 */
export const pointPolygon = (points, mode, color) =>
  ImageLib.makePointPolygonImage(
    convertPointsToCartesian(points),
    toFillMode(mode),
    toColor(color)
  );

/**
 * Creates an ellipse image
 * @param {number} width
 * @param {number} height
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.EllipseImage}
 */
export const ellipse = (width, height, mode, color) =>
  ImageLib.makeEllipseImage(width, height, toFillMode(mode), toColor(color));

/**
 * Creates a wedge image
 * @param {number} r
 * @param {number} angle
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.WedgeImage}
 */
export const wedge = (r, angle, mode, color) =>
  ImageLib.makeWedgeImage(r, angle, toFillMode(mode), toColor(color));

/**
 * Creates an equilateral triangle
 * @param {number} side
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangle = (side, mode, color) =>
  ImageLib.makeTriangleImage(
    side,
    360 - 60,
    side,
    toFillMode(mode),
    toColor(color)
  );

const sidesDontFit = (sideA, sideB, sideC) =>
  less(sideA + sideC, sideB) ||
  less(sideB + sideC, sideA) ||
  less(sideA + sideB, sideC);

/**
 * Creates a triangle image from 2 sides and an angle
 * @param {number} sideA
 * @param {number} angleB
 * @param {number} sideC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangleSAS = (sideA, angleB, sideC, mode, color) => {
  const sideB2 = cosRel(sideA, sideC, angleB);
  const sideB = Math.sqrt(sideB2);

  if (sideB2 <= 0) {
    throw new Error("The given side, angle, and side will not form a triangle");
  } else if (sidesDontFit(sideA, sideB, sideC)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  const angleA =
    Math.acos(excess(sideB, sideC, sideA) / (2 * sideB * sideC)) *
    (180 / Math.PI);

  return ImageLib.makeTriangleImage(
    sideC,
    angleA,
    sideB,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a triangle image from 3 given side lengths
 * @param {number} sideA
 * @param {number} sideB
 * @param {number} sideC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangleSSS = (sideA, sideB, sideC, mode, color) => {
  if (sidesDontFit(sideA, sideB, sideC)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  const angleA =
    Math.acos(excess(sideB, sideC, sideA) / (2 * sideB * sideC)) *
    (180 / Math.PI);

  return ImageLib.makeTriangleImage(
    sideC,
    angleA,
    sideB,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a triangle image from a given angle and 2 given side lengths
 * @param {number} angleA
 * @param {number} sideB
 * @param {number} sideC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangleASS = (angleA, sideB, sideC, mode, color) => {
  if (less(180, angleA)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  return ImageLib.makeTriangleImage(
    sideC,
    angleA,
    sideB,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a triangle image from 2 given side lengths and a given angle
 * @param {number} sideA
 * @param {number} sideB
 * @param {number} angleC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangleSSA = (sideA, sideB, angleC, mode, color) => {
  if (less(180, angleC)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  const sideC2 = cosRel(sideA, sideB, angleC);
  const sideC = Math.sqrt(sideC2);

  if (sideC2 <= 0) {
    throw new Error("The given side, angle, and side will not form a triangle");
  } else if (sidesDontFit(sideA, sideB, sideC)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  const angleA =
    Math.acos(excess(sideB, sideC, sideA) / (2 * sideB * sideC)) *
    (180 / Math.PI);

  return ImageLib.makeTriangleImage(
    sideC,
    angleA,
    sideB,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a triangle image from 2 given angles and a given side length
 * @param {number} angleA
 * @param {number} angleB
 * @param {number} sideC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangleAAS = (angleA, angleB, sideC, mode, color) => {
  const angleC = 180 - angleA - angleB;

  if (less(angleC, 0)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  const hypotenuse = sideC / Math.sin((angleC * Math.PI) / 180);
  const sideB = hypotenuse * Math.sin((angleB * Math.PI) / 180);

  return ImageLib.makeTriangleImage(
    sideC,
    angleA,
    sideB,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a triangle image from 2 given angles and a given side length
 * @param {number} angleA
 * @param {number} sideB
 * @param {number} angleC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangleASA = (angleA, sideB, angleC, mode, color) => {
  const angleB = 180 - angleA - angleC;

  if (less(angleB, 0)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  const base =
    (sideB * Math.sin((angleA * Math.PI) / 180)) /
    Math.sin((angleB * Math.PI) / 180);
  const sideC =
    (sideB * Math.sin((angleC * Math.PI) / 180)) /
    Math.sin((angleB * Math.PI) / 180);

  return ImageLib.makeTriangleImage(
    sideC,
    angleA,
    sideB,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a triangle image from a given side length and 2 given angles
 * @param {number} sideA
 * @param {number} angleB
 * @param {number} angleC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const triangleSAA = (sideA, angleB, angleC, mode, color) => {
  const angleA = 180 - angleC - angleB;

  if (less(angleA, 0)) {
    throw new Error("The given side, angle, and side will not form a triangle");
  }

  const hypotenuse = sideA / Math.sin((angleA * Math.PI) / 180);
  const sideC = hypotenuse * Math.sin((angleC * Math.PI) / 180);
  const sideB = hypotenuse * Math.sin((angleB * Math.PI) / 180);

  return ImageLib.makeTriangleImage(
    sideC,
    angleA,
    sideB,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a right triangle image from 2 given side lengths
 * @param {number} side1
 * @param {number} side2
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const rightTriangle = (side1, side2, mode, color) =>
  ImageLib.makeTriangleImage(
    side1,
    360 - 90,
    side2,
    toFillMode(mode),
    toColor(color)
  );

/**
 * Creates an isosceles triangle image from a given side length and angle
 * @param {number} side
 * @param {number} angleC
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.TriangleImage}
 */
export const isoscelesTriangle = (side, angleC, mode, color) => {
  const angleAB = (180 - angleC) / 2;
  const base = 2 * side * Math.sin((angleC * Math.PI) / 180 / 2);

  return ImageLib.makeTriangleImage(
    base,
    360 - angleAB,
    side,
    toFillMode(mode),
    toColor(color)
  );
};

/**
 * Creates a star image with a given side length
 * @param {number} side
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.RegularPolygonImage}
 */
export const star = (side, mode, color) =>
  ImageLib.makeRegularPolygonImage(
    side,
    5,
    2,
    toFillMode(mode),
    toColor(color),
    false
  );

/**
 * Creates a star with a variable number of points
 * @param {number} pointCount
 * @param {number} outer
 * @param {number} inner
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.RegularPolygonImage}
 */
export const starSized = (pointCount, outer, inner, mode, color) =>
  ImageLib.makeStarImage(
    pointCount,
    inner,
    outer,
    toFillMode(mode),
    toColor(color)
  );

export const radialStar = starSized;

/**
 * Creates a star-shaped polygon from the given side length and count
 * @param {number} length
 * @param {number} count
 * @param {number} step
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.RegularPolygonImage}
 */
export const starPolygon = (length, count, step, mode, color) =>
  ImageLib.makeRegularPolygonImage(
    length,
    count,
    step,
    toFillMode(mode),
    toColor(color),
    false
  );

/**
 * Creates a rhombus image
 * @param {number} length
 * @param {number} angle
 * @param {FillMode|string|number} mode
 * @param {Color|string} color
 * @returns {ImageLib.RhombusImage}
 */
export const rhombus = (length, angle, mode, color) =>
  ImageLib.makeRhombusImage(length, angle, toFillMode(mode), toColor(color));

export const imageToColorList = ImageLib.imageToColorList;

/**
 * Gets the width of an image
 * @param {ImageLib.BaseImage} img
 * @returns {number}
 */
export const imageWidth = (img) => img.width;

/**
 * Gets the height of an image
 * @param {ImageLib.BaseImage} img
 * @returns {number}
 */
export const imageHeight = (img) => img.height;

/**
 * Gets the baseline value of an image
 * @param {ImageLib.BaseImage} img
 * @returns {number}
 */
export const imageBaseline = (img) => img.alphaBaseline;

/**
 * Gets the pinhole-x value of an image
 * @param {ImageLib.BaseImage} img
 * @returns {number}
 */
export const imagePinholeX = (img) => img.pinholeX;

/**
 * Gets the pinhole-y value of an image
 * @param {ImageLib.BaseImage} img
 * @returns {number}
 */
export const imagePinholeY = (img) => img.pinholeY;

export const isAngle = ImageLib.isAngle;

export const isSideCount = ImageLib.isSideCount;

export const isStepCount = ImageLib.isStepCount;

export const isImage = ImageLib.isImage;

export const imagesDifference = ImageLib.imageDifference;

export const imagesEqual = ImageLib.imageEquals;

/**
 * Gets the color at a given x/y coordinate
 * @param {ImageLib.BaseImage} img
 * @param {number} x
 * @param {number} y
 * @returns {Colors.Color}
 */
export const colorAtPosition = (img, x, y) => {
  const width = img.width;
  const height = img.height;

  if (x >= width) {
    throw new Error(
      `The given x coordinate ${x} must be between 0 (inclusive) and the image width of ${width} (exclusive)`
    );
  }

  if (y >= height) {
    throw new Error(
      `The given y coordinate ${y} must be between 0 (inclusive) and the image height of ${height} (exclusive)`
    );
  }

  return ImageLib.colorAtPosition(img, x, y);
};

/**
 * Creates an image from a list of colors
 * @param {Colors.Color[]} list
 * @param {number} width
 * @param {number} height
 * @param {number} pinholeX
 * @param {number} pinholeY
 * @returns {ImageLib.BaseImage}
 */
export const colorListToImage = (list, width, height, pinholeX, pinholeY) => {
  const len = list.length;

  if (len !== width * height) {
    throw new Error(
      `The color list does not have the right number of elements: expected ${
        width * height
      } but got ${len}`
    );
  }

  return ImageLib.colorListToImage(list, width, height, pinholeX, pinholeY);
};

/**
 * Creates a bitmap (image) from a list of colors
 * @param {Colors.Color[]} list
 * @param {number} width
 * @param {number} height
 * @returns {ImageLib.BaseImage}
 */
export const colorListToBitmap = (list, width, height) => {
  const len = list.length;

  if (len !== width * height) {
    throw new Error(
      `The color list does not have the right number of elements: expected ${
        width * height
      } but got ${len}`
    );
  }

  return ImageLib.colorListToImage(list, width, height, width / 2, height / 2);
};

/**
 * Get a color from a string color name
 * @param {string} name
 * @returns {Colors.Color|undefined}
 */
export const nameToColor = (name) => ImageLib.colorDb.get(name);

export const colorNamed = (name) => {
  const val = ImageLib.colorDb.get(name);

  if (!val) {
    throw new Error(`Unknown color name ${name}`);
  }

  return val;
};

export const emptyImage = () =>
  ImageLib.makeSceneImage(0, 0, [], true, Colors.transparent);
