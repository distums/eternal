// from：http://www.2ality.com/2016/10/asynchronous-iteration.html
const BUSY = Symbol('BUSY');
const COMPLETED = Symbol('COMPLETED');
function asyncGenerator() {
  const settlers = [];
  let step = 0;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return new Promise((resolve, reject) => {
        settlers.push({ resolve, reject });
        this._run();
      });
    },
    _run() {
      setTimeout(() => {
        if (step === BUSY || settlers.length === 0) {
          return;
        }
        const currentSettler = settlers.shift();
        try {
          switch (step) {
            case 0:
              step = BUSY;
              console.log('Start');
              doSomethingAsync()
                .then(result => {
                  currentSettler.resolve({
                    value: 'Result: ' + result,
                    done: false,
                  });
                  // We are not busy, anymore
                  step = 1;
                  this._run();
                })
                .catch(e => currentSettler.reject(e));
              break;
            case 1:
              console.log('Done');
              currentSettler.resolve({
                value: undefined,
                done: true,
              });
              step = COMPLETED;
              this._run();
              break;
            case COMPLETED:
              currentSettler.resolve({
                value: undefined,
                done: true,
              });
              this._run();
              break;
          }
        } catch (e) {
          currentSettler.reject(e);
        }
      }, 0);
    },
  };
}
