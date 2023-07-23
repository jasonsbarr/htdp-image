# HTDP/image.js

A JavaScript port of the Racket Image library used in How To Design Programs.

Shared via the MIT License under the terms of [the original HTDP library's license](https://github.com/racket/htdp/blob/master/htdp-lib/LICENSE).

Special thanks to [Joe Gibbs Politz](https://twitter.com/joepolitz) for all his work on the Pyret language, including translating this library into a JavaScript module for Pyret, the developers of [Whalesong](https://www.hashcollision.org/whalesong/) who originally translated it (or at least parts of it, I'm not 100% sure) into JavaScript, and to all others who have worked on the code for this library. All I'm really doing is updating their work to use modern JavaScript syntax and idioms.

## Installation

Simply run `npm install @jasonsbarr/htdp-image` to install the package. There are bundles for CJS modules, ES modules, and UMD modules.

## Usage

For use with ES Modules:

```js
import * as Image from "@jasonsbarr/htdp-image";

const square = Image.square(20, "solid", "red");
```

Or import a single function:

```js
import { square } from "@jasonsbarr/htdp-image";
```

For use with CommonJS (classic Node.js) modules:

```js
const Image = require("@jasonsbarr/htdp-image");

// or

const { square } = require("@jasonsbarr/htdp-image");
```

Rendering functions should run in both browser and Node.js (via JSDom) environments, so you should be able to do testing with a test runner like Mocha using this library.

## Documentation

The documentation is very much still a work in progress, if you can even call it that. I recommend using [the documentation for the original Racket library](https://docs.racket-lang.org/teachpack/2htdpimage.html) for now while I translate it into JavaScript. Note that in this library all function names are written in camelCase. The `triangle-*` functions have the letters all capitalized, e.g. `triangleSAS`.

### Rendering Images

Note that I've added an additional `render` function that is exported as a member of the main library that is necessary to render images to the screen in a vanilla JavaScript environment. It calls the `render` method on the image given to it and takes as an optional 2nd parameter a selected DOM element to render the image to (defaults to `document.body`).

Example usage:

```js
import { square, render } from "@jasonsbarr/htdp-image";

render(square(20, "solid", "red")); // should render a solid, red 20x20 square to the screen
```

The original Racket package obviously doesn't need this extra rendering function, so you won't find it in the documentation for it.
