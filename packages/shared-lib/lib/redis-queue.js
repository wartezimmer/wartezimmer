const Queue = require('bull');

const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';
const dataQueue = new Queue('data', REDIS_URL);

module.exports = { dataQueue };