const readline = require('readline');

function checksum(array) {
  return array.filter(e => e).map(s =>
      s.split(/[\s,]+/)
      .map(e => parseInt(e))
      .reduce((res, e) => {
        if (Number.isNaN(e)) return res;
        if (res[1] < e) res[1] = e;
        if (res[0] > e) res[0] = e;
        return res;
      }, [Number.MAX_VALUE, Number.MIN_VALUE])
      .reduce((min, max) => max - min)
    ).reduce((a,b) => a + b);
}
function checksumByDivide(array) {
  return array.filter(e => e).map(s =>  {
    const splitted = s.split(/[\s,]+/);
    const div = [];
    splitted.find((e) =>{
      const divisor = splitted.find(divisor => e != divisor && e % divisor == 0);
      if (divisor) {
        div.push(e, divisor);
        return true;
      }
      return false;
    });
    return div[0] / div[1];
  })
  .reduce((a,b) => a + b);
}

module.exports = {checksum: checksum, checksumByDivide: checksumByDivide}
