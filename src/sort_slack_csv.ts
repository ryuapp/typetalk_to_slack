import { CSV } from "../deps.ts";

/**
 * Sorts csv for slack by date.
 * @experiemental
 * @param {string | ReadableStream<string[]>} csv
 * @returns {string} slack messages in CSV format
 */
export async function sortSlackCSV(csv: string | ReadableStream<string[]>) {
  const content = typeof csv === "string" ? CSV.parse(csv) : csv;
  const sortedMessages: (string | number)[][] = [];
  // Convert to string before sorting
  for await (const message of content) {
    const time = parseInt(message[0]);
    if (sortedMessages.length === 0) {
      sortedMessages.push(message);
      continue;
    }

    for (let i = 0; i < sortedMessages.length; i++) {
      const sortedTime = parseInt(sortedMessages[i][0].toString());
      if (time <= sortedTime) {
        sortedMessages.splice(i, 0, message);
        break;
      } else if (i === sortedMessages.length - 1) {
        sortedMessages.push(message);
        break;
      }
    }
  }
  return sortedMessages.join("\n");
}
