<p>
  [English]
  [<a href="doc/README_ja.md">日本語</a>]
</p>

# Typetalk to Slack Migration Tool

This is a tool to migrate from Typetalk to Slack.\
Convert exported data from Typetalk to csv format that can be imported with
Slack.

## Install

Install the latest [Deno CLI](https://deno.com/) version.\
And run the following command:

```sh
deno install -g --allow-read --reload --name tts https://ryu.app/gh/typetalk_to_slack/cli.ts
```

You can use `tts` command.

## Usage

You can use the following command to convert the file output from Typetalk to
csv format that can be imported into Slack. Redirect the output to a file due to
standard output.

### Example

```sh
tts convert messages.csv > messages_slack.csv
```

> [!NOTE]
> If the message body contains `\"`, it cannot be imported into Slack.
> So this tool replaces `\"` with `\“`.
