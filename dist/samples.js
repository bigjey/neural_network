import { Perceptron as Network } from "./Perceptron.js";
import { Matrix } from "./matrix.js";
const imgWidth = 28;
const imgHeight = 28;
const imageByteSize = imgWidth * imgHeight;
const headerByteSize = 80;
const cols = 32;
const rows = 31;
const totalSamples = 1000;
let network = new Network(28 * 28, 64, 3, 0.05);
const loadData = (filePath) => {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", filePath, true);
        req.responseType = "arraybuffer";
        req.onload = function () {
            resolve(new Uint8Array(req.response));
        };
        req.onerror = function (err) {
            reject(err);
        };
        req.send(null);
    });
};
const renderImage = (imgData) => {
    const canvas = document.createElement("canvas");
    canvas.width = imgWidth * cols;
    canvas.height = imgHeight * rows;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
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
const CATEGORIES = {
    0: "Flower",
    1: "Cake",
    2: "Star"
};
const LoadAndProcess = (dataSets) => {
    console.log("loaded datasets", dataSets.length);
    const data = {
        training: [],
        testing: []
    };
    dataSets.forEach((dataset, category) => {
        for (var i = 0; i < totalSamples; i++) {
            let sample = {
                inputs: Array.from(dataset.slice(i * imageByteSize, (i + 1) * imageByteSize)).map((v) => v / 255),
                targets: Array(dataSets.length).fill(0),
                category
            };
            sample.targets[category] = 1;
            if (i < totalSamples * 0.8) {
                data.training.push(sample);
            }
            else {
                data.testing.push(sample);
            }
        }
    });
    data.training = data.training.sort(() => (Math.random() > 0.5 ? -1 : 1));
    data.testing = data.training.sort(() => (Math.random() > 0.5 ? -1 : 1));
    data.training.forEach((sample) => {
        const inputs = [...sample.inputs.map((v) => [v])];
        const targets = [...sample.targets.map((v) => [v])];
        network.train(Matrix.from(inputs), Matrix.from(targets));
    });
    let correct = 0;
    data.testing.forEach((sample) => {
        const inputs = [...sample.inputs.map((v) => [v])];
        const prediction = network
            .feedforward(Matrix.from(inputs))
            .values.map((arr) => arr[0]);
        const predictedCategory = prediction.indexOf(Math.max(...prediction));
        if (sample.category === predictedCategory) {
            correct++;
        }
    });
    console.log(`correctness: ${(correct / data.testing.length) * 100}%`);
};
const W = 280;
const H = 280;
const previewW = 28;
const previewH = 28;
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
canvas.width = W;
canvas.height = H;
ctx.lineWidth = 12;
ctx.lineJoin = ctx.lineCap = "round";
ctx.strokeStyle = "#000";
let drawing = false;
let lines = [];
function midPointBtw(p1, p2) {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2
    };
}
canvas.addEventListener("mousedown", function ({ clientX: x, clientY: y }) {
    drawing = true;
    lines.push([{ x, y }]);
});
canvas.addEventListener("mouseup", function (e) {
    drawing = false;
});
canvas.addEventListener("mousemove", function ({ clientX: x, clientY: y }) {
    if (!drawing)
        return;
    lines[lines.length - 1].push({ x, y });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    lines.forEach((line) => {
        let [p1, p2] = line;
        ctx.moveTo(p1.x, p1.y);
        for (let i = 1; i < line.length; i++) {
            let midPoint = midPointBtw(p1, p2);
            ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            p1 = line[i];
            p2 = line[i + 1];
        }
    });
    ctx.stroke();
});
function getInputsFromDrawing() {
    const preview = document.createElement("canvas");
    const previewCtx = preview.getContext("2d");
    preview.width = previewW;
    preview.height = previewH;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    previewCtx.clearRect(0, 0, preview.width, preview.height);
    previewCtx.drawImage(canvas, 0, 0, previewW, previewH);
    return Array.from(previewCtx.getImageData(0, 0, previewW, previewH).data)
        .filter((v, i) => (i + 1) % 4 === 0)
        .map((v) => v / 255.0);
}
const guess = window.document.getElementById("guess");
if (guess) {
    guess.addEventListener("click", () => {
        const inputs = [...getInputsFromDrawing().map((v) => [v])];
        const prediction = network
            .feedforward(Matrix.from(inputs))
            .values.map((arr) => arr[0]);
        const predictedCategory = prediction.indexOf(Math.max(...prediction));
        console.log(CATEGORIES[predictedCategory]);
    });
}
const reset = window.document.getElementById("reset");
if (reset) {
    reset.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lines = [];
    });
}
const train = window.document.getElementById("train");
if (train) {
    train.addEventListener("click", () => {
        Promise.all([
            loadData("./data/flower_data"),
            loadData("./data/cake_data"),
            loadData("./data/star_data")
        ])
            .then(LoadAndProcess)
            .catch(console.log);
    });
}
//# sourceMappingURL=samples.js.map