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
 * @typedef {ModeSolid|ModeOutline|ModeFade} FillMode
 */
export const FillMode = {
  /**
   * Constructs ModeSolid
   * @returns {ModeSolid}
   */
  Solid() {
    return {
      type: "solid",
      toString() {
        return "solid";
      },
      valueOf() {
        return this.toString();
      },
    };
  },
  /**
   * Constructs ModeOutline
   * @returns {ModeOutline}
   */
  Outline() {
    return {
      type: "outline",
      toString() {
        return "outline";
      },
      valueOf() {
        return this.toString();
      },
    };
  },
  /**
   * Constructs ModeFade
   * @param {number} n
   * @returns {ModeFade}
   */
  Fade(n) {
    return {
      type: "fade",
      n,
      toString() {
        return `fade`;
      },
      valueOf() {
        return n;
      },
    };
  },
  isFillMode(val) {
    return (
      val.type === "solid" ||
      val.type === "outline" ||
      (val.type === "fade" && typeof val.n === "number")
    );
  },
  /**
   * Converts a value to a FillMode
   * @param {string|number} val
   * @returns {FillMode}
   */
  toFillMode(val) {
    if (typeof val === "number") {
      return this.Fade(val);
    }

    switch (val) {
      case "solid":
        return this.Solid();
      case "outline":
        return this.Outline();
      default:
        throw new Error(`Unknown FillMode case ${val}`);
    }
  },
};
