var lookup = require('./term-lookup').lookup;
var textToHexes = require('./term-lookup').textToHexes;
var hexTextToChars = require('./term-lookup').hexTextToChars;

//console.log(textToHexes('test'));
console.log(hexTextToChars('99697261e9').join());

//lookup('/home/artem/pi/y-cruncher v0.6.9.9464-static/pi-hex-1B.txt', 'ira').then((result) => {
//    console.log(result);
//}).catch((reason) => {
//    console.log(reason);
//});
