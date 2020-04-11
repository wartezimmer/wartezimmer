/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('rki_district_case_numbers', {
    id: 'id',
    run_time: { // Timestamp of the crawl run (to have hostorical data + latest)
      type: 'timestamp', 
      notNull: true 
    },
    OBJECTID: { 
      type: 'integer',
    },
    ADE: { 
      type: 'integer',
    },
    GF: { 
      type: 'integer',
    },
    BSG: { 
      type: 'integer',
    },
    RS: { 
      type: 'varchar(5)',
    },
    AGS: { 
      type: 'varchar(5)',
    },
    SDV_RS: { 
      type: 'varchar(12)',
    },
    GEN: { 
      type: 'varchar(33)',
    },
    BEZ: { 
      type: 'varchar(16)',
    },   
    IBZ: { 
      type: 'integer',
    },
    BEM: { 
      type: 'varchar(13)',
    },   
    NBD: { 
      type: 'varchar(4)',
    },   
    SN_L: { 
      type: 'varchar(2)',
    },   
    SN_R: { 
      type: 'varchar(1)',
    },   
    SN_K: { 
      type: 'varchar(2)',
    },   
    SN_V1: { 
      type: 'varchar(2)',
    },
    SN_V2: { 
      type: 'varchar(2)',
    }, 
    SN_G: { 
      type: 'varchar(3)',
    }, 
    FK_S3: { 
      type: 'varchar(1)',
    }, 
    NUTS: { 
      type: 'varchar(5)',
    },
    RS_0: { 
      type: 'varchar(12)',
    },
    AGS_0: { 
      type: 'varchar(8)',
    },
    WSK: { 
      type: 'varchar(23)',
    },
    EWZ: { 
      type: 'integer',
    },
    KFL: { 
      type: 'double',
    },
    DEBKG_ID: { 
      type: 'varchar(16)',
    },
    Shape__Area: { 
      type: 'double',
    },
    Shape__Length: { 
      type: 'double',
    },
    death_rate: { 
      type: 'double',
    },  
    cases: { 
      type: 'integer',
    },
    deaths: { 
      type: 'integer',
    },
    cases_per_100k: { 
      type: 'double',
    },
    cases_per_population: { 
      type: 'double',
    },  
    BL: { 
      type: 'varchar(256)',
    },
    BL_ID: { 
      type: 'varchar(256)',
    },
    county: { 
      type: 'varchar(256)',
    },
    last_update: { 
      type: 'varchar(256)',
    },
    cases7_per_100k: { 
      type: 'double',
    },  
    recovered: { 
      type: 'integer',
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createIndex('rki_district_case_numbers', ['run_time'], {
    name: 'rki_timestamp_index',
  })

  pgm.createIndex('rki_district_case_numbers', ['run_time', 'OBJECTID'], {
    name: 'rki_run_time_objectid_unique_index',
    unique: true,
  })
};

exports.down = pgm => {};
