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
   * @param {number} r
   * @param {number} theta
   * @returns {PointPolar}
   */
  Polar(r, theta) {
    return { type: "polar", r, theta };
  },
  /**
   * Predicate to check if a type is a point
   * @param {any} o
   * @returns {boolean}
   */
  isPoint(o) {
    return o?.type && (o.type === "cartesian" || o.type === "polar");
  },
};

export const point = Point.XY;
export const Point2D = Point;
