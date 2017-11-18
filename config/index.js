var nconf = require('nconf');
var path = require('path');

nconf.argv()//из  коммандной строки
    .env()// переменных окружения
    .file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;