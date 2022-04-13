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

const white = '#ffffff';
const grey = '#e3e3e3';

const canvasPixelColor1 = grey;
const canvasPixelColor2 = white;

const pencilColor = '#ff00dd';

let drawing = false;

const getColor = (i, j) => i % 2 !== j % 2;

const createPixel = (color) => {
  const pixel = document.createElement('div');
  pixel.style.backgroundColor = color.toString();
  pixel.classList.add('pixel');
  pixel.onmousedown = () => {
    console.log('clicked');
    drawing = true;
  };
  document.onmouseup = () => {
    drawing = false;
  };
  pixel.onmousemove = () => {
    if (drawing) {
      pixel.style.backgroundColor = pencilColor;
    }
  };
  return pixel;
};

const renderCanvas = (canvas) => {
  const canvasParent = document.createElement('div');
  canvasParent.classList.add('canvas-parent');
  const canvasElement = document.createElement('div');
  canvasElement.classList.add('canvas-element');
  document.body.appendChild(canvasParent);
  canvasParent.appendChild(canvasElement);

  for (let i = 0; i < canvas.height; i++) {
    const row = document.createElement('div');
    row.classList.add('pixel-row');
    for (let j = 0; j < canvas.width; j++) {
      const pixel = createPixel(canvas.pixels[i][j]);
      row.appendChild(pixel);
    }
    canvasElement.appendChild(row);
  }
};

export const createCanvas = () => {
  const canvas = new Image({ width: 40, height: 40 });

  for (let i = 0; i < canvas.height; i++) {
    canvas.pixels[i] = [];
    for (let j = 0; j < canvas.width; j++) {
      const pixelColor = getColor(i, j) ? canvasPixelColor1 : canvasPixelColor2;
      canvas.setPixel(i, j, pixelColor);
    }
  }

  renderCanvas(canvas);
};
