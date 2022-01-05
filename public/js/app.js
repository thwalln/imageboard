import * as Vue from "./vue.js";
// below new stuff, remove when finished
// import firstComponent from "./firstComponent.js";
import showImage from "./showImage.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            username: "",
            description: "",
            file: null,
            // below new stuff from encounter, remove when finished
            // moods: [
            //     { id: 1, title: "gut" },
            //     { id: 2, title: "schlecht" },
            //     { id: 3, title: "medium" },
            // ],
            // moodSelected: null,
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
        // "first-component": firstComponent,
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
        //new stff below // remove when finished
        // selectMood() {
        //     this.moodSelected = true;
        // },
        displayImg(imageId) {
            console.log("Image ID", imageId);
        },
    },
}).mount("#main");
