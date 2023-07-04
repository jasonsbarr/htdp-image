import {
  Colors,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
} from "../shared/index.js";
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

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

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
};
