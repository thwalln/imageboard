import * as Vue from "./vue.js";
import showImage from "./showImage.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            username: "",
            description: "",
            file: null,
            igmSelected: null,
        };
    },
    mounted() {
        fetch("/images")
            .then((resp) => resp.json())
            .then(({ rows }) => {
                console.log("ROWS:", rows);
                this.images = rows;
            })
            .catch(console.log);
    },
    components: {
        "show-image": showImage,
    },
    methods: {
        clickHandler() {
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("username", this.username);
            fd.append("description", this.description);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data", data);
                    this.images.unshift(data);
                })
                .catch(console.log); // same as (err) => console.log(err)
        },
        fileSelectHandler(e) {
            this.file = e.target.files[0];
        },
        displayImg(imageId) {
            this.igmSelected = imageId;
            console.log(`Image with ID ${this.igmSelected} selected`);
        },
    },
}).mount("#main");
