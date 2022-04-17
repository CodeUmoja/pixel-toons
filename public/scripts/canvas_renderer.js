/*
Set of functions which define how canvas is rendered into HTML.
 */

const CANVAS_PARETN_ID = 'canvas-parent';
const pencilColor = '#ff00dd';
let drawing = false;

export const renderCanvas = (canvas) => {
  const canvasElement = createCanvasElement();

  for (let i = 0; i < canvas.height; i++) {
    const row = createRowElement();

    for (let j = 0; j < canvas.width; j++) {
      const pixelElement = createPixelElement(canvas, i, j);
      row.appendChild(pixelElement);
    }
    canvasElement.appendChild(row);
  }
};

function createCanvasElement() {
  const canvasParent = document.createElement('div'); //parent-wrapper is needed for effective zooming
  canvasParent.id = 'canvas-parent';

  const canvasElement = document.createElement('div');
  canvasElement.classList.add('canvas-element');

  document.body.appendChild(canvasParent);
  canvasParent.appendChild(canvasElement);

  return canvasElement;
}

function createRowElement() {
  const row = document.createElement('div');
  row.classList.add('pixel-row');

  return row;
}

function createPixelElement(canvas, i, j) {
  const pixelElement = document.createElement('div');
  const color = canvas.image.pixels[i][j];

  pixelElement.style.backgroundColor = color.toString();
  pixelElement.style.width = getPixelSize(canvas) + 'px';
  pixelElement.style.height = getPixelSize(canvas) + 'px';
  pixelElement.classList.add('pixel');

  const setOnImageColor = (color) => {
    canvas.image.setPixel(i, j, color);
  };
  setPixelEvents(pixelElement, setOnImageColor);

  return pixelElement;
}

function setPixelEvents(pixelElement, setOnImageColor) {
  pixelElement.onmousedown = () => { //if mouse button is held pressed, we draw
    drawing = true;
  };

  document.onmouseup = () => { //if mouse button is released anywhere, we stop drawing
    drawing = false;
  };

  pixelElement.onmousemove = () => {
    if (drawing) {
      pixelElement.style.backgroundColor = pencilColor;
      setOnImageColor(pencilColor);
    }
  };
}

function getPixelSize(canvas) {
  const parent = document.getElementById(CANVAS_PARETN_ID);
  console.log(parent.offsetWidth / canvas.getWidth());
  return parent.offsetWidth / canvas.getWidth();
}
