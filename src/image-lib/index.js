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

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

export {
  BaseImage,
  SceneImage,
  FileImage,
  TextImage,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  XPlace,
  YPlace,
};
