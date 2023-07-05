/**
 * Useful trigonometric functions based on htdp teachpack
 * @file
 */

/**
 * Compute the Euclidean excess. Note: If the excess is 0, then C is 90 deg.
 * If the excess is negative, then C is obtuse. If the excess is positive, then C is acute.
 * @param {number} sideA
 * @param {number} sideB
 * @param {number} sideC
 */
export const excess = (sideA, sideB, sideC) =>
  sideA * sideA + sideB * sideB - sideC * sideC;

/**
 * return c^2 = a^2 + b^2 - 2ab cos(C)
 * @param {number} sideA
 * @param {number} sideB
 * @param {number} angleC
 * @returns {number}
 */
export const cosRel = (sideA, sideB, angleC) =>
  sideA * sideA +
  sideB * sideB -
  2 * sideA * sideB * Math.cos((angleC * Math.PI) / 180);
