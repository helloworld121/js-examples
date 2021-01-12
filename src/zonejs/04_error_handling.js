require('zone.js/dist/zone-node');

const zone = Zone.current.fork({
    name: 'error-example',
    onHandleError: (delegate, curr, target, error) => {
        console.log('onHandleError:', error);

        // delegate error to the top:
        // return delegate.handleError(target, error);
    }
}).runGuarded( () =>  {
    setTimeout(() => {
        throw new Error('timeout error');
    });

    setTimeout(() => {
        throw new Error('another timeout error');
    });
});
