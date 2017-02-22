/**
 * @file 会話 アプリ
 * @author Y.Akamatsu
 */

// モジュールを読込む。
var context = require('./utils/context');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var routes = require('./routes');
var expressBrowserify = require('express-browserify');


// アプリケーションを作成する。
var app = express();

// ミドルウェアを設定する。
app.set('views', context.path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + '/public/favicon.ico'));

// app.use('/api/speech-to-text/', require('./utils/stt.js').router);
app.use('/api/text-to-speech/', require('./utils/tts.js').router);

// ルートを設定する。
app.get('/', routes.index);
app.get('/stt-token', routes.sttToken);
app.post('/chat', routes.chat);
app.get('/bundle.js', expressBrowserify(__dirname + '/client/index.js')); /*, {
    watch: process.env.NODE_ENV != 'production'
}));*/

// リクエトを受付ける。
app.listen(context.appEnv.port, '0.0.0.0', function () {
    console.log('server starting on ' + context.appEnv.url);
});
