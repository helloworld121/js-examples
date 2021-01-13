import 'zone.js';

const users = [
    {firstName: 'Ivan', lastName: 'Ivanov'},
    {firstName: 'Petar', lastName: 'Petrov'},
    {firstName: 'Gustav', lastName: 'Hansen'},
];

// zone specification to fork a zone
const zoneSpecFactory = (user: any): ZoneSpec => ({
    name: 'user-spec',
    properties: {user}
});

const task = () => {
    setTimeout(() => {
        const user = Zone.current.get('user');
        console.log('running setTimeout-callback and getting user from Zone:', user);
    }, 2000);
};

// fork a zone for each user using defined specification
users.forEach(user => Zone.current.fork(zoneSpecFactory(user)).run(task));
