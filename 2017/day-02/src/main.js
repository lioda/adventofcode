const checksums = require('./checksum.js');
var fs  = require("fs");

console.log('start');
fs.readFile('input.txt', function(err, f){
  if (err) {
    console.log(err);
    return;
  }
  var array = f.toString().split('\n');
  console.log(array);
  // use the array
  console.log(`result => ${checksums.checksum(array)}`);
  console.log(`result => ${checksums.checksumByDivide(array)}`);
});

console.log('end');
