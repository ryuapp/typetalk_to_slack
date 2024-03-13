import { printf } from "../deps.ts";
import { sortSlackCSV } from "../src/sort_slack_csv.ts";
import { readStreamCSV } from "../mod.ts";

/**
 * Sort the csv file
 * @experiemental
 * @param {(string | number)} file
 * @returns {}
 */
export async function sort(file: string | number) {
  const filepath = String(file);
  if (!filepath.endsWith(".csv")) {
    console.error(
      `${filepath} is not a csv file.`,
    );
    return;
  }
  const sortedCSV = await sortSlackCSV(
    await readStreamCSV(filepath),
  );

  if (sortedCSV !== undefined) {
    printf(sortedCSV);
  }
}
