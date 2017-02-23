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

/**
 * Conversationサービスと会話する。
 */
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

