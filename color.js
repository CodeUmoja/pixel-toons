/*
Class that represents color in RGBA format.
Parameters r, g, b range from 0 to 255.
Parameter alpha ranges from 0 to 1.
 */
export class Color {
  constructor(r, g, b, alpha = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
  }

  //"Factory method" that creates color from given HEX value
  static fromHex(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const res = { r, g, b };
    return res;
  }

  //Converts color to HEX format
  toHex(rgbColor) {
    let hex = '0x';
    for (const key in rgbColor) {
      hex += rgbColor[key].toString(16);
      if (rgbColor[key] === 0) hex += '0';
    }
    const res = hex;
    return res;
  }

  //Converts color to RGBA CSS format. Use when passing color to CSS style parameter
  toString() {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.alpha + ")";
  }
}