const checksum = require('./checksum.js');
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
  const result = checksum(array);
  console.log(`result => ${result}`);
});

console.log('end');
