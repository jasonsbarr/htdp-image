import * as ImageLib from "./image-lib/index.js";
import { makeDocument } from "./shared/document.js";

const document = makeDocument();

/**
 * Renders an image to the DOM
 * @param {ImageLib.BaseImage} image
 * @param {HTMLElement} element
 */
export const render = (image, element = document.body) => {
  const canvas = ImageLib.makeCanvas(image.width, image.height);
  const context = canvas.getContext("2d");

  element.appendChild(canvas);
  image.render(context);
};

export { ImageLib };
