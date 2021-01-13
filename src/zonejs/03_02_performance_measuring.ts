import 'zone.js';
import { performance } from 'perf_hooks';


const timingZone = Zone.current.fork({
    name: 'timingZone',
    onInvoke: function (
        parentZoneDelegate, currentZone,
        targetZone, callback, applyThis,
        applyArgs, source
    ) {
        var start = performance.now();
        parentZoneDelegate.invoke(targetZone, callback, applyThis, applyArgs, source);
        var end = performance.now();
        console.log(
            'Zone:', targetZone.name,
            'Intercepting zone:', currentZone.name,
            'Duration:', end - start
        );
    }
});

timingZone.run(function myApp() {
    console.log('Zone:', Zone.current.name, 'Hello World!')
});
