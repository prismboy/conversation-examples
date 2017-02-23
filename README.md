# Watson Conversation デモ

## Node.jsで会話アプリを構築するためのデモソース。

音声の入出力を簡素化するための[speech-javascript-sdk](https://github.com/watson-developer-cloud/speech-javascript-sdk/releases) を使用した、Watson Speech to Text (STT) および、Text to Speech (TTS)のストリーミングI/Oにて、音声による会話を可能とします。  

## アプリの使用手順

1. 以下のURLにアクセスします。
    - [https://710-o900156-conversation-examples.au-syd.mybluemix.net](https://710-o900156-conversation-examples.au-syd.mybluemix.net)
1. テキスト入力して、Enterキーもしくは『送信』ボタンをクリック
    - Watsonからの応答が表示されるとともに、回答を読み上げます。
    - 緑色の再生ボダン(<font color="#00FF00">▶</font>)をクリックすると、直前に読み上げたテキストを再生します。
1. テキスト入力の代わりに、赤丸の録音ボタン(<font color="red">●</font>)をクリックしてからマイクに向けて喋り、四角の停止ボタン(■)をクリックすることにより、自動的に内容を送信します。
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
	    │    └ speaking.js
	    │
	    ├ public/
	    │    ├ conversation-sample-workspace.json
	    │    ├ favicon.ico
	    │    ├ help.html
	    │    ├ mybootstrap.css
	    │    └ watson-speech.js
	    │
	    ├ routes/
	    │    └ index.js
	    │
	    ├ utils/
	    │    ├ context.js
	    │    ├ stt.js
	    │    └ tts.js
	    │
	    └ views/
	            └ index.ejs

## ランタイム環境

- ランタイム
    1. Node.js
    1. 256 MB
- 使用サービス
    1. Conversation
    1. Speech to Text
    1. Text to Speech
- ユーザー定義環境変数
    1. CONVERSATION_WORKSPACE_ID
        - Conversationツールで『Workspace ID』をコピー&ペーストする

各自でアプリケーションをpushする場合は、上記ランタイム環境を構築した後、そのアプリケーション名でpushしてください。


## 参考資料  
* [こみねのメモ >‎ IBM Watson services on Bluemix >‎ speech-javascript-sdk を試す](https://www.ibm.com/developerworks/community/wikis/home?lang=ja#!/wiki/%E3%81%93%E3%81%BF%E3%81%AD%E3%81%AE%E6%8A%80%E8%A1%93%E3%83%A1%E3%83%A2/page/speech-avascript-sdk%20%E3%82%92%E8%A9%A6%E3%81%99)
* [Watson Speech JavaScript SDK Examples](https://github.com/watson-developer-cloud/speech-javascript-sdk/tree/master/examples)