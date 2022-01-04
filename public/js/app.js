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
        clickHandler() {},
    },
}).mount("#main");
