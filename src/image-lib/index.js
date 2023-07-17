import { Colors, Point } from "../shared/index.js";
import { BaseImage } from "./types/BaseImage.js";
import { SceneImage } from "./types/SceneImage.js";
import { FileImage } from "./types/FileImage.js";
import { TextImage } from "./types/TextImage.js";
import { FileVideo } from "./types/FileVideo.js";
import { ImageDataImage } from "./types/ImageDataImage.js";
import { OverlayImage } from "./types/OverlayImage.js";
import { RotateImage } from "./types/RotateImage.js";
import { EllipseImage } from "./types/EllipseImage.js";
import { CropImage } from "./types/CropImage.js";
import { PinholeImage } from "./types/PinholeImage.js";
import { RegularPolygonImage } from "./types/RegularPolygonImage.js";
import { PointPolygonImage } from "./types/PointPolygonImage.js";
import { StarImage } from "./types/StarImage.js";
import { TriangleImage } from "./types/TriangleImage.js";
import { WedgeImage } from "./types/WedgeImage.js";
import { ScaleImage } from "./types/ScaleImage.js";
import { FlipImage } from "./types/FlipImage.js";
import { FrameImage } from "./types/FrameImage.js";
import {
  makeSceneImage,
  makeCircleImage,
  makeStarImage,
  makeRectangleImage,
  makeRhombusImage,
  makeRegularPolygonImage,
  makePointPolygonImage,
  makeSquareImage,
  makeTriangleImage,
  makeEllipseImage,
  makeWedgeImage,
  makeLineImage,
  makeOverlayImage,
  makeRotateImage,
  makeScaleImage,
  makeCropImage,
  makeFrameImage,
  makePinholeImage,
  makeFlipImage,
  makeTextImage,
  makeImageDataImage,
  makeFileImage,
  makeFileVideo,
} from "./make.js";
import {
  isImage,
  isSceneImage,
  isCircleImage,
  isStarImage,
  isRectangleImage,
  isRegularPolygonImage,
  isPointPolygonImage,
  isRhombusImage,
  isSquareImage,
  isTriangleImage,
  isWedgeImage,
  isEllipseImage,
  isLineImage,
  isOverlayImage,
  isRotateImage,
  isScaleImage,
  isCropImage,
  isFrameImage,
  isPinholeImage,
  isFlipImage,
  isTextImage,
  isFileImage,
  isFileVideo,
  isImageDataImage,
  isScene,
} from "./predicates.js";
import { colorDb } from "./colorDb.js";
import {
  makeCanvas,
  imageEquals,
  imageDifference,
  colorAtPosition,
  imageToColorList,
  colorListToImage,
  colorRed,
  colorGreen,
  colorBlue,
  colorAlpha,
  colorString,
  isColorOrColorString,
  isAngle,
  isSideCount,
  isStepCount,
  isPointsCount,
  stringToColor,
} from "./utils.js";

export const makeColor = Colors.color;
export const isColor = Colors.isColor;
export const isPoint = Point.isPoint;

export {
  // image types
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

  // constructor functions
  makeSceneImage,
  makeCircleImage,
  makeStarImage,
  makeRectangleImage,
  makeRhombusImage,
  makeRegularPolygonImage,
  makePointPolygonImage,
  makeSquareImage,
  makeTriangleImage,
  makeEllipseImage,
  makeWedgeImage,
  makeLineImage,
  makeOverlayImage,
  makeRotateImage,
  makeScaleImage,
  makeCropImage,
  makeFrameImage,
  makePinholeImage,
  makeFlipImage,
  makeTextImage,
  makeImageDataImage,
  makeFileImage,
  makeFileVideo,

  // predicates
  isImage,
  isSceneImage,
  isCircleImage,
  isStarImage,
  isRectangleImage,
  isRegularPolygonImage,
  isPointPolygonImage,
  isRhombusImage,
  isSquareImage,
  isTriangleImage,
  isWedgeImage,
  isEllipseImage,
  isLineImage,
  isOverlayImage,
  isRotateImage,
  isScaleImage,
  isCropImage,
  isFrameImage,
  isPinholeImage,
  isFlipImage,
  isTextImage,
  isFileImage,
  isFileVideo,
  isImageDataImage,
  isScene,

  // colorDb
  colorDb,

  // utils
  makeCanvas,
  imageEquals,
  imageDifference,
  colorAtPosition,
  imageToColorList,
  colorListToImage,
  colorRed,
  colorGreen,
  colorBlue,
  colorAlpha,
  colorString,
  isColorOrColorString,
  isAngle,
  isSideCount,
  isStepCount,
  isPointsCount,
  stringToColor,
};
