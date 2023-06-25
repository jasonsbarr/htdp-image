/**
 * @typedef FWNormal
 * @prop {"fw-normal"} type
 */
/**
 * @typedef FWBold
 * @prop {"fw-bold"} type
 */
/**
 * @typedef FWLight
 * @prop {"fw-light"} type
 */
/**
 * @typedef {FWNormal|FWBold|FWLight} FontWeight
 */

export const FontWeight = {
  /**
   * FWNormal constructor
   * @returns {FWNormal}
   */
  FWNormal() {
    return { type: "fw-normal" };
  },
  /**
   * FWBold constructor
   * @returns {FWBold}
   */
  FWBold() {
    return { type: "fw-bold" };
  },
  /**
   * FWLight constructor
   * @returns {FWLight}
   */
  FWLight() {
    return { type: "fw-light" };
  },
};
