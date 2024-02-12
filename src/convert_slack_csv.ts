/**
 * Attach double quotes to string;
 */
function quoteString(str: string | number) {
  return `"${str}"`;
}
/**
 * Convert the stream to slack messages in CSV format
 *
 * @param {ReadableStream} csv
 * @returns {string} slack messages in CSV format
 */
export async function convertSlackCSV(csv: ReadableStream<string[]>) {
  const messages = [];
  let isHeader = true;
  for await (const message of csv) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const timestamp = quoteString(new Date(message[5]).getTime() / 1000);
    const channel = quoteString(message[0]);
    const user = quoteString(message[2]);
    const body = quoteString(message[4].replace(/"/g, '\\"'));
    messages.push([timestamp, channel, user, body]);
  }

  return messages.join("\n");
}
