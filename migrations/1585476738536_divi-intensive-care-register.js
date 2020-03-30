/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('divi_icu_register', {
    id: 'id',
    run_time: { // Timestamp of the crawl run (to have hostorical data + latest)
      type: 'timestamp', 
      notNull: true 
    },
    name: { 
      type: 'varchar(128)', 
      notNull: true 
    },
    icu_low_status: { 
      type: 'integer',
    },
    icu_high_status: { 
      type: 'integer',
    },
    ecmo_status: { 
      type: 'integer',
    },
    address_station: { 
      type: 'varchar(128)',
    },
    address_state: { 
      type: 'varchar(8)',
    },
    address_street: { 
      type: 'varchar(128)',
    },
    address_housenumber: { 
      type: 'varchar(16)',
    },
    address_postcode: { 
      type: 'varchar(32)',
    },
    address_city: { 
      type: 'varchar(64)',
    },
    address_state: { 
      type: 'varchar(64)',
    },
    contact_station: { 
      type: 'varchar(128)',
    },
    contact_website: { 
      type: 'varchar(255)',
    },
    last_update_raw: { 
      type: 'varchar(24)',
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createIndex('divi_icu_register', ['run_time'], {
    name: 'timestamp_index',
  })

  pgm.createIndex('divi_icu_register', ['run_time', 'name', 'address_city', 'address_postcode', 'address_station'], {
    name: 'run_time_name_city_postcode_station_unique_index',
    unique: true,
  })
};

exports.down = pgm => {};
