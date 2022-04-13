import { Color } from "./color.js";

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

const white = "#ffffff";
const grey = "#e3e3e3";
const pencilColor = "#ff00dd";

let drawing = false;

const get_grey = (i, j) => {
    return i % 2 !== j % 2;
}

const create_pixel = (color) => {
    let pixel = document.createElement("div");
    pixel.style.backgroundColor = color.toString();
    pixel.classList.add("pixel");
    pixel.onmousedown = () => {
        console.log("clicked");
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

const render_canvas = (canvas) => {
    let canvasParent = document.createElement("div");
    canvasParent.classList.add("canvas-parent");
    let canvasElement = document.createElement("div");
    canvasElement.classList.add("canvas-element");
    document.body.appendChild(canvasParent);
    canvasParent.appendChild(canvasElement);

    for (let i = 0; i < canvas.height; i++) {
        let row = document.createElement("div");
        row.classList.add("pixel-row");
        for (let j = 0; j < canvas.width; j++) {
            let pixel = create_pixel(canvas.pixels[i][j]);
            row.appendChild(pixel);
        }
        canvasElement.appendChild(row);
    }
};

export const create_canvas = () => {
    const canvas = new Image({ width: 40, height: 40 });

    for (let i = 0; i < canvas.height; i++) {
        canvas.pixels[i] = [];
        for (let j = 0; j < canvas.width; j++) {
            const pixelColor = get_grey(i, j) ? grey : white;
            canvas.setPixel(i, j, pixelColor);
        }
    }

    render_canvas(canvas);
};
