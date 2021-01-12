require('zone.js/dist/zone-node');

// https://stackblitz.com/edit/zonejs-counting?file=index.html

const countingZoneSpec = Zone['countingZoneSpec'] = {
    name: 'counterZone',
    // setTimeout
    onScheduleTask: function (delegate, current, target, task) {
        this.data.count += 1;
        delegate.scheduleTask(target, task);
    },

    // fires when...
    // - clearTimeout
    // - setTimeout finishes
    onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
        delegate.invokeTask(target, task, applyThis, applyArgs);
        this.data.count -= 1;
    },

    onHasTask: function (delegate, current, target, hasTask) {
        if (this.data.count === 0 && !this.data.flushed) {
            this.data.flushed = true;
            target.run(this.onFlush);
        }
    },

    counter: function () {
        return this.data.count;
    },

    data: {
        count: 0,
        flushed: false
    },

    onFlush: function () { }
};

const myCountingZone = Zone.current.fork(countingZoneSpec).fork({
    onScheduleTask(parent, current, target, task) {
        parent.scheduleTask(target, task);
        console.log('Scheduled ' + task.source + ' => ' + task.data.handleId);
        console.log(countingZoneSpec.counter());
    },
    onInvokeTask(parent, current, target, task) {
        console.log('Invoking ' + task.source + ' => ' + task.data.handleId);
        parent.invokeTask(target, task);
        console.log(countingZoneSpec.counter());
    },
    onHasTask(parent, current, target, hasTask) {
        if (hasTask.macroTask) {
            console.log("There are outstanding MacroTasks.");
        } else {
            console.log("All MacroTasks have been completed.");
        }
    }
});

myCountingZone.run( () => {
    function recursive(x, t) {
        if (x > 0) {
            setTimeout(() => {
                for (var i = 0; i < 4; i++) {
                    recursive(x - 1, Math.random() * t);
                }
            }, t);
        }
    }


    recursive(2, 800);
});
