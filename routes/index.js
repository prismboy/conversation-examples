/**
 * アクション登録
 *
 * @module routes/index
 * @author Y.Akamatsu
 */

// 環境設定を実行する。
var context = require('../utils/context');

// 画面を表示する。
exports.index = function (req, res) {
    res.render('index', {'response': context.initResponse.response, 'context': JSON.stringify(context.initResponse.context)});
};

// STT トークンを返す。
exports.sttToken = function (req, res) {
    context.sttAuth.getToken(function (err, token) {
        if (err) {
            console.log('Error retrieving token: ', err);
            res.status(500).send('Error retrieving token');
        } else {
            res.send(token);
        }
    });
};

// TTS トークンを返す。
exports.ttsToken = function (req, res) {
    context.ttsAuth.getToken(function (err, token) {
        if (err) {
            console.log('Error retrieving token: ', err);
            res.status(500).send('Error retrieving token');
        } else {
            res.send(token);
        }
    });
};

// Conversationサービスと会話する。
exports.chat = function (req, res) {
    context.conversation.message({
        workspace_id: context.workspaceId,
        input: { 'text': req.body.input_text },
        context: req.body.context
    }, function(err, response) {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.send({
                'output_text': response.output.text,
                'context': response.context
            });
        }
    });
};
