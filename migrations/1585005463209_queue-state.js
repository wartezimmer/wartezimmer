/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('queues', {
    state: { 
      type: 'integer',
    },
  })
};

exports.down = pgm => {};
