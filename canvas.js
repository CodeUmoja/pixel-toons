const canvas = { pixels: [], height: 40, width: 40 }; //canvas is a matrix of pixels

const white = "#ffffff";
const grey = "#e3e3e3";

const get_grey = (i) => {
    if (i > 0) {
        return canvas.pixels[i - 1][0] != grey; //opposite to first pixel of previous row
    } else {
        return false;
    }
}

for (let i = 0; i < canvas.height; i++) {
    let is_grey = get_grey(i);
    canvas.pixels[i] = [];
    for (let j = 0; j < canvas.width; j++) {
        canvas.pixels[i][j] = is_grey ? grey : white;
        is_grey = !is_grey;
    }
}
