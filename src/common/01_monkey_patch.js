
const api = {
    add: function add(a, b) {
        console.log(`calling ${a} + ${b}`)
        return a + b;
    }
}

api.add(1, 2);

// now we want to add some additional functionality to add-function
const originalAdd = api.add;
api.add = function () {
    console.log('api.add is called');
    return originalAdd.apply(this, arguments);
}

api.add(1, 2);
