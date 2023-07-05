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
    return {
      type: "solid",
      toString() {
        return "solid";
      },
      valueOf() {
        return this.toString();
      },
    };
  },
  /**
   * Constructs ModeOutline
   * @returns {ModeOutline}
   */
  Outline() {
    return {
      type: "outline",
      toString() {
        return "outline";
      },
      valueOf() {
        return this.toString();
      },
    };
  },
  /**
   * Constructs ModeFade
   * @param {number} n
   * @returns {ModeFade}
   */
  Fade(n) {
    return {
      type: "fade",
      n,
      toString() {
        return `fade`;
      },
      valueOf() {
        return n;
      },
    };
  },
};
