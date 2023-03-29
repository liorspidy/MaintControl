var Promise = require('promise');
var db = require('../../../../db/index');

deleteGuide = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`DELETE FROM fact_guides WHERE
                         guide_id = ${data.guide_id} AND 
                         company_id = ${decodedToken.companyId}`);

      result.then(() => {
          resolve({
            httpCode: 200,
            answer: "deleted guide succesfuly"
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during deleting guide: ${err}`
          })
        })
    } catch (error) {
      reject({
        httpCode: 500,
        answer: "Internal server error"
      });
    }
  })
}

module.exports = {
  deleteGuide: deleteGuide
}