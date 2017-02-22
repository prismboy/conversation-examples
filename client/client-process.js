'use strict';
var synthesize = require('watson-speech/text-to-speech/synthesize');
var recognizeElement = require('watson-speech/speech-to-text/recognize-element');

module.exports = function (text, target) {

    // note: you could preload the tokens for slightly reduced latency. Just be aware that they expire after an hour.
    Promise.all([
        // fetch a STT token
        fetch('/api/speech-to-text/token').then(function(response) {
            return response.text();
        }),
        // in parallel, fetch a TTS token
        fetch('/api/text-to-speech/token').then(function(response) {
            return response.text();
        })
    ]).then(function (tokens) {

        var audioElement = synthesize({
            text: text,
            token: tokens[1],
            autoPlay: false // recognizeElement will automatically play it when ready
        });

        return recognizeElement({
            token: tokens[0],
            element: audioElement,
            outputElement: target,
            timestamps: true,
            objectMode: true
        }).promise()
    }).then(function(results) {
        // results[1] will be an array of objects approximately representing one sentence each
        // each result object will have a sub-array of word timing
        // this extracts the sub-arrays and joins them together into a single big array
        return results.reduce(function(prev, result) {
            return result.final ? prev.concat(result.alternatives[0].timestamps) : prev
        }, []);
    }).then(function(wordTiming) {
        // will be a 2d array in the form: [ [ 'word', startTime, endTime ], ... ]
        console.log(wordTiming);
    }).catch(function(err) {
        console.log(err);
    });
};
