const db = require("../db/connection");

const fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Bad request" });
    }
    return rows;
  });
};

module.exports = { fetchUsers };
