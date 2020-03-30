/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.alterColumn('facilities', 'x', {
      type: 'float8',
    })
    pgm.alterColumn('facilities', 'y', {
      type: 'float8',
    })

    pgm.createExtension(['cube', 'earthdistance'], {
      ifNotExists: true
    })

    pgm.sql('CREATE INDEX facilities_cube_data_index ON facilities USING gist (ll_to_earth(y, x));')
};

exports.down = pgm => {};
