import _ from 'lodash';
import log from './log';
import {
  name as dbName,
  username,
  password,
  envVariable
} from './config/db';

const logger = log.child({ component: 'sequelize' });
const sharedOptions = {
  username,
  password,
  host: '127.0.0.1',
  dialect: 'postgres',
  logging(msg) {
    logger.debug(msg);
  }
};

module.exports = {
  development: _.extend({
    database: `${dbName}_development`,
  }, sharedOptions),
  test: _.extend({
    database: `${dbName}_test`,
  }, sharedOptions),
  production: _.extend({
    use_env_variable: envVariable,
    database: `${dbName}_production`
  }, sharedOptions)
};
