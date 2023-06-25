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
import { ColorDB } from "./ColorDB.js";

/**
 * @typedef {import("./shared/colors.js").Color} Color
 */

export const makeColor = Colors.color;
export const isColor = Colors.isColor;

const clone = Utils.clone;
const colorDb = new ColorDB();

for (let [name, value] of Object.entries(Colors)) {
  name = name.toUpperCase();

  if (isColor(value)) {
    colorDb.put(name, value);
  }
}

export { FillMode, FontFamily, FontStyle, FontWeight, XPlace, YPlace };
