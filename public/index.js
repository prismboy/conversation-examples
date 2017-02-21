/*
 * STT: クライアントJavaScript
 */
$(function () {

    $(document).ready(function () {

        $('#recognizeId').on('click', function () {
            fetch('/stt-token')
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

                $('#stopId').on('click', function () {
                    stream.stop();
                });

            }).catch(function (error) {
                console.log(error);
            });
        });

    });

});