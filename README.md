# News-site app

This simple news site application is built with Node.js & PostgreSQL to demonstrate my ability to create, manage, and query an SQL database through Node.js.

Preview: <br>
https://news-site-app.onrender.com/api
<br>

## Getting Started

To setup this project locally a number of prerequisites step listed below are required.

### Prerequisites

#### Environment files

Although it is not typical to describe environment files in the .gitignore list, these are listed below to assist in the setup of this news site.

Create the following environment files in the root director containing the relative code below:

- .env.development

  ```
    PGDATABASE=nc_news
  ```

- .env.test
  ```
    PGDATABASE=nc_news_test
  ```

#### Dependencies

This project utilizes and number of dependencies such as dotenv, express, nodemon, node-postgres.

```
  npm install
```

#### Databases

- Create databases and tables
  ```
    npm run setup-dbs
  ```
- Seed databases
  ```
    npm run seed-dev
  ```
  ```
    npm run test-seed
  ```

#### Folder Structure

- `./__tests__/` Jest testing files.
- `./controllers/` Controller files required by endpoints
- `./db/` Database files and subfolders
- `./models/` Model files required by controller files
