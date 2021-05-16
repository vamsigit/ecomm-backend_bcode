import { Sequelize } from 'sequelize'
import config from './config.js'
import logger from './libs/logger.js'

const DATABASES = {
  development: {
    database: config['DB_NAME'],
    username: config['DB_USER'],
    password: config['DB_PASSWORD'],
    host: config['DB_HOST'],
    port: config['DB_PORT']
  },
  test: {
    database: config['DB_TEST_NAME'],
    username: config['DB_TEST_USER'],
    password: config['DB_TEST_PASSWORD'],
    host: config['DB_TEST_HOST'],
    port: config['DB_TEST_PORT']
  },
  production: {}
}

let credentials = null

switch (process.env.NODE_ENV) {
  case 'development':
    credentials = DATABASES.development
    break;
  case 'test':
    credentials = DATABASES.test
    break;
  default:
    credentials = DATABASES.development
    break;
}

const sequelize = new Sequelize(
  credentials.database,
  credentials.username,
  credentials.password,
  {
    host: credentials.host,
    port: credentials.port,
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg)
  }
)

const validate = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    logger.error(error.stack)
  }
}
validate()

export default sequelize;
