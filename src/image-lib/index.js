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

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

export {
  BaseImage,
  SceneImage,
  FileImage,
  TextImage,
  FileVideo,
  ImageDataImage,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
};
