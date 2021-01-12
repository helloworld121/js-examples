require('zone.js/dist/zone-node');

// wrap will build something like a shell

function testFunc() {
    console.log('this in testFunc is:', this);
}

const bindTarget = {};
const boundFunc = testFunc.bind(bindTarget);
const newObj = {name: 'newObj'};
boundFunc.apply(newObj);

function testZoneFunc() {
    console.log('zoneThis in testFunc is:', Zone.current.name);
}

const zoneA = Zone.current.fork({name: 'zoneA'})
const wrappedTestZoneFunc = zoneA.wrap(testZoneFunc);

const zoneB = zoneA.fork({name: 'zoneB'})
zoneB.run(wrappedTestZoneFunc);
