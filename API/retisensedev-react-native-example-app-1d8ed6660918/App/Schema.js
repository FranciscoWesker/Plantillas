var Realm = require('realm');

export let data = new Realm({
  schema: [
    {
      name: 'userData',
      properties: {
        userId: {type: 'int', default: 0},
        name: 'string',
        runTime: 'string',
      },
    },
  ],
});
