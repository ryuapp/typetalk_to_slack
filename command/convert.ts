import { convertSlackCSV, readStreamCSV, unzip } from "../mod.ts";
import { printf } from "../deps.ts";
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
 * Convert the files to slack messages in CSV format
 * @param {(string | number)[]} files
 * @returns {}
 */
export async function convert(files: (string | number)[]) {
  let isPrinted = false;
  for (const file of files) {
    const filepath = String(file);
    if (!filepath.endsWith(".csv") && !filepath.endsWith(".zip")) {
      console.error(
        `${filepath} is not a csv or zip file.`,
      );
      continue;
    }
    const isExist = await fileExists(filepath);
    if (!isExist) {
      console.error(`${filepath} does not exist.`);
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
    if (isPrinted) printf("\n");
    printf(convertedCSV);
    isPrinted = true;
  }
}
