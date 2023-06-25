import { Utils } from "../shared/index.js";

/**
 * @typedef {import("../shared/colors.js").Color} Color
 */

const clamp = Utils.clamp;

/**
 * Extracts the red value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorRed = (c) => clamp(c.r, 0, 255);
/**
 * Extracts the green value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorGreen = (c) => clamp(c.g, 0, 255);
/**
 * Extracts the blue value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorBlue = (c) => clamp(c.b, 0, 255);
/**
 * Extracts the alpha value from a color
 * @param {Color} c
 * @returns {number}
 */
export const colorAlpha = (c) => clamp(c.a, 0, 1);
