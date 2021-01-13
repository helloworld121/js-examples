require('zone.js/dist/zone-node');

const rootZone = Zone.current;

const myZone = rootZone.fork({
    name: 'myZone',
    properties: {user: null, debug: false}
});

myZone.run(() => {
    const myZoneChild = myZone.fork({
        name: 'myZoneChild',
        properties: {user: {name: 'hello.world'}}
    });

    myZoneChild.run(() => {
        // > 'myZoneChild' get the name of the current zone
        console.log(Zone.current.name);

        // get the property called user
        console.log(Zone.current.get('user'));

        console.log(Zone.current.get('debug'));

        console.log(Zone.current.parent.name);
    });
});
