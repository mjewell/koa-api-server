import request from 'supertest-as-promised';
import { before, beforeEach } from 'mocha';
import DatabaseCleaner from 'database-cleaner';
import _ from 'lodash';
import pg from 'pg';
import app from '../../src/app';
import { sequelize } from '../../src/models';
import security from '../../src/config/security';
const config = _.extend({}, sequelize.options, sequelize.config);

before(() => {
  security.saltRounds = 0;
});

beforeEach(done => {
  const databaseCleaner = new DatabaseCleaner('postgresql', {
    postgresql: {
      strategy: 'truncation',
      skipTables: [
        'schema_migrations',
        'geography_columns',
        'geometry_columns',
        'raster_columns',
        'raster_overviews',
        'spatial_ref_sys'
      ]
    }
  });
  const connectionString = `${config.dialect}://${config.username}:${config.password || ''}@${config.host}:${config.port}/${config.database}`;
  pg.connect(connectionString, (err, client, release) => {
    if (err) {
      console.log('Error connecting to Postgres:');
      console.log(err);
      return;
    }
    databaseCleaner.clean(client, () => {
      release();
      done();
    });
  });
});

export default request(app.listen());
