# HTDP/image.js

A JavaScript port of the Racket Image library used in How To Design Programs.

Shared via the MIT License under the terms of [the original HTDP library's license](https://github.com/racket/htdp/blob/master/htdp-lib/LICENSE).

Special thanks to [Joe Gibbs Politz](https://twitter.com/joepolitz) for all his work on the Pyret language, Danny Yoo, Emmanuel Schanzer, and Ben Lerner for doing the bulk of the work translating the Image library from Racket into the original JavaScript version that was adapted for Pyret, and to all others who have worked on the code for this library. All I'm really doing is updating their work to use modern JavaScript syntax and idioms.

**Warning:** This port is still in beta status as we continue testing it. Use at your own risk.

## Installation

Simply run `npm install @jasonsbarr/htdp-image` to install the package. There are bundles for CJS modules, ES modules, and UMD modules.

## Usage

For use with ES Modules:

```js
import * as Image from "@jasonsbarr/htdp-image";

const square = Image.square(20, "solid", "red");
Image.render(square);
```

Or import a single function:

```js
import { square, render } from "@jasonsbarr/htdp-image";
```

For use with CommonJS (classic Node.js) modules:

```js
const Image = require("@jasonsbarr/htdp-image");

// or

const { square, render } = require("@jasonsbarr/htdp-image");
```

If you need the library available as a global variable in the browser you can simply include the bundle from unpkg:

```html
<script src="https://www.unpkg.com/@jasonsbarr/htdp-image@0.6.2/dist/index.umd.js"></script>

<script>
  const square = htdpImage.square(20, "solid", "red");
  htdpImage.render(square);
</script>
```

Image functions should run in both browser and Node.js (via JSDom) environments, so you should be able to do testing with a test runner like Mocha using this library.

## Documentation

The documentation is very much still a work in progress, if you can even call it that. I recommend using [the documentation for the original Racket library](https://docs.racket-lang.org/teachpack/2htdpimage.html) for now while I translate it into JavaScript. Note that in this library all function names are written in camelCase. The `triangle-*` functions have the letters all capitalized, e.g. `triangleSAS`.

### Rendering Images

Note that I've added an additional `render` function that is exported as a member of the main library that is necessary to render images to the screen in a vanilla JavaScript environment. It calls the `render` method on the image given to it and takes as an optional 2nd parameter a selected DOM element to render the image to (defaults to `document.body`).

The original Racket package obviously doesn't need this extra rendering function, so you won't find it in the documentation for it.
