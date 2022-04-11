'use strict';

const white = '#ffffff';
const grey = '#e3e3e3';

const canvasPixelColor1 = grey;
const canvasPixelColor2 = white;

const pencilColor = '#ff00dd';

let drawing = false;

const getColor = (i, canvas) => {
  if (i > 0) {
    return canvas.pixels[i - 1][0] !== canvasPixelColor1; //opposite to first pixel of previous row
  } else {
    return false;
  }
};

const createPixel = (color) => {
  const pixel = document.createElement('div');
  pixel.style.backgroundColor = color;
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
  for (let i = 0; i < canvas.height; i++) {
    const row = document.createElement('div');
    row.classList.add('pixel-row');
    for (let j = 0; j < canvas.width; j++) {
      const pixel = createPixel(canvas.pixels[i][j]);
      row.appendChild(pixel);
    }
    document.body.appendChild(row);
  }
};

const createCanvas = () => {
  const canvas = { pixels: [], height: 40, width: 40 }; //canvas is a matrix of pixels

  for (let i = 0; i < canvas.height; i++) {
    let pixelColor = getColor(i, canvas);
    canvas.pixels[i] = [];
    for (let j = 0; j < canvas.width; j++) {
      canvas.pixels[i][j] = pixelColor ? canvasPixelColor1 : canvasPixelColor2;
      pixelColor = !pixelColor;
    }
  }

  renderCanvas(canvas);
};

window.onload = createCanvas;
