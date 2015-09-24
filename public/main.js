var format = require('util').format;
var $ = require('jquery');

var name = 'KRDS';

console.log(format('hello %s!', name).toLowerCase());

$('#title').text(document.title);
$('#message').text(format('Hello %s!', name));
