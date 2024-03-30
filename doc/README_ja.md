<p>
  [<a href="../README.md">English</a>]
  [日本語]
</p>

# TypetalkからSlackへの移行

TypetalkのメッセージをSlackに移行するためのシンプルなCLIです。\
Typetalkから出力したデータをSlackでインポートできるcsv形式に変換します。

## インストール

最新の[Deno CLI](https://deno.com/)をインストールしてください。\
インストールが終わったら、以下のコマンドを実行します。

```sh
deno install --name tts --allow-read  https://ryu.app/gh/typetalk_to_slack/cli.ts --reload
```

これで`tts`コマンドを使用できます。

## 使い方

下記のコマンドで、Typetalkから出力したファイルをSlackでインポートできるcsv形式に変換が行えます。標準出力されるため、リダイレクトしてファイルに保存してください。

### 例

```sh
tts convert messages.csv > messages_slack.csv
```
