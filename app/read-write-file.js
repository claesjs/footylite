'use strict';

var fs = require('fs');

exports.readTeamOrders = function () {
    return {
        "home": JSON.parse(fs.readFileSync('home.json', 'utf8')),
        "away": JSON.parse(fs.readFileSync('away.json', 'utf8'))
    };
}

exports.writeResult = function (data) {
    fs.appendFileSync('result.txt', data);
}
