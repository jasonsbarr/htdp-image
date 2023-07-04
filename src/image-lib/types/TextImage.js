import equals from "fast-deep-equal/es6/index.js";
import { FontFamily, FontWeight, FontStyle } from "../../shared/index.js";
import { colorToSpokenString } from "../utils.js";
import { BaseImage } from "./BaseImage.js";

let ua = "",
  baselineFudge = 0;

if (window.navigator && window.navigator.userAgent) {
  ua = window.navigator.userAgent;
}

if (ua.indexOf("Firefox") !== -1) {
  baselineFudge = 2;
}

const getTextDimensions = function (str, font) {
  let text = document.createElement("span");

  text.textContent = str;
  text.style.font = font;
  text.style.whiteSpace = "pre";
  text.style.margin = "0";
  text.style.padding = "0";

  let block = document.createElement("div");

  block.style.display = "inline-block";
  block.style.width = 1;
  block.style.height = 0;
  block.style.margin = "0";
  block.style.padding = "0";

  let div = document.createElement("div");

  div.style.margin = "0";
  div.style.padding = "0";
  div.append(text, block);

  let body = document.body;

  body.append(div);

  let result = {};

  try {
    block.style.verticalAlign = "baseline";
    result.width = text.offsetWidth;
    result.ascent = block.offsetTop - text.offsetTop;

    block.style.verticalAlign = "bottom";
    result.height = block.offsetTop - text.offsetTop;

    result.descent = result.height - result.ascent;
  } finally {
    body.removeChild(div);
  }

  return result;
};

/**
 * @typedef {import("../../shared/colors.js").Color} Color
 */

/**
 * An image that is all text
 * @class
 * @prop {string} str
 * @prop {number} size
 * @prop {string} face
 * @prop {FontFamily} family
 * @prop {FontStyle} style
 * @prop {FontWeight} weight
 * @prop {boolean} underline
 * @prop {string} font
 */
export class TextImage extends BaseImage {
  /**
   * TextImage constructor
   * @param {string} str
   * @param {number} size
   * @param {Color} color
   * @param {string} face
   * @param {FontFamily} family
   * @param {FontStyle} style
   * @param {FontWeight} weight
   * @param {boolean} underline
   */
  constructor(str, size, color, face, family, style, weight, underline) {
    super({
      color,
      ariaText: `the string ${str}, colored ${colorToSpokenString(
        color,
        "solid"
      )} of size ${size}`,
    });

    this.str = str;
    this.size = size;
    this.face = face;
    this.family = family;
    this.style = style === "slant" ? "oblique" : style;
    this.weight = weight === "light" ? "lighter" : weight;
    this.underline = underline;

    // NOTE: we *ignore* font-family, as it causes a number of font bugs due the browser inconsistencies
    // example: "bold italic 20px 'Times', sans-serif".
    // Default weight is "normal", face is "Arial"
    this.font = this.style ? `${this.style} ` : "";
    this.font += this.weight ? `${this.weight} ` : "normal ";
    this.font += this.size ? `${this.size}px ` : "";
    this.font += '"' + this.face ? this.face : "Arial" + '" ';
    this.font += this.family ? `, ${this.family}` : "";

    const metrics = getTextDimensions(str, this.font);

    this.width = metrics.width;
    this.height = metrics.height;
    this.alphaBaseline = metrics.ascent + baselineFudge;
    this.pinholeX = this.width / 2;
    this.pinholeY = this.alphaBaseline;
  }

  /**
   * TextImage constructor
   * @param {string} str
   * @param {number} size
   * @param {Color} color
   * @param {string} face
   * @param {FontFamily} family
   * @param {FontStyle} style
   * @param {FontWeight} weight
   * @param {boolean} underline
   * @returns {TextImage}
   */
  static new(str, size, color, face, family, style, weight, underline) {
    return new TextImage(
      str,
      size,
      color,
      face,
      family,
      style,
      weight,
      underline
    );
  }

  /**
   * TextImage equality check
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return (
      (other instanceof TextImage &&
        this.str === other.str &&
        this.size === other.size &&
        this.face === other.face &&
        this.family === other.family &&
        this.style === other.style &&
        this.weight === other.weight &&
        this.font === other.font &&
        this.underline === other.underline &&
        equals(this.color, other.color)) ||
      BaseImage.prototype.equals.call(this, other)
    );
  }

  /**
   * Renders a TextImage to screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.save();
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic"; // Note: NOT top, so that we can support accented characters
    ctx.font = this.font;

    // if 'outline' is enabled, use strokeText. Otherwise use fillText
    ctx.fillStyle = this.outline ? "white" : colorString(this.color);
    ctx.fillText(this.str, 0, this.alphaBaseline - 1); // handle the baseline offset here

    if (this.outline) {
      ctx.strokeStyle = colorString(this.color);
      ctx.strokeText(this.str, 0, this.alphaBaseline - 1);
    }

    if (this.underline) {
      ctx.beginPath();
      ctx.moveTo(0, this.size);
      // we use this.size, as it is more accurate for underlining than this.height
      ctx.lineTo(this.width, this.size);
      ctx.closePath();
      ctx.strokeStyle = colorString(this.color);
      ctx.stroke();
    }

    ctx.restore();
  }
}
