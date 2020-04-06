/* eslint-disable quote-props */
/* eslint-disable quotes */
export default {
  "development": {
    "username": process.env.MYSQL_USER!,
    "password": process.env.MYSQL_PASSWORD!,
    "database": process.env.MYSQL_DATABASE!,
    "host": process.env.MYSQL_HOST!,
    "dialect": 'mysql',
    "timezone": '+09:00',
    logging: false,
  },
  "test": {
    "username": process.env.MYSQL_USER!,
    "password": process.env.MYSQL_PASSWORD!,
    "database": process.env.MYSQL_DATABASE!,
    "host": process.env.MYSQL_HOST!,
    "dialect": 'mysql',
    "timezone": '+09:00',
    logging: false,
  },
  "production": {
    "username": process.env.MYSQL_USER!,
    "password": process.env.MYSQL_PASSWORD!,
    "database": process.env.MYSQL_DATABASE!,
    "host": process.env.MYSQL_HOST!,
    "dialect": 'mysql',
    "timezone": '+09:00',
    logging: false,
  },
};
