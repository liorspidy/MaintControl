var Promise = require('promise');
var db = require('../../../../db/index');
        
updateGuide = (data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`UPDATE fact_guides
                        SET guide_title = '${data.guide_title}',
                        guide_content = '${data.guide_content}'
                        WHERE guide_id = ${data.guide_id}`);

      result.then(() => {
          resolve({
            httpCode: 200,
            answer: "Uupdated guide succesfuly"
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during updating guide: ${err}`
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
  updateGuide: updateGuide
}