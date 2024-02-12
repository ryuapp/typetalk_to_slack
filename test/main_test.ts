import { convertSlackCSV, readStreamCSV } from "../mod.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("csv", async () => {
  const convertedCSV = await convertSlackCSV(
    await readStreamCSV("./dummy/typetalk.csv"),
  );
  const decoder = new TextDecoder("utf-8");
  const slack = await Deno.readFile("./dummy/slack.csv");
  const slackCSV = decoder.decode(slack);

  assertEquals(convertedCSV, slackCSV);
});
