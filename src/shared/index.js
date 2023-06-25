import * as Point from "./types/Point.js";
import { XPlace } from "./types/XPlace.js";
import { YPlace } from "./types/YPlace.js";
import { FillMode } from "./types/FillMode.js";
import { FontFamily } from "./types/FontFamily.js";
import { FontStyle } from "./types/FontStyle.js";
import { FontWeight } from "./types/FontWeight.js";
import * as colors from "./colors.js";

export const Types = {
  ...Point,
  XPlace,
  YPlace,
  FillMode,
  FontFamily,
  FontStyle,
  FontWeight,
  ...colors,
};
