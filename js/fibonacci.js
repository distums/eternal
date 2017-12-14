//without generator
function fib() {
  let x = 1,
    y = 1;
  return function() {
    let result = x;
    x = y;
    y += result;
    return result;
  };
}

//with generator
function* fib() {
  let x = 1,
    y = 1;
  yield x;
  yield y;
  while (true) {
    [x, y] = [y, y + x];
    yield y;
  }
}
