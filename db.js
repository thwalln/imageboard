const spicedPg = require("spiced-pg");
const database = "imageboard";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

console.log(`[db] connecting to:${database}`);

module.exports.getImages = () => {
    const q = `SELECT * FROM images ORDER BY id desc LIMIT 3`;
    return db.query(q);
};

module.exports.insertImage = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.getImageData = (imgId) => {
    const q = `SELECT * FROM images WHERE id = $1`;
    const params = [imgId];
    return db.query(q, params);
};

module.exports.getAllComments = (imageId) => {
    const q = `SELECT * FROM comments WHERE image_id = $1 ORDER BY id desc`;
    const params = [imageId];
    return db.query(q, params);
};

module.exports.insertComment = (commentText, username, imageId) => {
    const q = `INSERT INTO comments (comment_text, username, image_id) VALUES ($1, $2, $3) RETURNING *`;
    const params = [commentText, username, imageId];
    return db.query(q, params);
};

module.exports.getMoreImages = (id) => {
    const q = `SELECT url, title, id, (SELECT id
  FROM images
  ORDER BY id ASC
LIMIT 1) AS "lowestId" FROM images
WHERE id < $1
ORDER BY id DESC
LIMIT 3;`;
    const params = [id];
    return db.query(q, params);
};
