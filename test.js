const fs = require('fs');

function find(ip, data) {
    if(data.length < 8) {
        return data.find(geo => geo.from <= ip && geo.to >= ip);
    } else {
        let index = Math.trunc(data.length / 2);
        if(data[index].from > ip) {
            return find(ip, data.slice(0, index));
        } else {
            return find(ip, data.slice(index));
        }
    }
}

function lookup(ip, data) {
    let start = Date.now();
    ip = ip.split('.').reverse().reduce((accumulator, byte, index) => accumulator + (parseInt(byte) << (index * 8) >>> 0), 0);
    let result = find(ip, data);
    console.log('Response in', Date.now() - start, 'ms', ' => ', result);
}

fs.readFile('./IP2LOCATION-LITE-DB1.JSON', 'utf-8', function(error, content) {
    const geoDB = JSON.parse(content);
    console.log('Testing Geo IP Database with', geoDB.length, 'entries ...');
    lookup('8.8.8.8', geoDB);
    lookup('180.76.76.76', geoDB);
    lookup('109.195.228.206', geoDB);
});

