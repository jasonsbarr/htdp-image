export const less = (n, m) => n < m;

export const canonicalizeAngle = (angle) => {
  angle = angle % 360;

  if (angle < 0) {
    angle += 360;
  }

  return angle;
};
