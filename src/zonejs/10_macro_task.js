require('zone.js/dist/zone-node');

const originalSetTimeout = global.setTimeout;
global.setTimeout = function (callback, delay) {
    const task = Zone.current.scheduleMacroTask(
        'setTimeout',
        function () {
            callback();
            console.log('task end');
        },
        null,
        task => {
            console.log('task start');
            originalSetTimeout(task.invoke, delay);
        }
    );
    return task;
};


setTimeout(() => {console.log('Hello world')}, 1000);
