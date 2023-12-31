/**
 * @typedef Color
 * @prop {"color"} type
 * @prop {number} r red
 * @prop {number} g green
 * @prop {number} b blue
 * @prop {number} a alpha
 */
/**
 * Color constructor
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a=1]
 * @returns {Color}
 */
export const color = (r, g, b, a = 1) => ({ type: "color", r, g, b, a });

/**
 * Checks if a value is a Color
 * @param {any} o
 * @returns {boolean}
 */
export const isColor = (o) => o?.type && o.type === "color";

export const orange = color(255, 165, 0, 1);
export const red = color(255, 0, 0, 1);
export const orangeRed = color(255, 69, 0, 1);
export const tomato = color(255, 99, 71, 1);
export const darkRed = color(139, 0, 0, 1);
export const fireBrick = color(178, 34, 34, 1);
export const crimson = color(220, 20, 60, 1);
export const deepPink = color(255, 20, 147, 1);
export const maroon = color(176, 48, 96, 1);
export const indianRed = color(205, 92, 92, 1);
export const mediumVioletRed = color(199, 21, 133, 1);
export const violetRed = color(208, 32, 144, 1);
export const lightCoral = color(240, 128, 128, 1);
export const hotPink = color(255, 105, 180, 1);
export const paleVioletRed = color(219, 112, 147, 1);
export const lightPink = color(255, 182, 193, 1);
export const rosyBrown = color(188, 143, 143, 1);
export const pink = color(255, 192, 203, 1);
export const orchid = color(218, 112, 214, 1);
export const lavenderBlush = color(255, 240, 245, 1);
export const snow = color(255, 250, 250, 1);
export const chocolate = color(210, 105, 30, 1);
export const saddleBrown = color(139, 69, 19, 1);
export const brown = color(132, 60, 36, 1);
export const darkOrange = color(255, 140, 0, 1);
export const coral = color(255, 127, 80, 1);
export const sienna = color(160, 82, 45, 1);
export const salmon = color(250, 128, 114, 1);
export const peru = color(205, 133, 63, 1);
export const darkGoldenrod = color(184, 134, 11, 1);
export const goldenrod = color(218, 165, 32, 1);
export const sandyBrown = color(244, 164, 96, 1);
export const lightSalmon = color(255, 160, 122, 1);
export const darkSalmon = color(233, 150, 122, 1);
export const gold = color(255, 215, 0, 1);
export const yellow = color(255, 255, 0, 1);
export const olive = color(128, 128, 0, 1);
export const burlywood = color(222, 184, 135, 1);
export const tan = color(210, 180, 140, 1);
export const navajoWhite = color(255, 222, 173, 1);
export const peachPuff = color(255, 218, 185, 1);
export const khaki = color(240, 230, 140, 1);
export const darkKhaki = color(189, 183, 107, 1);
export const moccasin = color(255, 228, 181, 1);
export const wheat = color(245, 222, 179, 1);
export const bisque = color(255, 228, 196, 1);
export const paleGoldenrod = color(238, 232, 170, 1);
export const blanchedAlmond = color(255, 235, 205, 1);
export const mediumGoldenrod = color(234, 234, 173, 1);
export const papayaWhip = color(255, 239, 213, 1);
export const mistyRose = color(255, 228, 225, 1);
export const lemonChiffon = color(255, 250, 205, 1);
export const antiqueWhite = color(250, 235, 215, 1);
export const cornsilk = color(255, 248, 220, 1);
export const lightGoldenrodYellow = color(250, 250, 210, 1);
export const oldLace = color(253, 245, 230, 1);
export const linen = color(250, 240, 230, 1);
export const lightYellow = color(255, 255, 224, 1);
export const seashell = color(255, 245, 238, 1);
export const beige = color(245, 245, 220, 1);
export const floralWhite = color(255, 250, 240, 1);
export const ivory = color(255, 255, 240, 1);
export const green = color(0, 255, 0, 1);
export const lawnGreen = color(124, 252, 0, 1);
export const chartreuse = color(127, 255, 0, 1);
export const greenYellow = color(173, 255, 47, 1);
export const yellowGreen = color(154, 205, 50, 1);
export const mediumForestGreen = color(107, 142, 35, 1);
export const oliveDrab = color(107, 142, 35, 1);
export const darkOliveGreen = color(85, 107, 47, 1);
export const darkSeaGreen = color(143, 188, 139, 1);
export const lime = color(0, 255, 0, 1);
export const darkGreen = color(0, 100, 0, 1);
export const limeGreen = color(50, 205, 50, 1);
export const forestGreen = color(34, 139, 34, 1);
export const springGreen = color(0, 255, 127, 1);
export const mediumSpringGreen = color(0, 250, 154, 1);
export const seaGreen = color(46, 139, 87, 1);
export const mediumSeaGreen = color(60, 179, 113, 1);
export const aquamarine = color(112, 216, 144, 1);
export const lightGreen = color(144, 238, 144, 1);
export const paleGreen = color(152, 251, 152, 1);
export const mediumAquamarine = color(102, 205, 170, 1);
export const turquoise = color(64, 224, 208, 1);
export const lightSeaGreen = color(32, 178, 170, 1);
export const mediumTurquoise = color(72, 209, 204, 1);
export const honeydew = color(240, 255, 240, 1);
export const mintCream = color(245, 255, 250, 1);
export const royalBlue = color(65, 105, 225, 1);
export const dodgerBlue = color(30, 144, 255, 1);
export const deepSkyBlue = color(0, 191, 255, 1);
export const cornflowerBlue = color(100, 149, 237, 1);
export const steelBlue = color(70, 130, 180, 1);
export const lightSkyBlue = color(135, 206, 250, 1);
export const darkTurquoise = color(0, 206, 209, 1);
export const cyan = color(0, 255, 255, 1);
export const aqua = color(0, 255, 255, 1);
export const darkCyan = color(0, 139, 139, 1);
export const teal = color(0, 128, 128, 1);
export const skyBlue = color(135, 206, 235, 1);
export const cadetBlue = color(95, 158, 160, 1);
export const darkSlateGray = color(47, 79, 79, 1);
export const darkSlateGrey = darkSlateGray;
export const lightSlateGray = color(119, 136, 153, 1);
export const lightSlateGrey = lightSlateGray;
export const slateGray = color(112, 128, 144, 1);
export const slateGrey = slateGray;
export const lightSteelBlue = color(176, 196, 222, 1);
export const lightBlue = color(173, 216, 230, 1);
export const powderBlue = color(176, 224, 230, 1);
export const paleTurquoise = color(175, 238, 238, 1);
export const lightCyan = color(224, 255, 255, 1);
export const aliceBlue = color(240, 248, 255, 1);
export const azure = color(240, 255, 255, 1);
export const mediumBlue = color(0, 0, 205, 1);
export const darkBlue = color(0, 0, 139, 1);
export const midnightBlue = color(25, 25, 112, 1);
export const navy = color(36, 36, 140, 1);
export const blue = color(0, 0, 255, 1);
export const indigo = color(75, 0, 130, 1);
export const blueViolet = color(138, 43, 226, 1);
export const mediumSlateBlue = color(123, 104, 238, 1);
export const slateBlue = color(106, 90, 205, 1);
export const purple = color(160, 32, 240, 1);
export const darkSlateBlue = color(72, 61, 139, 1);
export const darkViolet = color(148, 0, 211, 1);
export const darkOrchid = color(153, 50, 204, 1);
export const mediumPurple = color(147, 112, 219, 1);
export const mediumOrchid = color(186, 85, 211, 1);
export const magenta = color(255, 0, 255, 1);
export const fuchsia = color(255, 0, 255, 1);
export const darkMagenta = color(139, 0, 139, 1);
export const violet = color(238, 130, 238, 1);
export const plum = color(221, 160, 221, 1);
export const lavender = color(230, 230, 250, 1);
export const thistle = color(216, 191, 216, 1);
export const ghostWhite = color(248, 248, 255, 1);
export const white = color(255, 255, 255, 1);
export const whiteSmoke = color(245, 245, 245, 1);
export const gainsboro = color(220, 220, 220, 1);
export const lightGray = color(211, 211, 211, 1);
export const lightGrey = lightGray;
export const silver = color(192, 192, 192, 1);
export const gray = color(190, 190, 190, 1);
export const grey = gray;
export const darkGray = color(169, 169, 169, 1);
export const darkGrey = darkGray;
export const dimGray = color(105, 105, 105, 1);
export const dimGrey = dimGray;
export const black = color(0, 0, 0, 1);
export const transparent = color(0, 0, 0, 0);
