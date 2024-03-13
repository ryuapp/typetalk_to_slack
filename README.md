# Migrate Typetalk to Slack

This is a simple script to migrate Typetalk messages to Slack.\
Convert exported data from Typetalk to csv format that can be imported with
Slack.

## Install

Install the latest [Deno CLI](https://deno.com/) version.\
And run the following command:

```sh
deno install --name tts --allow-read  https://ryu.app/gh/typetalk_to_slack/cli.ts --reload
```

You can use `tts` command.

## Usage

```
tts convert [FILE]...
```

## Example

```sh
tts convert messages.csv > messages_slack.csv
```
