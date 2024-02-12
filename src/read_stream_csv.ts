import { CSV } from "../deps.ts";

/**
 * Load a CSV file and return a stream of parsed csv data
 *
 * @param {string} filename
 * @returns
 */
export async function readStreamCSV(filename: string) {
  const path = filename.includes("/") ? filename : "./" + filename;

  const { readable } = await Deno.open(path);

  const data = readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new CSV.CsvParseStream());

  return data;
}
