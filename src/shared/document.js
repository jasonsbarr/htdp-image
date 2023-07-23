let jsdom = {};
let JSDOM = function () {};

(async () => {
  if (typeof window === "undefined") {
    jsdom = await import("jsdom");
  } else {
    jsdom = { JSDOM };
  }
})();

export const makeDocument = () => {
  let document;
  if (typeof window === "undefined") {
    const html = `<!doctype html>
<html>
  <head></head>
  <body></body>
</html>`;
    const dom = new jsdom.JSDOM(html);

    document = dom.window.document;
  } else {
    document = window.document;
  }

  return document;
};
