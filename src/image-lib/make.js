import { EllipseImage } from "./types/EllipseImage.js";
import { ImageDataImage } from "./types/ImageDataImage.js";
import { SceneImage } from "./types/SceneImage.js";
import { StarImage } from "./types/StarImage.js";
import { RectangleImage } from "./types/RectangleImage.js";
import { RhombusImage } from "./types/RhombusImage.js";
import { RegularPolygonImage } from "./types/RegularPolygonImage.js";
import { PointPolygonImage } from "./types/PointPolygonImage.js";
import { TriangleImage } from "./types/TriangleImage.js";
import { WedgeImage } from "./types/WedgeImage.js";
import { LineImage } from "./types/LineImage.js";
import { OverlayImage } from "./types/OverlayImage.js";
import { BaseImage } from "./types/BaseImage.js";
import { RotateImage } from "./types/RotateImage.js";
import { ScaleImage } from "./types/ScaleImage.js";
import { CropImage } from "./types/CropImage.js";
import { FrameImage } from "./types/FrameImage.js";
import { PinholeImage } from "./types/PinholeImage.js";
import { FlipImage } from "./types/FlipImage.js";
import { TextImage } from "./types/TextImage.js";
import { FileImage } from "./types/FileImage.js";
import { FileVideo } from "./types/FileVideo.js";
import { FontFamily, FontStyle, FontWeight } from "../shared/index.js";

/**
 * @typedef {import("../shared/index.js").Colors.Color} Color
 */
/**
 * @typedef {import("../shared/index.js").FillMode} FillMode
 */

/**
 * Constructs a SceneImage
 * @param {number} width
 * @param {number} height
 * @param {import("./types/SceneImage.js").Child[]} children
 * @param {boolean} withBorder
 * @param {Color} color
 * @returns {SceneImage}
 */
export const makeSceneImage = (width, height, children, withBorder, color) =>
  SceneImage.new(width, height, children, withBorder, color);

/**
 * Constructs a circle image
 * @param {number} radius
 * @param {FillMode} style
 * @param {Color} color
 * @returns {EllipseImage}
 */
export const makeCircleImage = (radius, style, color) =>
  EllipseImage.new(radius * 2, radius * 2, style, color);

/**
 * Constructs a StarImage
 * @param {number} points
 * @param {number} outer
 * @param {number} inner
 * @param {FillMode} style
 * @param {Color} color
 * @returns {StarImage}
 */
export const makeStarImage = (points, outer, inner, style, color) =>
  StarImage.new(points, outer, inner, style, color);

/**
 * Constructs a RectangleImage
 * @param {number} width
 * @param {number} height
 * @param {FillMode} style
 * @param {Color} color
 * @returns {RectangleImage}
 */
export const makeRectangleImage = (width, height, style, color) =>
  RectangleImage.new(width, height, style, color);

/**
 * Constructs a new RhombusImage
 * @param {number} side
 * @param {number} angle
 * @param {FillMode} style
 * @param {Color} color
 * @returns {RhombusImage}
 */
export const makeRhombusImage = (side, angle, style, color) =>
  RhombusImage.new(side, angle, style, color);

/**
 * Constructs a RegularPolygonImage
 * @param {number} length
 * @param {number} count
 * @param {number} step
 * @param {FillMode} style
 * @param {Color} color
 * @param {boolean} flatBottom
 * @returns {RegularPolygonImage}
 */
export const makeRegularPolygonImage = (
  length,
  count,
  step,
  style,
  color,
  flatBottom
) => RegularPolygonImage.new(length, count, step, style, color, flatBottom);

/**
 * Constructs a PointPolygonImage
 * @param {{x: number; y: number}[]} vertices
 * @param {FillMode} style
 * @param {Color} color
 * @returns {PointPolygonImage}
 */
export const makePointPolygonImage = (vertices, style, color) =>
  PointPolygonImage.new(vertices, style, color);

/**
 * Constructs a square image
 * @param {number} length
 * @param {FillMode} style
 * @param {Color} color
 * @returns {RectangleImage}
 */
export const makeSquareImage = (length, style, color) =>
  RectangleImage.new(length, length, style, color);

/**
 * Constructs a TriangleImage
 * @param {number} sideA
 * @param {number} angleC
 * @param {number} sideB
 * @param {FillMode} style
 * @param {Color} color
 * @returns {TriangleImage}
 */
export const makeTriangleImage = (sideA, angleC, sideB, style, color) =>
  TriangleImage.new(sideA, angleC, sideB, style, color);

/**
 * Constructs an EllipseImage
 * @param {number} width
 * @param {number} height
 * @param {FillMode} style
 * @param {Color} color
 * @returns {EllipseImage}
 */
export const makeEllipseImage = (width, height, style, color) =>
  EllipseImage.new(width, height, style, color);

/**
 * Constructs a WedgeImage
 * @param {number} radius
 * @param {number} angle
 * @param {FillMode} style
 * @param {Color} color
 * @returns {WedgeImage}
 */
export const makeWedgeImage = (radius, angle, style, color) =>
  WedgeImage.new(radius, angle, style, color);

/**
 * Constructs a LineImage
 * @param {number} x
 * @param {number} y
 * @param {Color} color
 * @returns {LineImage}
 */
export const makeLineImage = (x, y, color) => LineImage.new(x, y, color);

/**
 * Constructs an OverlayImage
 * @param {BaseImage} img1
 * @param {number} x1
 * @param {number} y1
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {BaseImage} img2
 * @param {number} x2
 * @param {number} y2
 * @returns {OverlayImage}
 */
export const makeOverlayImage = (
  img1,
  x1,
  y1,
  offsetX,
  offsetY,
  img2,
  x2,
  y2
) => OverlayImage.new(img1, x1, y1, offsetX, offsetY, img2, x2, y2);

/**
 * Constructs a RotateImage
 * @param {number} angle
 * @param {BaseImage} img
 * @returns {RotateImage}
 */
export const makeRotateImage = (angle, img) => RotateImage.new(angle, img);

/**
 * Constructs a new ScaleImage
 * @param {number} xFactor
 * @param {number} yFactor
 * @param {BaseImage} img
 * @returns {ScaleImage}
 */
export const makeScaleImage = (xFactor, yFactor, img) =>
  ScaleImage.new(xFactor, yFactor, img);

/**
 * Constructs a new CropImage
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {BaseImage} img
 * @returns {CropImage}
 */
export const makeCropImage = (x, y, width, height, img) =>
  CropImage.new(x, y, width, height, img);

/**
 * Constructs a new FrameImage
 * @param {BaseImage} img
 * @returns {FrameImage}
 */
export const makeFrameImage = (img) => FrameImage.new(img);

/**
 * Constructs a new PinholeImage
 * @param {BaseImage} img
 * @returns {PinholeImage}
 */
export const makePinholeImage = (img) => PinholeImage.new(img);

/**
 * Constructs a new FlipImage
 * @param {BaseImage} img
 * @param {"horizontal"|"vertical"} direction
 * @returns {FlipImage}
 */
export const makeFlipImage = (img, direction) => FlipImage.new(img, direction);

/**
 * Constructs a new TextImage
 * @param {string} str
 * @param {number} size
 * @param {Color} color
 * @param {string} face
 * @param {FontFamily} family
 * @param {FontStyle} style
 * @param {FontWeight} weight
 * @param {boolean} underline
 * @returns {TextImage}
 */
export const makeTextImage = (
  str,
  size,
  color,
  face,
  family,
  style,
  weight,
  underline
) => TextImage.new(str, size, color, face, family, style, weight, underline);

/**
 * Constructs an ImageDataImage
 * @param {ImageData} imageData
 * @returns {ImageDataImage}
 */
export const makeImageDataImage = (imageData) => ImageDataImage.new(imageData);

/**
 * Constructs a new FileImage
 * @param {string} src
 * @param {HTMLImageElement} rawImage
 * @returns {FileImage}
 */
export const makeFileImage = (src, rawImage) => FileImage.new(src, rawImage);

/**
 * Constructs a new FileVideo
 * @param {string} src
 * @param {HTMLVideoElement} rawVideo
 * @returns {FileVideo}
 */
export const makeFileVideo = (src, rawVideo) => FileVideo.new(src, rawVideo);
