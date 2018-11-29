const fs = require("fs");
const path = require("path");

const NPY_HEAD_BYTES = 80;
const DATA_SIZE_BYTES = 28 * 28;

const [, , ...args] = process.argv;

const param_regex = /^--([A-Za-z]+)=([^\s]+)$/;

const defaultParams = {
  samples: 1000
};

let params = Object.assign(
  {},
  defaultParams,
  args.reduce((params, param) => {
    let [, name, value] = param_regex.exec(param);

    if (typeof name === "undefined") {
      throw new Error(`Bad param: ${param}`);
    }

    if (typeof value === "undefined") {
      throw new Error(`Bad param value: ${name}`);
    }

    params[name] = value;

    return params;
  }, {})
);

if (typeof params.src === "undefined") {
  throw new Error("You need to provide path to source .npy file");
}

if (typeof params.samples !== "undefined" && isNaN(params.samples)) {
  throw new Error("'samples' param should be number");
} else {
  params.samples = Number(params.samples);
}

try {
  const data = fs.readFileSync(params.src);
  const TOTAL_REQUESTED_DATA =
    NPY_HEAD_BYTES + DATA_SIZE_BYTES * params.samples;

  if (data.length < TOTAL_REQUESTED_DATA) {
    throw new Error(
      `source data ${
        data.length
      }b is smaller than requested ${TOTAL_REQUESTED_DATA}b`
    );
  }

  const fileName = path.basename(params.src, path.extname(params.src));

  const sampleFile = `./data/${fileName}`;
  const testingSample = data.slice(
    NPY_HEAD_BYTES,
    NPY_HEAD_BYTES + DATA_SIZE_BYTES * params.samples
  );
  fs.writeFileSync(sampleFile, testingSample);

  console.log(`\n  ${params.src} was processed`);
  console.log(`  ${params.samples} samples were extracted to ${sampleFile}\n`);
} catch (e) {
  console.log(e.message);
}
