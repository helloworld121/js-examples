import 'zone.js';

const rootZone = Zone.current;

const zoneA = rootZone.fork({name: 'A'});
const zoneAC = zoneA.fork({name: 'AC'});
const zoneB = rootZone.fork({name: 'B'});

function c() {
    console.log('funcation c, running in zone:', Zone.current.name);  // AC
}
function b() {
    console.log('funcation b, running in zone:', Zone.current.name);  // B
    zoneAC.run(c);
}
function a() {
    console.log('funcation a, running in zone:', Zone.current.name);  // AC
    zoneB.run(b);
}
zoneAC.run(a);

