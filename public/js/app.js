import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            username: "",
            description: "",
            file: null,
        };
    },
    mounted() {
        fetch("/images")
            .then((resp) => resp.json())
            .then(({ rows }) => {
                this.images = rows;
            })
            .catch(console.log);
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
                .then(console.log) // same as (result) => console.log(result)
                .catch(console.log); // same as (err) => console.log(err)
        },
        fileSelectHandler(e) {
            this.file = e.target.files[0];
        },
    },
}).mount("#main");
