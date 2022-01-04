const express = require("express");
const app = express();
const { uploader } = require("./uploads");
const { getImages, insertImage } = require("./db");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { title, username, description } = req.body;
    const url = `https://spicedling.s3.amazonaws.com/${req.file.filename}`;
    if (req.file) {
        insertImage(url, username, title, description)
            .then(res.json({ title, username, description, url }))
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

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
