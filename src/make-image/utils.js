import { Point } from "../shared/index.js";
import { Point } from "../shared/types/Point.js";

export const less = (n, m) => n < m;

export const canonicalizeAngle = (angle) => {
  angle = angle % 360;

  if (angle < 0) {
    angle += 360;
  }

  return angle;
};

/**
 * Converts a Polar point to a Cartesian point
 * @param {import("../shared/types/Point").PointPolar} polar
 * @returns {import("../shared/types/Point").PointXY}
 */
export const polarToCartesian = (polar) => {
  const x = polar.r * Math.cos(polar.theta);
  const y = polar.r * Math.sin(polar.theta);

  return Point.XY(x, y);
};

/**
 *
 * @param {Point[]} points
 * @returns {import("../shared/types/Point").PointXY[]}
 */
export const convertPointsToCartesian = (points) => {
  return points.map((p) => (p.type === "polar" ? polarToCartesian(p) : p));
};
