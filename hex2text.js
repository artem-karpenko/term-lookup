var hexTextToChars = require('./term-lookup').hexTextToChars;

var term = process.argv[2];

if (!term) {
    console.error('Term is missing');
    process.exit(1);
}

console.log(hexTextToChars(term).chars.join(''));
