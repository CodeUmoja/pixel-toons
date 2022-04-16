import { Color } from './color.js';

/*
Class that represents an image.
Parameter pixels represents a matrix of colors.
 */
export class Image {
  //Create a basic image and set all pixels to black and fully transparent
  constructor({ width, height }) {
    this.width = width;
    this.height = height;

    this.pixels = [];
    for (let i = 0; i < height; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < width; j++) {
        this.pixels[i][j] = new Color(0, 0, 0, 0);
      }
    }
  }

  setPixel(i, j, color) {
    this.pixels[i][j] = Color.fromHex(color);
  }
}

/*
Class-wrapper for an image or a few different image layers
 */
export class Canvas {

  constructor({ width, height }) {
    const image = new Image({ width, height });
    this.width = width;
    this.height = height;
    this.image = image;

    this.clear();
  }

  clear() {
    createBasicBackground(this.image);
  }

  clearPixel(i, j) {
    this.image.setPixel(i, j, getClearPixelColor(i, j));
  }

}

//Colors for creating a basic grey-white background
const transparentColorFirst = '#ffffff';
const transparentColorSecond = '#e3e3e3';

//Function to turn image into a basic grey-white background which indicates transparency
function createBasicBackground(image) {
  for (let i = 0; i < image.height; i++) {
    for (let j = 0; j < image.width; j++) {
      const pixelColor = getClearPixelColor(i, j);
      image.setPixel(i, j, pixelColor);
    }
  }
}

//Get color of transparent pixel based on its coordinates
function getClearPixelColor(i, j) {
  if (i % 2 !== j % 2) { //the condition makes sure that neighbouring pixels are always of different color
    return transparentColorFirst; //first pixel is always white
  } else {
    return transparentColorSecond;
  }
}
