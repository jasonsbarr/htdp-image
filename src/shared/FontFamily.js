/**
 * @typedef FFDefault
 * @prop {"ff-default"} type
 */
/**
 * @typedef FFDecorative
 * @prop {"ff-decorative"} type
 */
/**
 * @typedef FFRoman
 * @prop {"ff-roman"} type
 */
/**
 * @typedef FFScript
 * @prop {"ff-script"} type
 */
/**
 * @typedef FFSwiss
 * @prop {"ff-swiss"} type
 */
/**
 * @typedef FFModern
 * @prop {"ff-modern"} type
 */
/**
 * @typedef FFSymbol
 * @prop {"ff-symbol"} type
 */
/**
 * @typedef FFSystem
 * @prop {"ff-system"} type
 */
/**
 * @typedef {FFDefault|FFDecorative|FFRoman|FFScript|FFSwiss|FFModern|FFSymbol|FFSystem} FontFamily
 */

export const FontFamily = {
  /**
   * FFDefault constructor
   * @returns {FFDefault}
   */
  FFDefault() {
    return { type: "ff-default" };
  },
  /**
   * FFDecorative constructor
   * @returns {FFDecorative}
   */
  FFDecorative() {
    return { type: "ff-decorative" };
  },
  /**
   * FFRoman constructor
   * @returns {FFRoman}
   */
  FFRoman() {
    return { type: "ff-roman" };
  },
  /**
   * FFScript constructor
   * @returns {FFScript}
   */
  FFScript() {
    return { type: "ff-script" };
  },
  /**
   * FFSwiss constructor
   * @returns {FFSwiss}
   */
  FFSwiss() {
    return { type: "ff-swiss" };
  },
  /**
   * FFModern constructor
   * @returns {FFModern}
   */
  FFModern() {
    return { type: "ff-modern" };
  },
  /**
   * FFSymbol constructor
   * @returns {FFSymbol}
   */
  FFSymbol() {
    return { type: "ff-symbol" };
  },
  /**
   * FFSystem constructor
   * @returns {FFSystem}
   */
  FFSystem() {
    return { type: "ff-system" };
  },
};
