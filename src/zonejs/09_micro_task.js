require('zone.js/dist/zone-node');

// we want a function to run as soon as possible


function callbackFn() {
    console.log('my callback function');
}

// this way is cheaper and from performance perspective more efficient,
// because it will just put the callback-function in the queue and won't do any Promise-stuff
Zone.current.scheduleMicroTask('myMicroTask', callbackFn);

// looks like
// Promise.resolve().then(() => {
//     callbackFn();
// });
