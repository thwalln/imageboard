const express = require("express");
const app = express();
const { getImages } = require("./db");

app.use(express.static("./public"));

app.use(express.json());

app.get("/get-image-data", (req, res) => {
    getImages().then(({ rows }) => {
        res.json(rows);
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
