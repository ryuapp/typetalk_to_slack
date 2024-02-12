# Migrate Typetalk to Slack

This is a simple script to migrate Typetalk messages to Slack.\
Convert exported data from Typetalk to csv format that can be imported with
Slack.

## Install

Install the latest [Deno CLI](https://deno.com/) version.\
And run the following command:

```sh
deno install https://ryu.app/gh/typetalk_to_slack/cli.ts --name tts
```

You can use `tts` command.

## Usage

```
tts [FILE]...
```

## Example

```sh
tts messages.csv
// output: messages_slack_YYYYMMDDHHmmss
```
