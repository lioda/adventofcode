var chai = require('chai');
var expect = chai.expect;
var Readable = require('stream').Readable;
var checksum = require('../src/checksum.js');

describe('checksum', ()=> {
  var s = new Readable();
  // s.push('5 1 9 5\n');
  // s.push('');
  // s.push(null);
  it ('compute on one line separed by spaces', () => {
    expect(checksum(['5 1 9 5',''])).to.equal(8);
  });
  it ('compute on one line separed by tabs', () => {
      expect(checksum(['5\t1\t9\t5',''])).to.equal(8);
  });
  it ('adds many lines', () => {
      expect(checksum(['5 1 9 5', '7  5 3', '2  4 6 8', ''])).to.equal(18);
  });
});
