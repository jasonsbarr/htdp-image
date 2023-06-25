/**
 * Restricts a number to within certain min/max bounds
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (num, min, max) =>
  num > max ? max : num < min ? min : num;
