var fs = require('fs');

var file = process.argv[2];
var offset = process.argv[3];
var length = process.argv[4] || 50;

fs.open(file, 'r', (err, fd) => {
    //var buffer;
    fs.read(fd, null, 0, length, offset, (err, bytesRead, buffer) => {
        console.log(buffer.toString());
        fs.close(fd);
    });
});