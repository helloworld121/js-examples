import 'zone.js';

const rootZone = Zone.current;

const trackZone = rootZone.fork({
    name: 'z',
    // onHasTask hook only to track the empty/non-empty state of the entire tasks queue.
    // it can not track individual tasks
    onHasTask(delegate, currentZone, targetZone, hasTaskState) {
        // not necessary:
        // We are only interested in event which originate from our zone
        // Since parent zones can intercept child zones events, zone.js supplies
        // currentZone and targetZone as parameters to difference between a zone that has
        // changes in the tasks queue and the zone that intercepts the event
        if (currentZone === targetZone) { // make sure intercepting the event for the current zone
            console.log(hasTaskState.change);          // "macroTask"
            console.log(hasTaskState.macroTask);       // true
            console.log(JSON.stringify(hasTaskState));
        }
    }
});

function a1() { console.log('a1') }
function a2() { console.log('a2') }

function b() {
    // synchronously triggers `onHasTask` event with
    // change === "macroTask" since `setTimeout` is a macrotask
    setTimeout(a1, 2000);
    setTimeout(a2, 2000);
}

trackZone.run(b);
