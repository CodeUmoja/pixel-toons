const white = "#ffffff";
const grey = "#e3e3e3";

const pencilColor = "#ff0000";

let drawing = false;

const get_grey = (i, canvas) => {
    if (i > 0) {
        return canvas.pixels[i - 1][0] != grey; //opposite to first pixel of previous row
    } else {
        return false;
    }
}

const create_pixel = (color) => {
    let pixel = document.createElement("div");
    pixel.style.backgroundColor = color;
    pixel.classList.add("pixel");
    pixel.onmousedown = () => {
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
    for (let i = 0; i < canvas.height; i++) {
        let row = document.createElement("div");
        row.classList.add("pixel-row");
        for (let j = 0; j < canvas.width; j++) {
            let pixel = create_pixel(canvas.pixels[i][j]);
            row.appendChild(pixel);
        }
        document.body.appendChild(row);
    }
};

const create_canvas = () => {
    const canvas = { pixels: [], height: 40, width: 40 }; //canvas is a matrix of pixels

    for (let i = 0; i < canvas.height; i++) {
        let is_grey = get_grey(i, canvas);
        canvas.pixels[i] = [];
        for (let j = 0; j < canvas.width; j++) {
            canvas.pixels[i][j] = is_grey ? grey : white;
            is_grey = !is_grey;
        }
    }

    render_canvas(canvas);
};

window.onload = create_canvas;
