require('zone.js/dist/zone-node');

function a() { console.log('a') }
function b() { console.log('b') }
function c() { console.log('c') }
function d() { console.log('d') }


const zoneA = Zone.current.fork({
    name: 'zone',
    onInvokeTask: (delegate, curr, target, task, applyThis, applyArgs) => {
        const randomId = Math.random().toString(36).substring(7);
        const label = 'onInvokeTask-' + task.source + '-' + randomId;

        const t0 = console.time(label);

        // console.log('before invoke task', task.source);
        delegate.invokeTask(target, task, applyThis, applyArgs);
        // console.log('after invoke task', task.source);

        console.timeEnd(label);
    },
});

zoneA.run(() => {
    console.time('.run');
    a();
    setTimeout(c, 100);
    setTimeout(d, 100);
    b();
    console.timeEnd('.run');
});



