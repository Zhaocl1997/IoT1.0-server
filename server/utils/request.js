const request = require('request');
get_random = function (list) {
    return list[Math.floor((Math.random() * list.length))];
}

//test data
var deviceinfo =
{
    "name": "device1",
    "macAddress": "1a:2s:3d:4f:5g:6h"
}

var options = {
    method: 'POST',
    url: 'xxxxxxxx',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGExNTQ5YjIwN2ZlZDI5MThhZjU4NzgiLCJpYXQiOjE1NzA4NTQxODQsImV4cCI6MTU3MDg1Nzc4NH0.SUN3yyHjQEBp3WmdGSXO3iRvKETVyLBDpL_tNLavRug"
    },
    json: "xxxxxx"

};

function callback(error, response, body) {
    if (!error) {
        var info = JSON.parse(JSON.stringify(body));
        console.log(info);
    }
    else {
        console.log('Error happened: ' + error);
    }
}


for (let index = 1000; index < 2000; index++) {
    deviceinfo.name = "device" + index
    deviceinfo.macAddress = "1a:2s:3d:4f:5" + index

    options.url = "http://localhost:9000/api/v1/devices/create"
    options.json = deviceinfo

    request(options, callback);
}