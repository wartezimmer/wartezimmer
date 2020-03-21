/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    userId: { 
      type: 'varchar(128)', 
      notNull: true 
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('facilities', {
    id: 'id',
    externalId: { 
      type: 'varchar(128)', 
      notNull: true 
    },
    name: { 
      type: 'varchar(128)', 
      notNull: true 
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('queues', {
    id: 'id',
    userId: { 
      type: 'varchar(128)', 
      notNull: true 
    },
    facilityId: { 
      type: 'id',
      references: '"facilities"',
      onDelete: 'cascade',
      notNull: true
    },
    earliestDeparture: { 
      type: 'timestamp',
      notNull: true 
    },
    travelTime: {
      type: 'integer',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {};
