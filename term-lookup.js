var fs = require('fs');

function Lookup(term) {
    var termPos = 0;
    var found = false;
    var foundStartPos = -1;

    this.nextToken = (token, tokenPos) => {
        //console.log('Look at ' + token + ' at ' + tokenPos);
        if (token == term.charAt(termPos)) {
            //console.log('Found ' + token + ' at pos ' + tokenPos);
            termPos++;
        } else {
            termPos = 0;
        }

        if (termPos == term.length) {
            //console.log('Found!');
            found = true;
            foundStartPos = tokenPos - term.length;
        }
    };

    this.isFound = () => found;
    this.getFoundPos = () => foundStartPos;
}

/**
 * Assuming that hex has 2 digits
 */
var charFromHex = (hex) => String.fromCharCode(parseInt(hex, 16));

/**
 * Convert string from hexes into array of chars
 * @param hexText
 */
var hexTextToChars = (hexText) => {
    var result = {
        chars : [],
        reminder : undefined
    };
    for (var i = 0; i < hexText.length; i+=2) {
        var charHex = hexText.substr(i, 2);
        if (charHex.length == 2) {
            result.chars.push(charFromHex(charHex));
        } else {
            result.reminder = charHex;
        }
    }
    return result;
};

/**
 * Lookup a term in a file
 */
module.exports.lookup = (filename, term) => {
    return new Promise((resolve, reject) => {
        var filesize = fs.statSync(filename).size;

        var rs = fs.createReadStream(filename, {encoding: 'ascii'});
        var lookup = new Lookup(term);
        //var reminder = undefined;
        var dataPos = 0, percentProcessed = 0;
        rs.on('data', (data) => {
            data.split('').some((char) => {
                lookup.nextToken(char, dataPos);
                if (lookup.isFound()) {
                    rs.close();
                    resolve(lookup.getFoundPos());
                    return true;
                }
                dataPos++;
            });

            if (!lookup.isFound()) {
                var newPercentProcessed = +(dataPos * 100 / filesize).toFixed(0);
                if (newPercentProcessed != percentProcessed) {
                    percentProcessed = newPercentProcessed;
                    console.log("Processed " + percentProcessed + "%");
                }
            }
        });

        rs.on('end', () => {
            console.log('EOF');
            rs.close();
            reject('Not found');
        });
    });
};

module.exports.textToHexes = (text) =>{
    var result = '';

    for (var i = 0; i < text.length; i++) {
        result += text.charCodeAt(i).toString(16);
    }

    return result;
};

module.exports.hexTextToChars = hexTextToChars;