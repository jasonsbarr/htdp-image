/* data FontStyle: fs-normal | fs-italic | fs-slant end */
/**
 * @typedef FSNormal
 * @prop {"fs-normal"} type
 */
/**
 * @typedef FSItalic
 * @prop {"fs-italic"} type
 */
/**
 * @typedef FSSlant
 * @prop {"fs-slant"} type
 */
/**
 * @typedef {FSNormal|FSItalic|FSSlant} FontStyle
 */

export const FontStyle = {
  /**
   * FSNormal constructor
   * @returns {FSNormal}
   */
  FSNormal() {
    return { type: "fs-normal" };
  },
  /**
   * FSItalic constructor
   * @returns {FSItalic}
   */
  FSItalic() {
    return { type: "fs-italic" };
  },
  /**
   * FSSlant constructor
   * @returns {FSSlant}
   */
  FSSlant() {
    return { type: "fs-slant" };
  },
};
