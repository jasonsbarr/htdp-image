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

export class TextImage extends BaseImage {
  constructor(str, size, color, face, family, style, weight, underline) {}

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
}
