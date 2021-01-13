require('zone.js/dist/zone-node');

const originalSetTimeout = global.setTimeout;
const originalClearTimeout = global.clearTimeout;

// monkey-patch setTimeout
global.setTimeout = function (callback, delay) {
    let id;
    const task = Zone.current.scheduleMacroTask(
        'setTimeout',
        function () {
            callback();
            console.log('task end');
        },
        null,
        function (task) {
            console.log('task start');
            id = originalSetTimeout(task.invoke, delay);
        },
        function () {
            return originalClearTimeout(id);
        }
    );
    return task;
};

// monkey-patch clearTimeout
global.clearTimeout = function (task) {
    console.log('calling clearTimeout');
    Zone.current.cancelTask(task);
};

const task = setTimeout(function () {
    console.log(123);
}, 1000);

// if we want to clearTimeout:
clearTimeout(task);

