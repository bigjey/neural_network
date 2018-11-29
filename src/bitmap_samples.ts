const imgWidth: number = 28;
const imgHeight: number = 28;
const imageByteSize: number = imgWidth * imgHeight;
const headerByteSize: number = 80;
const cols: number = 50;
const rows: number = 20;

const loadData = (filePath: string, cb: Function) => {
  var req = new XMLHttpRequest();

  req.open("GET", filePath, true);
  req.responseType = "arraybuffer";

  req.onload = function() {
    cb(new Uint8Array(req.response));
  };

  req.send(null);
};

const processData = (bytes: Uint8Array) => {
  let offset = 0;
  var imgData = bytes.slice(
    offset * cols * rows * imageByteSize,
    (offset + 1) * cols * rows * imageByteSize
  );

  renderImage(imgData);
};

const renderImage = (imgData: Uint8Array) => {
  const canvas = document.createElement("canvas");
  canvas.width = imgWidth * cols;
  canvas.height = imgHeight * rows;
  document.body.appendChild(canvas);

  const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

  for (var i = 0; i < cols * rows; i++) {
    const pixels = ctx.createImageData(imgWidth, imgHeight);
    const imgOffset = imageByteSize * i;

    for (var pixel = 0; pixel < imageByteSize; pixel++) {
      pixels.data[pixel * 4 + 3] = imgData[imgOffset + pixel];
    }

    let y = (i / cols) | 0;
    let x = i % cols;

    ctx.putImageData(pixels, x * imgWidth, y * imgHeight);
  }
};

loadData("./../data/flower_data", processData);
loadData("./../data/cake_data", processData);
loadData("./../data/stars_data", processData);
