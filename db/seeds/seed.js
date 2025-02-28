const db = require("../connection")
const format = require("pg-format")

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query('DROP TABLE IF EXISTS comments;')
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics;");
    })
    .then(() => {
      return createTopicData()
    })
    .then(() => {
      return createUserData()
    })
    .then(() => {
      return createArticlesData()
    })
    .then(() => {
      return createcommentsData()
    })
    .then(() => {
      return insertTopicDataFunc()
    })
    .then(() => {
      return insertUserDataFunc()
    })
    .then(() => {
      return insertArticlesDataFunc()
    })
    .then(({ rows }) => {

      const articleIDLookup = createLookupObject(rows, "title", "article_id")

      const formattedCommentData = commentData.map((comment) => {
        let dateFormat = new Date(comment.created_at)
        return [articleIDLookup[comment.article_title], comment.body, comment.votes, comment.author, dateFormat]
      });

      const insertCommentDataQuery = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at)VALUES %L`,
        formattedCommentData
      );
      return db.query(insertCommentDataQuery);

    })
    .catch((err) => {
      console.log(err)
    });



  function createTopicData() {
    return db.query("CREATE TABLE topics (slug VARCHAR(255) PRIMARY KEY UNIQUE, description VARCHAR(255) NOT NULL, img_url VARCHAR(1000));")
  }

  function createUserData() {
    return db.query("CREATE TABLE users (username VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL, name VARCHAR(255) NOT NULL, avatar_url VARCHAR(1000));")
  }

  function createArticlesData() {
    return db.query("CREATE TABLE articles (article_id SERIAL PRIMARY KEY UNIQUE, title VARCHAR(255) NOT NULL, topic VARCHAR(255), author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, body TEXT NOT NULL, created_at TIMESTAMP, votes INT, article_img_url VARCHAR(1000));")
  }

  function createcommentsData() {
    return db.query("CREATE TABLE comments (comment_id SERIAL PRIMARY KEY UNIQUE, body TEXT, article_id INT REFERENCES articles(article_id ) ON DELETE CASCADE, author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, votes INT, created_at TIMESTAMP);")
  }


  function insertTopicDataFunc() {
    const formattedTopicData = topicData.map((data) => {
      return [data.description, data.slug, data.img_url]
    })
    const insertTopicData = format('INSERT INTO topics (description, slug, img_url) VALUES %L RETURNING *;', formattedTopicData)
    return db.query(insertTopicData)
  }

  function insertUserDataFunc() {
    const formattedUserData = userData.map((data) => {
      return [data.username, data.name, data.avatar_url]
    })
    const insertUserData = format('INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;', formattedUserData)
    return db.query(insertUserData)
  }

  function insertArticlesDataFunc() {
    const formattedArticlesData = articleData.map((data) => {
      let dateFormat = new Date(data.created_at)
      return [data.title, data.topic, data.author, data.body, dateFormat, data.votes, data.article_img_url]
    })

    const insertArticlesData = format('INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;', formattedArticlesData)
    return db.query(insertArticlesData)
  }

  function createLookupObject(data, targetKey, targetValue) {
    const lookup = {}
    data.forEach((dataRow) => {
      lookup[dataRow[targetKey]] = dataRow[targetValue]
    })
    return lookup
  }

  //

}
module.exports = seed;
