/**
 * @typedef ModeSolid
 * @prop {"mode-solid"} type
 */
/**
 * @typedef ModeOutline
 * @prop {"mode-outline"} type
 */
/**
 * @typedef ModeFade
 * @prop {"mode-fade"} type
 * @prop {number} n
 */
/**
 * @typedef {ModeSolid|ModeOutline|ModeFade} FillMode
 */
export const FillMode = {
  /**
   * Constructs ModeSolid
   * @returns {ModeSolid}
   */
  Solid() {
    return { type: "mode-solid" };
  },
  /**
   * Constructs ModeOutline
   * @returns {ModeOutline}
   */
  Outline() {
    return { type: "mode-outline" };
  },
  /**
   * Constructs ModeFade
   * @param {number} n
   * @returns {ModeFade}
   */
  Fade(n) {
    return { type: "mode-fade", n };
  },
};
