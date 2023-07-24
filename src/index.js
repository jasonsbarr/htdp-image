import * as Lib from "./image-lib/index.js";
import {
  BaseImage,
  SceneImage,
  FileImage,
  TextImage,
  FileVideo,
  ImageDataImage,
  OverlayImage,
  RotateImage,
  EllipseImage,
  CropImage,
  PinholeImage,
  RegularPolygonImage,
  PointPolygonImage,
  StarImage,
  TriangleImage,
  WedgeImage,
  ScaleImage,
  FlipImage,
  FrameImage,
  LineImage,
  RectangleImage,
  RhombusImage,
} from "./image-lib/index.js";
import {
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  Point,
  Point2D,
  point,
  XPlace,
  YPlace,
  Colors,
} from "./shared/index.js";
import {
  circle,
  text,
  textFont,
  overlay,
  overlayList,
  overlayXY,
  overlayAlign,
  overlayAlignList,
  overlayOntoOffset,
  underlay,
  underlayList,
  underlayXY,
  underlayAlignList,
  beside,
  besideList,
  besideAlign,
  besideAlignList,
  above,
  aboveList,
  aboveAlign,
  aboveAlignList,
  below,
  belowList,
  belowAlign,
  belowAlignList,
  movePinhole,
  emptyScene,
  emptyColorScene,
  putImage,
  placeImage,
  translate,
  placePinhole,
  centerPinhole,
  placeImageAlign,
  rotate,
  scale,
  scaleXY,
  flipHorizontal,
  flipVertical,
  reflectY,
  reflectX,
  frame,
  drawPinhole,
  crop,
  line,
  addLine,
  sceneLine,
  square,
  rectangle,
  regularPolygon,
  pointPolygon,
  ellipse,
  wedge,
  triangle,
  triangleSAS,
  triangleSSS,
  triangleASS,
  triangleSSA,
  triangleAAS,
  triangleASA,
  triangleSAA,
  rightTriangle,
  isoscelesTriangle,
  star,
  starSized,
  radialStar,
  starPolygon,
  rhombus,
  imageToColorList,
  imageWidth,
  imageHeight,
  imageBaseline,
  imagePinholeX,
  imagePinholeY,
  colorAtPosition,
  colorListToImage,
  colorListToBitmap,
  nameToColor,
  emptyImage,
} from "./make-image/index.js";
import { makeDocument } from "./shared/document.js";

const document = makeDocument();

/**
 * Renders an image to the DOM
 * @param {ImageLib.BaseImage} image
 * @param {HTMLElement} element
 */
export const render = (image, element = document.body) => {
  const canvas = Lib.makeCanvas(image.width, image.height);
  const context = canvas.getContext("2d");

  element.appendChild(canvas);
  image.render(context);
};

/**
 * Checks if a given string matches a color in the color DB
 * @param {string} color
 * @returns {boolean}
 */
export const isImageColor = (color) => ImageLib.isColorOrColorString(color);

/**
 * Checks if the value is a FillMode
 * @param {any} mode
 * @returns {boolean}
 */
export const isMode = (mode) => FillMode.isFillMode(mode);

/**
 * Checks if a given value is a PlaceX value
 * @param {any} x
 * @returns {boolean}
 */
export const isXPlace = (x) =>
  typeof x === "string" &&
  (x.toLowerCase() === "left" ||
    x.toLowerCase() === "right" ||
    x.toLowerCase() === "center" ||
    x.toLowerCase() === "pinhole" ||
    x.toLowerCase() === "middle");

/**
 * Checks if a given value is a PlaceY value
 * @param {any} x
 * @returns {boolean}
 */
export const isYPlace = (x) =>
  typeof x === "string" &&
  (x.toLowerCase() === "top" ||
    x.toLowerCase() === "bottom" ||
    x.toLowerCase() === "baseline" ||
    x.toLowerCase() === "center" ||
    x.toLowerCase() === "pinhole" ||
    x.toLowerCase() === "middle");

export const Types = {
  BaseImage,
  SceneImage,
  FileImage,
  TextImage,
  FileVideo,
  ImageDataImage,
  OverlayImage,
  RotateImage,
  EllipseImage,
  CropImage,
  PinholeImage,
  RegularPolygonImage,
  PointPolygonImage,
  StarImage,
  TriangleImage,
  WedgeImage,
  ScaleImage,
  FlipImage,
  FrameImage,
  LineImage,
  RectangleImage,
  RhombusImage,
};

export {
  Lib,
  FontFamily,
  FontStyle,
  FontWeight,
  Point,
  Point2D,
  point,
  XPlace,
  YPlace,
  Colors,
  circle,
  text,
  textFont,
  overlay,
  overlayList,
  overlayXY,
  overlayAlign,
  overlayAlignList,
  overlayOntoOffset,
  underlay,
  underlayList,
  underlayXY,
  underlayAlignList,
  beside,
  besideList,
  besideAlign,
  besideAlignList,
  above,
  aboveList,
  aboveAlign,
  aboveAlignList,
  below,
  belowList,
  belowAlign,
  belowAlignList,
  movePinhole,
  emptyScene,
  emptyColorScene,
  putImage,
  placeImage,
  translate,
  placePinhole,
  centerPinhole,
  placeImageAlign,
  rotate,
  scale,
  scaleXY,
  flipHorizontal,
  flipVertical,
  reflectY,
  reflectX,
  frame,
  drawPinhole,
  crop,
  line,
  addLine,
  sceneLine,
  square,
  rectangle,
  regularPolygon,
  pointPolygon,
  ellipse,
  wedge,
  triangle,
  triangleSAS,
  triangleSSS,
  triangleASS,
  triangleSSA,
  triangleAAS,
  triangleASA,
  triangleSAA,
  rightTriangle,
  isoscelesTriangle,
  star,
  starSized,
  radialStar,
  starPolygon,
  rhombus,
  imageToColorList,
  imageWidth,
  imageHeight,
  imageBaseline,
  imagePinholeX,
  imagePinholeY,
  colorAtPosition,
  colorListToImage,
  colorListToBitmap,
  nameToColor,
  emptyImage,
};
