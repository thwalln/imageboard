import comments from "./comments.js";

const showImage = {
    data() {
        return {
            title: "",
            username: "",
            description: "",
            url: "",
            created_at: "",
        };
    },
    props: ["imgId"],
    mounted() {
        console.log("imgId in showImage.js", this.imgId);
        fetch(`/get-image/${this.imgId}`, {
            imgId: this.imgId,
        })
            .then((resp) => resp.json())
            .then(({ rows }) => {
                this.title = rows[0].title;
                this.username = rows[0].username;
                this.description = rows[0].description;
                this.url = rows[0].url;
                this.created_at = rows[0].created_at;
            })
            .catch(console.log);
    },
    components: {
        "show-comments": comments,
    },
    methods: {
        clickSelectedImg() {
            console.log("click click click");
            this.$emit("close");
        },
    },
    template: `<div id="selectedImg">
        <div class="image-card">
        <img :src="url">
        <show-comments :img-id="selectedImg"></show-comments>
            <h1>{{title}}</h1>
            <h4>{{description}}</h4>
            <p>Uploaded by {{username}} on {{created_at}}</p>
            <button @click="clickSelectedImg" class="close-card">Close</button></div>
        
    </div>
    `,
};

export default showImage;
