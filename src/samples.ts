import { Perceptron as Network, Perceptron } from "./Perceptron.js";
import { randInt, rand } from "./utils.js";
import { Matrix } from "./matrix.js";

const imgWidth: number = 28;
const imgHeight: number = 28;
const imageByteSize: number = imgWidth * imgHeight;
const cols: number = 10;
const rows: number = 10;
const totalSamples: number = 2000;

const loadData = (filePath: string): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();

    req.open("GET", filePath, true);
    req.responseType = "arraybuffer";

    req.onload = function() {
      resolve(new Uint8Array(req.response));
    };

    req.onerror = function(err) {
      reject(err);
    };

    req.send(null);
  });
};

const renderImage = (imgData: Uint8Array) => {
  const canvas = document.createElement("canvas");
  canvas.width = imgWidth * cols;
  canvas.height = imgHeight * rows;
  document.body.appendChild(canvas);

  const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

  let offset = randInt(0, 2000 - cols * rows);

  for (var i = 0; i < cols * rows; i++) {
    const pixels = ctx.createImageData(imgWidth, imgHeight);
    const imgOffset = imageByteSize * (i + offset);

    for (var pixel = 0; pixel < imageByteSize; pixel++) {
      pixels.data[pixel * 4 + 3] = imgData[imgOffset + pixel];
    }

    let y = (i / cols) | 0;
    let x = i % cols;

    ctx.putImageData(pixels, x * imgWidth, y * imgHeight);
  }
};

interface SampleData {
  training: Sample[];
  testing: Sample[];
}

interface Sample {
  inputs: number[];
  targets: number[];
  category: number;
}

interface Category {
  title: string;
  file: string;
}

const categories: Category[] = [
  {
    title: "Banana",
    file: "banana_data"
  },
  // {
  //   title: "Bed",
  //   file: "bed_data"
  // },
  // { title: "Bus", file: "bus_data" },
  { title: "Cake", file: "cake_data" },
  { title: "Crab", file: "crab_data" },
  { title: "Donut", file: "donut_data" },
  { title: "Floor Lamp", file: "floor_lamp_data" },
  { title: "Flower", file: "flower_data" },
  // { title: "Hammer", file: "hammer_data" },
  { title: "House", file: "house_data" },
  { title: "Mushroom", file: "mushroom_data" },
  { title: "Pizza", file: "pizza_data" },
  { title: "Skull", file: "skull_data" },
  { title: "Stairs", file: "stairs_data" },
  { title: "Star", file: "star_data" },
  { title: "Tornado", file: "tornado_data" },
  { title: "Washing Machine", file: "washing_machine_data" }
];

let network: Perceptron = new Network(
  imageByteSize,
  128,
  categories.length,
  0.05
);

const LoadAndProcess = (dataSets: Uint8Array[]) => {
  const data: SampleData = {
    training: [],
    testing: []
  };

  dataSets.forEach(renderImage);

  setTimeout(() => {
    dataSets.forEach((dataset: Uint8Array, category) => {
      for (var i = 0; i < totalSamples; i++) {
        let sample: Sample = {
          inputs: Array.from(
            dataset.slice(i * imageByteSize, (i + 1) * imageByteSize)
          ).map((v: number) => v / 255),
          targets: Array(dataSets.length).fill(0),
          category
        };

        sample.targets[category] = 1;

        if (i < totalSamples * 0.8) {
          data.training.push(sample);
        } else {
          data.testing.push(sample);
        }
      }
    });

    data.training = data.training.sort(() => (Math.random() > 0.5 ? -1 : 1));
    data.testing = data.training.sort(() => (Math.random() > 0.5 ? -1 : 1));

    data.training.forEach((sample: Sample) => {
      const inputs: number[][] = [...sample.inputs.map((v) => [v])];
      const targets: number[][] = [...sample.targets.map((v) => [v])];

      network.train(Matrix.from(inputs), Matrix.from(targets));
    });

    let correct = 0;
    data.testing.forEach((sample: Sample) => {
      const inputs: number[][] = [...sample.inputs.map((v) => [v])];

      const prediction = network
        .feedforward(Matrix.from(inputs))
        .values.map((arr: number[]) => arr[0]);

      const predictedCategory = prediction.indexOf(Math.max(...prediction));

      if (sample.category === predictedCategory) {
        correct++;
      }
    });

    console.log(`correctness: ${(correct / data.testing.length) * 100}%`);
  }, 0);
};

const W = 280;
const H = 280;

const previewW = 28;
const previewH = 28;

const canvas = <HTMLCanvasElement>document.getElementById("draw");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

canvas.width = W;
canvas.height = H;

ctx.lineWidth = 12;
ctx.lineJoin = ctx.lineCap = "round";
ctx.strokeStyle = "#000";

interface Coord {
  x: number;
  y: number;
}

let drawing = false;
let lines: Coord[][] = [];

function midPointBtw(p1: Coord, p2: Coord) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

canvas.addEventListener("mousedown", function({ clientX: x, clientY: y }) {
  drawing = true;
  lines.push([{ x, y }]);
});

canvas.addEventListener("mouseup", function(e) {
  drawing = false;
});

canvas.addEventListener("mousemove", function({ clientX: x, clientY: y }) {
  if (!drawing) return;

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
  const preview = <HTMLCanvasElement>document.createElement("canvas");
  const previewCtx = <CanvasRenderingContext2D>preview.getContext("2d");

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
    const inputs: number[][] = [...getInputsFromDrawing().map((v) => [v])];

    const prediction = network
      .feedforward(Matrix.from(inputs))
      .values.map((arr: number[]) => arr[0]);

    const predictedCategory: number = prediction.indexOf(
      Math.max(...prediction)
    );

    console.log(categories[predictedCategory].title);
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
    Promise.all(
      categories.map((category: Category) => loadData(`data/${category.file}`))
    )
      .then(LoadAndProcess)
      .catch(console.log);
  });
}
