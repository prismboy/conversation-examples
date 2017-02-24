'use strict';

var express      = require('express'),
  router          = express.Router(),
  vcapServices = require('vcap_services'),
  extend       = require('util')._extend,
  watson       = require('watson-developer-cloud'),
  stt          = require('./stt.js').stt;

// another endpoint for the text to speech service

var ttsConfig = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/text-to-speech/api',
  username: process.env.TTS_USERNAME,
  password: process.env.TTS_PASSWORD
}, vcapServices.getCredentials('text_to_speech'));

var ttsAuthService = watson.authorization(ttsConfig);

var tts = watson.text_to_speech(ttsConfig);

router.get('/token', function(req, res) {
  ttsAuthService.getToken({url: ttsConfig.url}, function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token')
    }
    res.send(token);
  });
});

// obviously you would need something more complex than a single global variable for production use
// but this works for a light weight proof-of-concept
var getTimings = Promise.resolve([]);

router.get('/synthesize', function(req, res) {

  // create an audio stream
  var audioStream = tts.synthesize({
    text: req.query.text,
    voice: 'ja-JP_EmiVoice',
    accept: req.headers.accept // let the client's browser choose what format the audio is sent in
  });

  // send the audio stream to the speech to text service and extract word timings from the results
  getTimings = new Promise(function(resolve, reject) {
    stt.recognize({
      audio: audioStream,
      timestamps: true,
      content_type: 'audio/ogg; codec=opus' // todo: set this pragmatically based on audio stream's content type
    }, function(err, data) {
      console.log(err, data);
      if (err) {
        return reject(err);
      }
      var wordTimings = data.results.reduce(function(prev, result) {
        return prev.concat(result.alternatives[0].timestamps)
      }, []);
      resolve(wordTimings);
    });
  });




  // also send the audio stream to the client for playback
  audioStream.pipe(res);

  // you could additionally pipe the audio to a file if you wanted to save it for later
  // audioStream.pipe(fs.createWriteStream('./my-audio-fille.{wav|ogg|flac}'));
});

router.get('/word-timing', function(req, res) {
  getTimings.then(function(wordTimings) {
    res.json(wordTimings);
  }).catch(function(err) {
    res.status(500).send(err.message);
  });
});

exports.router = router;
