/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.alterColumn('facilities', 'externalId', {
    allowNull: true
  })
};

exports.down = pgm => {};
