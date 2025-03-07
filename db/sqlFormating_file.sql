


CREATE TABLE topicData (slug SERIAL PRIMARY KEY UNIQUE, description VARCHAR(255) NOT NULL, img_url TEXT);

CREATE TABLE usersData (username VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL, name VARCHAR(255) NOT NULL, avatar_url TEXT);

CREATE TABLE articles (article_id SERIAL PRIMARY KEY UNIQUE, title VARCHAR(255) NOT NULL, topic INT REFERENCES topics(slug) ON DELETE CASCADE, author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, body TEXT NOT NULL, created_at TIMESTAMP, votes INT, article_img_url TEXT);

CREATE TABLE commetsData (
    comment_id SERIAL PRIMARY KEY UNIQUE, 
    article_id INT REFERENCES articles(article_id ) ON DELETE CASCADE, 
    author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, 
    created_at TIMESTAMP);







CREATE TABLE articles (article_id SERIAL PRIMARY KEY UNIQUE, title VARCHAR(255) NOT NULL, topic INT REFERENCES topics(slug) ON DELETE CASCADE, author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, body TEXT NOT NULL, created_at TIMESTAMP, votes INT, article_img_url TEXT);



title: "Running a Node App",
    topic: "coding",
    author: "jessjelly",
    body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
    created_at: 1604728980000,
    votes: 0,
    article_img_url:
      "https://images.pexels.com


CREATE TABLE articles (article_id SERIAL PRIMARY KEY UNIQUE, title VARCHAR(255) NOT NULL, topic VARCHAR(255), author VARCHAR(255), body TEXT, created_at INT, votes INT, article_img_url VARCHAR(1000));








  console.log
    INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES 
    ('Living in the shadow of a great man', 'mitch', 'butter_bridge', 'I find this existence challenging', '1594329060000', '100', 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), 
    
    ('Sony Vaio; or, The Laptop', 'mitch', 'icellusedkars', 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.', '1602828180000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
    
    , ('Eight pug gifs that remind me of mitch', 'mitch', 'icellusedkars', 'some gifs', '1604394720000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('Student SUES Mitch!', 'mitch', 'rogersop', 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages', '1588731240000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('UNCOVERED: catspiracy to bring down democracy', 'cats', 'rogersop', 'Bastet walks amongst us, and the cats are taking arms!', '1596464040000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('A', 'mitch', 'icellusedkars', 'Delicious tin of cat food', '1602986400000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('Z', 'mitch', 'icellusedkars', 'I was hungry.', '1578406080000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('Does Mitch predate civilisation?', 'mitch', 'icellusedkars', 'Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!', '1587089280000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('They''re not exactly dogs, are they?', 'mitch', 'butter_bridge', 'Well? Think about it.', '1591438200000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('Seven inspirational thought leaders from Manchester UK', 'mitch', 'rogersop', 'Who are we kidding, there is only one, and it''s Mitch!', '1589433300000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('Am I a cat?', 'mitch', 'icellusedkars', 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?', '1579126860000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('Moustache', 'mitch', 'butter_bridge', 'Have you seen the size of that thing?', '1602419040000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'), ('Another article about Mitch', 'mitch', 'butter_bridge', 'There will never be enough articles about Mitch!', '1602419040000', NULL, 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700') RETURNING *;










"

CREATE TABLE articles (article_id SERIAL PRIMARY KEY UNIQUE,
 title VARCHAR(255) NOT NULL, 
 topic VARCHAR(255), 
 author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, 
 body TEXT NOT NULL, 
 created_at TIMESTAMP, 
 votes INT, 
 article_img_url VARCHAR(1000));



CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY UNIQUE, 
    body TEXT, 
    article_id INT REFERENCES articles(article_id ) ON DELETE CASCADE, 
    author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, 
    votes INT, 
    created_at TIMESTAMP);")


use   article_title: to find   article_ID
rearange keys afterthe fact



      return db.query("CREATE TABLE articles (article_id SERIAL PRIMARY KEY UNIQUE, title VARCHAR(255) NOT NULL, topic VARCHAR(255) REFERENCES topics(slug), author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, body TEXT NOT NULL, created_at TIMESTAMP, votes INT, article_img_url VARCHAR(1000));")


      return db.query("CREATE TABLE comments (comment_id SERIAL PRIMARY KEY UNIQUE, body TEXT, article_id INT REFERENCES articles(article_id ) ON DELETE CASCADE, author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, votes INT, created_at TIMESTAMP);")

       return db.query("CREATE TABLE comments (comment_id SERIAL PRIMARY KEY UNIQUE, body TEXT, article_id INT REFERENCES articles(article_id ) ON DELETE CASCADE, author VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE, votes INT, created_at TIMESTAMP);")