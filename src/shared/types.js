/**
 * @typedef PointXY
 * @prop {"cartesian"} type
 * @prop {number} x
 * @prop {number} y
 */
/**
 * @typedef PointPolar
 * @prop {"polar"} type
 * @prop {number} r
 * @prop {number} theta
 */
/**
 * @typedef {PointXY|PointPolar} Point
 */
export const Point = {
  /**
   * Cartesian point constructor
   * @param {number} x
   * @param {number} y
   * @returns {PointXY}
   */
  XY(x, y) {
    return { type: "cartesian", x, y };
  },
  /**
   * Polar point constructor
   * @param {number} h
   * @param {number} theta
   * @returns {PointPolar}
   */
  Polar(h, theta) {
    return { type: "polar", h, theta };
  },
};
