/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.alterColumn('divi_icu_register', 'name', {
    type: 'varchar(255)',
    notNull: true
  });

  pgm.alterColumn('divi_icu_register', 'address_station', {
    type: 'varchar(255)'
  });
};

exports.down = pgm => {};
