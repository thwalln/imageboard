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
    const q = `SELECT * FROM images ORDER BY id desc`;
    return db.query(q);
};

module.exports.insertImage = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.getImageData = (imgId) => {
    const q = `SELECT * FROM images WHERE id = $1`;
    const params = [imgId];
    return db.query(q, params);
};

module.exports.getAllComments = (imageId) => {
    // gets all comments for a particular image
    const q = `SELECT * FROM comments WHERE image_id IS $1`;
    const params = [imageId];
    return db.query(q, params);
};

module.exports.insertComment = (commentText, username, imageId, createdAt) => {
    // adds a specific comment for an image into the database
    const q = `INSERT INTO comments (comment_text, username, image_id, created_at) VALUES ($1, $2, $3, $4)`;
    const params = [commentText, username, imageId, createdAt];
    return db.query(q, params);
};
