const express = require("express");
const app = express();
const { uploader } = require("./uploads");
const {
    getImages,
    insertImage,
    getImageData,
    getAllComments,
    insertComment,
    getMoreImages,
} = require("./db");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { title, username, description } = req.body;
    const url = `https://spicedling.s3.amazonaws.com/${req.file.filename}`;
    if (req.file) {
        insertImage(url, username, title, description)
            .then((data) => {
                console.log("testtestets", data);
                res.json(data.rows[0]);
            })
            .catch(console.log);
    } else {
        res.json({ success: false });
    }
});

app.get("/images", (req, res) => {
    getImages()
        .then((data) => {
            res.json(data);
        })
        .catch(console.log);
});

app.get("/get-image/:id", (req, res) => {
    getImageData(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch(console.log());
});

app.post("/comment.json", (req, res) => {
    const { comment, username, image_id } = req.body;
    insertComment(comment, username, image_id)
        .then(res.json({ image_id, comment, username }))
        .catch(console.log);
});

app.get("/comments/:imageId.json", (req, res) => {
    getAllComments(req.params.imageId)
        .then((data) => res.json(data))
        .catch(console.log);
});

app.get("/get-more-images/:id", (req, res) => {
    getMoreImages(req.params.id)
        .then((data) => res.json(data))
        .catch(console.log);
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
