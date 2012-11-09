function daterangeformat(ms, smallestUnit, decimals) {
  var units = [
    ['ms', 1],
    ['s', 1000],
    ['m', 1000 * 60],
    ['h', 1000 * 60 * 60],
    ['d', 1000 * 60 * 60 * 24],
    ['wk', 1000 * 60 * 60 * 24 * 7]
  ];

  units = units.reduce(function (acc, curr, i) {
    if (acc.length > 0 || curr[0] === smallestUnit) {
      acc.push(curr);
    }
    return acc;
  }, []);

  var n = ms
    , t = n
    , i = 0
    , num;
  var parts = [];
  var u, unit, f;

  var round = function (n) {
    return parseFloat(n.toFixed(decimals));
  }

  if (ms < 1) {
    return round(ms) + 'ms';
  }
  i = units.length - 1;
  while (i >= 0) {
    if (i > 0 && ms / units[i-1][1] < 1) {
      i--;
      continue; 
    }

    u = units[i];
    unit = u[0], f = u[1];
    num = t / f;
    if (-1 !== i) {
      num = round(num);
    }
    if (i> 0 && num < 1) {
      i--;
      continue;
    }
    parts.push(num.toString() + unit);
    t = t - num * f;
    if (t<=0) break;
    i--;
  }

  return parts.join(' ');
}

module.exports = daterangeformat;