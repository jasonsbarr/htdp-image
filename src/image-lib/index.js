import {
  Colors,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  Utils,
  XPlace,
  YPlace,
} from "../shared/index.js";
import { ColorDB } from "./ColorDb.js";

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

export const clone = Utils.clone;

export { FillMode, FontFamily, FontStyle, FontWeight, XPlace, YPlace };
