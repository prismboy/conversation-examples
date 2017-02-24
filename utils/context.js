/**
 * 環境設定
 *
 * @module utils/context
 * @author Y.Akamatsu
 */

// 環境変数を取得する。
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

// VCAP_SERVICES変数取得サービス
var vcapServices = require('vcap_services');

// 環境変数
exports.appEnv = appEnv;

/** Path */
exports.path = require('path');

// Watson Developer Cloudパッケージ
var watson = require('watson-developer-cloud');

// Watson Speech to Text Credentials
var sttCreds = vcapServices.getCredentials('speech_to_text');

// Watson Text to Speech Credentials
var ttsCreds = vcapServices.getCredentials('text_to_speech');

// Watson Conversation Credentials
var convCreds = vcapServices.getCredentials('conversation');
convCreds.version = 'v1';
convCreds.version_date = '2017-02-03';

// STT 認証サービス
exports.sttAuth = new watson.AuthorizationV1(sttCreds);

// Conversation Workspace ID
exports.workspaceId = process.env.CONVERSATION_WORKSPACE_ID;

// Watson Conversation サービス
var conversation = watson.conversation(convCreds);
exports.conversation = conversation;

// Conversation 初期表示メッセージ取得
conversation.message({
    workspace_id: process.env.CONVERSATION_WORKSPACE_ID,
    input: { 'text': ''},
    context: {}
}, function(err, response) {
    if (err) {
        console.log('Error: ', err);
    } else {
        exports.initResponse = {
            'response': response.output.text,
            'context': response.context
        };
    }
});
