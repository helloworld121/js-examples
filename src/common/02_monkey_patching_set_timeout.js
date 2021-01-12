const orginalSetTimeout = global.setTimeout;
global.setTimeout = function(...args) {
    console.log('Timeout was called');
    return orginalSetTimeout(...args);
}

setTimeout(() => {
    console.log('hello!');
}, 0);
