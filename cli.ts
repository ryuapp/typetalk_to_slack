import { convertSlackCSV, readStreamCSV, unzip } from "./mod.ts";
import { parseArgs } from "./deps.ts";

/**
 * Check if the file exists
 *
 * @param {string} filepath
 * @returns {Promise<boolean>}
 */
async function fileExists(filepath: string): Promise<boolean> {
  try {
    const file = await Deno.stat("./" + filepath);
    return file.isFile;
  } catch (_e) {
    return false;
  }
}
/**
 * Get the timestamp(YYYYMMDDHHmmss)
 *
 * @returns {string}
 */
function getTimestamp() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return timestamp;
}
/**
 * Write a CSV file
 *
 * @param {string} filepath
 * @param {string} data
 * @returns {void}
 */
function writeCSVFile(filepath: string, data: string) {
  Deno.writeTextFile(filepath, data);
}

const parsedArgs = parseArgs(Deno.args);
if (parsedArgs._.length === 0) {
  console.log("Please specify the file to convert.");
  Deno.exit(1);
}

const files = parsedArgs._;
for (const file of files) {
  const filepath = String(file);
  if (!filepath.endsWith(".csv") && !filepath.endsWith(".zip")) {
    console.log(
      `${filepath} is not a csv or a zip file.`,
    );
    continue;
  }
  const isExist = await fileExists(filepath);
  if (!isExist) {
    console.log(`${filepath} does not exist.`);
    continue;
  }

  let convertedCSV: string;
  if (filepath.endsWith(".zip")) {
    convertedCSV = await convertSlackCSV(await unzip(filepath));
  } else {
    convertedCSV = await convertSlackCSV(
      await readStreamCSV(filepath),
    );
  }

  const timestamp = getTimestamp();
  const filename = filepath.endsWith(".zip")
    ? filepath.replace(/\.zip$/, `_unzip_slack_${timestamp}.csv`)
    : filepath.replace(/\.csv$/, `_slack_${timestamp}.csv`);
  writeCSVFile(filename, convertedCSV);
  console.log(
    `${filepath} is converted to ${filename}!`,
  );
}
