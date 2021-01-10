// something is strange:

// In this example, the this in the function testFunc will be the same with globalThis,
//because we are running the testFunc without assigning any context object by using apply/call.
//And the scope in testFunc will be able to access both a and b.

const globalThis = this;
let a = 0;

function testFunc() {
    let b = 0;
    console.log('this in testFunc is:', this === globalThis);
    console.log(this);
}
testFunc();
