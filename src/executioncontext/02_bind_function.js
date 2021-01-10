// execution context => this
// defines the scope => variables, function, that the target function can access
// when code is executed in a function there will be a new execution context


const testObj = {
    testFunc: function() {
        console.log('this in testFunc:', this);
    }
}

testObj.testFunc();

const newTestFunc = testObj.testFunc;
newTestFunc();

const newObj = {};
newTestFunc.apply(newObj);

const bindObj = {};
const boundFunc = testObj.testFunc.bind(bindObj);
boundFunc();
