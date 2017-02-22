'use strict';

module.exports = function (text, target) {
    var audio = new Audio();

    audio.src = '/api/text-to-speech/synthesize?text=' + encodeURIComponent(text);

    // let the browser buffer the audio before playing
    audio.play();

    audio.addEventListener("ended", function() {
        fetch('/api/text-to-speech/word-timing').then(function(response) {
            return response.json();
        }).then(function(wordTiming) {
            // will be a 2d array in the form: [ [ 'word', startTime, endTime ], ... ]
            console.log(wordTiming);
        }).catch(function(err) {
            console.log(err);
        })
    });
};
