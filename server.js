const express = require("express");
const app = express();
const { getImages } = require("./db");

app.use(express.static("./public"));

app.use(express.json());

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
