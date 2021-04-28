const knex = require('knex');

module.exports = knex({
    client: 'pg',  //indica que se usara postgres como motor de BD
    connection: process.env.DATABASE_URL,
    pool: { min: 1, max: 2 },
    acquireConnectionTimeout: 5000,
  });