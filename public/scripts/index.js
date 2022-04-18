import { renderCanvas } from './canvas_renderer.js';
import { Canvas } from './canvas.js';
import { zoom } from './zoom.js';

const canvasWidth = 40;
const canvasHeight = 40;

window.onload = () => {
  renderCanvas(new Canvas({ width: canvasWidth, height: canvasHeight }));
};

const zoomCodes = {
  '+': true,
  '=': true,
  '-': false,
  '_': false
};

document.addEventListener('keypress', (event) => {
  const index = Object.keys(zoomCodes).indexOf(event.key);
  if (index !== -1) {
    zoom(zoomCodes[event.key]);
  }
});
