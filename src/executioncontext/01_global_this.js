// example that global context differs from local one (inside the function)

const globalThis = this;

function testFunc() {
    console.log('this in testFunc is:', this === globalThis);
}
testFunc();
