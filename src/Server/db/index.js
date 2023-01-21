const dbConfig = require('../config/MaintControlDBConfig');
const {
  Client
} = require('pg');
var colors = require('colors');
var myClient = null;

connectMaintControlDB = () => {
  return new Promise((resolve, reject) => {
    try {
      const dbDetails = dbConfig.DATABASE_CONNECTION_DETAILS();
      const client = new Client({
        host: dbDetails.host,
        user: dbDetails.user,
        port: dbDetails.port,
        password: dbDetails.password,
        database: dbDetails.database
      });

      client.connect();
      myClient = client;
      console.log(colors.green(`SUCCESS: connected to MaintControlDB`));
      resolve()
    } catch (error) {
      console.log(colors.red(`FAILURE: ${error}`));
      reject(error)
    }
  })
}

query = (queryText, values = []) => {
  return new Promise((resolve, reject) => {
    try {
      result = myClient.query(queryText, values)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}


module.exports = {
  connectMaintControlDB: connectMaintControlDB,
  query: query
}