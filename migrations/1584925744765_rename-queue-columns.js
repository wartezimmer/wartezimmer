/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.renameColumn('queues', 'userId', 'user_id')
  pgm.renameColumn('queues', 'facilityId', 'facility_id')
  pgm.renameColumn('queues', 'earliestDeparture', 'earliest_departure')
  pgm.renameColumn('queues', 'travelTime', 'travel_time')
  
  pgm.createIndex('queues', ['user_id', 'facility_id'], {
    name: 'user_id_facility_id_unique',
    unique: true
  })
};

exports.down = pgm => {};
