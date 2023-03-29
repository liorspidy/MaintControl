var Promise = require('promise');
var db = require('../../../../db/index');

addGuide = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`INSERT INTO fact_guides 
                        (guide_title,
                         guide_content,
                         company_id) VALUES
                         ('${data.guide_title}',
                          '${data.guide_content}',
                           ${decodedToken.companyId})`);

      result.then(() => {
          resolve({
            httpCode: 200,
            answer: "Added guide succesfuly"
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during adding guide: ${err}`
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
  addGuide: addGuide
}