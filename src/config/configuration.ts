export default () => ({
  port: parseInt(process.env.PORT || '', 10) || 3491,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
  },
  mongodb: {
    username: process.env.MONGODB_USERNAME,
    password: parseInt(process.env.MONGODB_PASSWORD || '', 10) || 5432,
  },
  postgres: {
    connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
  },
});
