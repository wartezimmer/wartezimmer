/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createExtension(['pg_trgm'], {
        ifNotExists: true
    })
};

exports.down = pgm => {};
