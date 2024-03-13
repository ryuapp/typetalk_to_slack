import { convert } from "./command/convert.ts";
import { sort } from "./command/sort.ts";
import { parseArgs } from "./deps.ts";

const parsedArgs = parseArgs(Deno.args);
if (parsedArgs._.length === 0 || parsedArgs._[0] === "help") {
  console.info("Usage: tts <command> <file>\n");
  console.info("Commands");
  console.info("convert\t\tConvert typetalk to slack messages");
  console.info("sort\t\tSort slack csv file by date");
  Deno.exit(1);
}

const command = parsedArgs._[0];
const files = parsedArgs._.slice(1);
if (command === "convert") {
  await convert(files);
} else if (command === "sort") {
  await sort(files[0]);
} else {
  console.error("Unknown command. Use help to see the available commands.");
  Deno.exit(1);
}
