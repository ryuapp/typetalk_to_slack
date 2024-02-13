import { zip } from "../deps.ts";

/**
 * Unzip a file and return the contents of messages.csv
 *
 * @experimental
 * @param {string} filename
 * @returns {string}
 */
export async function unzip(filename: string) {
  const path = filename.includes("/") ? filename : "./" + filename;
  const file = await Deno.readFile(path);
  const blob = new Blob([file]);
  const zipReader = new zip.ZipReader(new zip.BlobReader(blob));
  const entries = await zipReader.getEntries();
  const messages = entries.find((entry) => entry.filename === "messages.csv");

  if (messages && messages.getData) {
    const messageWriter = new zip.TextWriter();
    const csv = await messages.getData(messageWriter);
    await zipReader.close();
    return csv;
  }

  return "";
}
