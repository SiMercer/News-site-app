const db = require("../db/connection");

const fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    return rows;
  });
};

module.exports = { fetchUsers };
