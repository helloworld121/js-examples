require('zone.js/dist/zone-node');

const zoneA = Zone.current.fork({
    name: 'zone',
    properties: {key: 'sharedData'}
});

zoneA.run(function() {
    //function is in the zone we can use data from zoneA
    console.log(Zone.current.get('key') === 'sharedData');

    setTimeout(() => {
        // the callback of async operation we can use data from zoneA
        console.log(Zone.current.get('key') === 'sharedData');
    });
});
