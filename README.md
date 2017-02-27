# Watson Conversation デモ

## Node.jsで会話アプリを構築するためのデモソース。

音声の入出力を簡素化するための[speech-javascript-sdk](https://github.com/watson-developer-cloud/speech-javascript-sdk/releases) を使用した、Watson Speech to Text (STT) および、Text to Speech (TTS)のストリーミングI/Oにて、音声による会話を可能とします。  

## アプリの使用手順

1. 以下のURLにアクセスします。
    - [https://710-o900156-conversation-examples.au-syd.mybluemix.net](https://710-o900156-conversation-examples.au-syd.mybluemix.net)
1. テキスト入力して、Enterキーもしくは『送信』ボタンをクリック
    - Watsonからの応答が表示されるとともに、音声にて読み上げます。
       - (ただし、画面表示と音声出力にタイムラグがあります。)
1. テキスト入力の代わりに、マイクボタンをクリックしてからマイクに向けて喋り、再度マイクボタンをクリックすることにより、自動的に内容を送信します。
1. 学習させた会話の内容は『学習済みの会話』リンクをクリックすることにより、別ウィンドウで内容が表示されますので、そちらで確認することができます。
    - [ヘルプ画面](https://710-o900156-conversation-examples.au-syd.mybluemix.net/help.html)
    - また、学習内容をエクスポートしたファイル(JSON)もこのページからダウンロードすることができます。


## ファイル構成

	conversation-examples/
	    ├ .cfignore
	    ├ .gitignore
	    ├ app.js ← スタートポイント
	    ├ package.json
	    ├ README.md ← このファイル
	    │
	    ├ client/
	    │    ├ index.js
	    │    └ play-process.js
	    │
	    ├ public/
	    │    ├ css/
	    │    │    └ mybootstrap.css
	    │    ├ img/
	    │    │    └ microphone.svg
	    │    ├ conversation-sample-workspace.json
	    │    ├ favicon.ico
	    │    ├ help.html
	    │    └ watson-speech.js
	    │
	    ├ routes/
	    │    ├ index.js
	    │    ├ stt.js
	    │    └ tts.js
	    │
	    ├ utils/
	    │    └ context.js
	    │
	    └ views/
	    　    └ index.ejs

| ファイルパス | 出自 |
|:---------|:-----|
| /app.js| オリジナル |
| /package.json | [一平氏stt-masterをもとに追記](https://github.com/ippei0605/stt/blob/master/package.json) |
| /README.md | オリジナル |
| /client/index.js | [Text to Speechデモ](https://github.com/nfriedly/tts-timing/client/index.js) |
| /client/play-process.js | [Text to Speechデモのserver-process.js](https://github.com/nfriedly/tts-timing/client/server-process.js) をリネーム |
| /public/css/mybootstrap.css |  [一平氏 stt-master から拝借](https://github.com/ippei0605/stt/blob/master/public/mybootstrap.css) |
| /public/img/microphone.svg | [Watson Speech JavaScript SDK Examples](https://github.com/nfriedly/speech-dialog/blob/master/public/images/icons/microphone.svg) |
| /public/conversation-sample-workspace.json | オリジナル |
| /pblic/favicon.ico | [一平氏 stt-masterから拝借](https://github.com/ippei0605/stt/blob/master/public/favicon.ico) |
| /public/help.html | オリジナル |
| /public/watson-speech.js | [Watson Speech JavaScript SDK Examples](https://github.com/watson-developer-cloud/speech-javascript-sdk/blob/master/dist/watson-speech.js) |
| /routes/index.js |  オリジナル |
| /routes/stt.js | [Text to Speechデモ](https://github.com/nfriedly/tts-timing/blob/master/server/stt.js) |
| /routes/tts.js | [Text to Speechデモ](https://github.com/nfriedly/tts-timing/blob/master/server/tts.js) |
| /utils/context.js | オリジナル |
| /views/index.ejs | オリジナル |


## ランタイム環境

- ランタイム
    1. Node.js
        - 256 MB
- 使用サービス
    1. Conversation ([カタログ](https://console.ng.bluemix.net/catalog/services/conversation/?taxonomyNavigation=apps))
    1. Speech to Text ([カタログ](https://console.ng.bluemix.net/catalog/services/speech-to-text/))
    1. Text to Speech ([カタログ](https://console.ng.bluemix.net/catalog/services/text-to-speech/))
- ユーザー定義環境変数
    1. CONVERSATION_WORKSPACE_ID
        - Conversationツールで『Workspace ID』をコピー&ペーストする

各自でアプリケーションをpushする場合は、上記ランタイム環境を構築した後、そのアプリケーション名でpushしてください。


## 参考資料  
* [こみねのメモ >‎ IBM Watson services on Bluemix >‎ speech-javascript-sdk を試す](https://www.ibm.com/developerworks/community/wikis/home?lang=ja#!/wiki/%E3%81%93%E3%81%BF%E3%81%AD%E3%81%AE%E6%8A%80%E8%A1%93%E3%83%A1%E3%83%A2/page/speech-avascript-sdk%20%E3%82%92%E8%A9%A6%E3%81%99)
* [Watson Speech JavaScript SDK Examples](https://github.com/watson-developer-cloud/speech-javascript-sdk/tree/master/examples)