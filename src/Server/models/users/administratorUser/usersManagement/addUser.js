var Promise = require('promise')
var db = require('../../../../db/index')

addUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query('BEGIN')
      .then(() => {
        return db.query(`INSERT INTO dim_locations (address_name, city, country, latitude, longitude, zone_name) VALUES (
          $1, $2, $3, $4, $5, $6) RETURNING location_id`, 
          [data.location.address_name, data.location.city, data.location.country, data.location.latitude, data.location.longitude, data.location.work_zone])
      })
      .then((res) => {
        const locationId = res.rows[0].location_id;
        return db.query(`INSERT INTO dim_users (
          user_name,
          first_name,
          last_name,
          email,
          password,
          phone,
          role,
          company_id,
          location_id) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9)`, 
            [data.user_name, data.first_name, data.last_name, data.email, data.password, data.phone, data.role, data.company_id, locationId])
      })
      .then(() => {
        return db.query('COMMIT')
      })
      .then(() => {
        resolve({
          httpCode: 200,
          answer: "Added user successfully"
        });
      })
      .catch((err) => {
        db.query('ROLLBACK');
        reject({
          httpCode: 500,
          answer: `Error during adding user: ${err}`
        });
      });
  });
}

module.exports = {
  addUser: addUser
}