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

export const point = Point.XY;
export const Point2D = Point;

/**
 * @enum {string}
 */
export const XPlace = {
  XLeft: "XLeft",
  XMiddle: "XMiddle",
  XPinhole: "XPinhole",
  XRight: "XRight",
};

/**
 * @enum {string}
 */
export const YPlace = {
  YTop: "YTop",
  YCenter: "YCenter",
  YPinhole: "YPinhole",
  YBaseline: "YBaseline",
  YBottom: "YBottom",
};

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
 * @typedef {ModeSolid|ModeOutline|ModeFade} FillModeType
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
