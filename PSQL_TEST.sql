SELECT articles.author, articles.title articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;


 JOIN shops ON treasures.shop_id = shops.shop_id
    ORDER BY $1 ASC
