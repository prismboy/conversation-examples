require('whatwg-fetch'); // window.fetch() pollyfill
var toConsole = require('./server-process.js');
var toHtml = require('./client-process.js');


document.querySelector('#listen').onclick =  function() {
    var text = document.querySelector('#response_text').value;
    toConsole(text);
};

/**
 * document.querySelector('#client').onclick =  function() {
 *     var text = document.querySelector('#text').value;
 *     toHtml(text, '#output');
 * };
 */
