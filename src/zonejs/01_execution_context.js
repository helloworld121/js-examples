require('zone.js/dist/zone-node');

const zone = Zone.current.fork({});

zone.run(function() {
    // function is in the zone just like this, we have a zoneThis === zone
    //console.log(this);
    //expect(zoneThis).toBe(zone);
    console.log(Zone.current === zone);

    setTimeout (function () {
        // the callback of async operation will also have a zoneThis === zone
        // which is the zoneContext when this async operation is scheduled
        //console.log(this)
        //expect(zoneThis).toBe(zone);
        console.log(Zone.current === zone);
    });

    Promise.resolve(1).then(function () {
        // all async operations will be in the same zone when they are scheduled
        //console.log(this);
        //expect(zoneThis).toBe(zone);
        console.log(Zone.current === zone);
    });
});
