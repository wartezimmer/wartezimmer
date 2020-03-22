/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('facilities', {
    x: { 
      type: 'float(14)',
    },
    y: { 
      type: 'float(14)',
    },
    global_id: { 
      type: 'varchar(128)',
    },
    contact_phone: { 
      type: 'varchar(64)',
    },
    contact_website: { 
      type: 'varchar(128)',
    },
    contact_email: { 
      type: 'varchar(128)',
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
    emergency: { 
      type: 'boolean',
    },
    rooms: { 
      type: 'integer',
    },
    beds: { 
      type: 'integer',
    },
    capacity: { 
      type: 'integer',
    },
  })

  pgm.createIndex('facilities', ['externalId'], {
    name: 'externalId_unique',
    unique: true
  })

  pgm.createIndex('facilities', ['global_id'], {
    name: 'global_id_unique',
    unique: true
  })
};

exports.down = pgm => {};
