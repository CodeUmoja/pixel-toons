import { renderCanvas } from './canvas_renderer.js';
import { Canvas } from './canvas.js';

const canvasWidth = 40;
const canvasHeight = 40;

window.onload = () => {
  renderCanvas(new Canvas({ width: canvasWidth, height: canvasHeight }));
};
