const rawDataFolder = "./data/raw";
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const NPY_HEAD_BYTES = 80;
const DATA_SIZE_BYTES = 28 * 28;
const SAMPLES = 4000;

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

(async () => {
  try {
    const files = await readdir(rawDataFolder);
    await Promise.all(
      files.map(async (file) => {
        try {
          const data = await readFile(`./data/raw/${file}`);
          const fileName = path.basename(file, path.extname(file));

          const sampleFile = `./data/${fileName}`;
          const sample = data.slice(
            NPY_HEAD_BYTES,
            NPY_HEAD_BYTES + DATA_SIZE_BYTES * SAMPLES
          );
          await fs.writeFileSync(sampleFile, sample);
        } catch (e) {
          throw e;
          console.log(`could not process ${file}`);
          console.log(e.message);
        }
      })
    );
  } catch (e) {
    console.log(e);
  }
})();
