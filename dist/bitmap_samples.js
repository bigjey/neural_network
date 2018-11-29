"use strict";
var imgWidth = 28;
var imgHeight = 28;
var imageByteSize = imgWidth * imgHeight;
var headerByteSize = 80;
var cols = 50;
var rows = 20;
var loadData = function (filePath, cb) {
    var req = new XMLHttpRequest();
    req.open("GET", filePath, true);
    req.responseType = "arraybuffer";
    req.onload = function () {
        cb(new Uint8Array(req.response));
    };
    req.send(null);
};
var processData = function (bytes) {
    var offset = 0;
    var imgData = bytes.slice(offset * cols * rows * imageByteSize, (offset + 1) * cols * rows * imageByteSize);
    renderImage(imgData);
};
var renderImage = function (imgData) {
    var canvas = document.createElement("canvas");
    canvas.width = imgWidth * cols;
    canvas.height = imgHeight * rows;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < cols * rows; i++) {
        var pixels = ctx.createImageData(imgWidth, imgHeight);
        var imgOffset = imageByteSize * i;
        for (var pixel = 0; pixel < imageByteSize; pixel++) {
            pixels.data[pixel * 4 + 3] = imgData[imgOffset + pixel];
        }
        var y = (i / cols) | 0;
        var x = i % cols;
        ctx.putImageData(pixels, x * imgWidth, y * imgHeight);
    }
};
loadData("./data/flower_data", processData);
loadData("./data/cake_data", processData);
loadData("./data/stars_data", processData);
//# sourceMappingURL=bitmap_samples.js.map