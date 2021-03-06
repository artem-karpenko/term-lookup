var lookup = require('./term-lookup').lookup;
var textToHexes = require('./term-lookup').textToHexes;
var hexTextToChars = require('./term-lookup').hexTextToChars;
var fs = require('fs');

var term = process.argv[2];
var filename = process.argv[3];

if (!term) {
    console.error('Term is missing');
    process.exit(1);
}

if (!filename) {
    console.error('Filename is missing');
    process.exit(1);
}

var hexTerm = textToHexes(term);
console.log('Looking for \'' + term + '\' in ' + filename)

lookup(filename, hexTerm).then((result) => {
    console.log('Found term at byte offset ' + result);
    fs.writeFileSync(term + '.pos', new String(result));
}).catch((reason) => {
    console.log(reason);
});


// artem => 45733590430