// execution context => this
// defines the scope => variables, function, that the target function can access
// when code is executed in a function there will be a new execution context


const testObj = {
    testFunc: function() {
        console.log('this in testFunc:', this);
    }
}

// 1. call testFunc with testObj
// call testObj.testFunc, this will be testObj.
testObj.testFunc();

const newTestFunc = testObj.testFunc;
// 2. call newTestFunc who is referencing from testObj.testFunc
// create a reference newTestFunc, this will be globalThis.
newTestFunc();

const newObj = {};
// 3. call newTestFunc with apply
// call with apply, this will be newObj.
newTestFunc.apply(newObj);

const bindObj = {};
const boundFunc = testObj.testFunc.bind(bindObj);
// 4. call bounded testFunc
// call bounded version, this will always be bindObj.
boundFunc();
