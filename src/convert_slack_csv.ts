import { CSV } from "../deps.ts";

/**
 * Attach double quotes to string;
 * @param {string | number} str
 * @param {number} commasCount
 * @returns {string}
 */
function quoteString(str: string | number, commasCount: number = 1) {
  for (let i = 0; i < commasCount; i++) {
    str = `"${str}"`;
  }
  return str;
}
/**
 * Convert the stream to slack messages in CSV format
 *
 * @param {string | ReadableStream<string[]>} csv
 * @returns {string} slack messages in CSV format
 */
export async function convertSlackCSV(
  csv: string | ReadableStream<string[]>,
  delimiter: string = ",",
) {
  const messages = [];
  let isHeader = true;
  const content = typeof csv === "string" ? CSV.parse(csv) : csv;

  for await (const message of content) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const timestamp = quoteString(new Date(message[5]).getTime() / 1000);
    const channel = quoteString(message[0]);
    const user = quoteString(message[2]);
    const body = quoteString(
      message[4].replace(/\\"/g, "\\“").replace(/\"/g, '\\"'),
    );
    messages.push([timestamp, channel, user, body].join(delimiter));
  }
  return messages.join("\n");
}
