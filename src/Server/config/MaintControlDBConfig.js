module.exports = {
  DATABASE_CONNECTION_DETAILS: () => {
    return MaintControlDB_CONNECTION_DETAILS = {
      host: 'db',
      user: 'postgres',
      port: 5432,
      password: 'Password1',
      database: 'MaintControlDB'
    };
  },
};
