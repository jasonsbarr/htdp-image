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

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

export {
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
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
};
