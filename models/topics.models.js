const db = require("../db/connection");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    const topicsSlugDesc = rows.map(({ img_url, ...rest }) => rest);

    return topicsSlugDesc;
  });
};

module.exports = { fetchTopics };
