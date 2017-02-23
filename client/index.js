require('whatwg-fetch'); // window.fetch() pollyfill
var toConsole = require('./play-process.js');


/**
 * テキスト読み上げ
 */
document.querySelector('#play').onclick =  function() {
    var text = document.querySelector('#response_text').value;
    toConsole(text);
};

/**
 * 音声認識
 */
document.querySelector('#record').onclick = function () {
    fetch('/api/speech-to-text/token')
        .then(function (response) {
            return response.text();
        }).then(function (token) {

        var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
            token: token,
            model: 'ja-JP_BroadbandModel',
            outputElement: '#QuestionText' // CSS selector or DOM Element
        });

        stream.on('error', function (err) {
            console.log(err);
        });

        document.querySelector('#stop').onclick = function () {
            stream.stop();
            document.querySelector('#ask').click();
        };

    }).catch(function (error) {
        console.log(error);
    });
};
