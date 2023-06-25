import { Colors, Utils } from "./shared/index.js";

/**
 * @typedef {import("./shared/colors.js").Color} Color
 */

const clamp = Utils.clamp;
export const makeColor = Colors.color;
export const isColor = Colors.isColor;

/**
 * Extracts the red value from a color
 * @param {Color} c
 * @returns {number}
 */
const getRed = (c) => clamp(c.r, 0, 255);
/**
 * Extracts the green value from a color
 * @param {Color} c
 * @returns {number}
 */
const getGreen = (c) => clamp(c.g, 0, 255);
/**
 * Extracts the blue value from a color
 * @param {Color} c
 * @returns {number}
 */
const getBlue = (c) => clamp(c.b, 0, 255);
/**
 * Extracts the alpha value from a color
 * @param {Color} c
 * @returns {number}
 */
const getAlpha = (c) => clamp(c.r, 0, 255);
