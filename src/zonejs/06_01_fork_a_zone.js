require('zone.js/dist/zone-node');

// if we fork a zone we gonna propagate a new zone
// the relationship is not an inheritance it is like a composition
// the zone propagation ca compose zone behaviors

const rootZone = Zone.current;

const stackTraceZone = rootZone.fork({
    name: 'stackTraceZone',
    onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
        console.log('calling: stackTraceZone.onInvokeTask');
        delegate.invokeTask(target, task, applyThis, applyArgs);
    }
})

const logZone = stackTraceZone.fork({
    name: 'logZone',
    onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
        console.log('calling: logZone.onInvokeTask');
        delegate.invokeTask(target, task, applyThis, applyArgs);
    }
});

logZone.run(() => {
    setTimeout(() => {
        console.log('hello world');
    }, 1000);
});
