var chai = require('chai');
var expect = chai.expect;
var Readable = require('stream').Readable;
var checksums = require('../src/checksum.js');
const checksum = checksums.checksum
const checksumByDivide = checksums.checksumByDivide

describe('checksum', ()=> {
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
describe('checksumByDivide', ()=> {
  it ('compute on one line separed by tabs', () => {
    expect(checksumByDivide(['5 9 2 8',''])).to.equal(4);
  });
  it ('adds many lines', () => {
      expect(checksumByDivide(['5 9 2 8', '9 4 7 3', '3 8 6 5', ''])).to.equal(9);
  });
});
