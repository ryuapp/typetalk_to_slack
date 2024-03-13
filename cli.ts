import { convert } from "./command/convert.ts";
import { parseArgs } from "./deps.ts";

const parsedArgs = parseArgs(Deno.args);
if (parsedArgs._.length === 0) {
  console.info("Usage: tts convert [FILE]...");
  Deno.exit(1);
}

const command = parsedArgs._[0];
const files = parsedArgs._.slice(1);
if (command === "convert") {
  await convert(files);
} else {
  console.error("Unknown command.\nNow only support 'convert' command.");
  Deno.exit(1);
}
