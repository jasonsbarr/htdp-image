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
      type: "mode-solid",
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
      type: "mode-outline",
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
      type: "mode-fade",
      n,
      toString() {
        return `fade ${n}`;
      },
      valueOf() {
        return n;
      },
    };
  },
  /**
   * FillMode constructor
   * @param {"mode-solid"|"mode-outline"|"mode-fade"} type
   * @param {number?} n
   * @returns {FillMode}
   */
  new(type, n = null) {
    return typeof n === "number" ? { type, n } : { type };
  },
};
