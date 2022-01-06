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
            this.$emit("close");
        },
    },
    template: `<div id="selectedImg">
        <div class="image-card">
            <div class="content">
                <div class="data">
                    <img :src="url">
                    <h1>{{title}}</h1>
                    <h4>{{description}}</h4>
                    <p>Uploaded by {{username}} {{created_at}}</p>
                </div>
                <show-comments :img-id="imgId"></show-comments>
            </div>
            <div class="actions">
                <button @click="clickSelectedImg" class="button button-dark">Close</button>
            </div>
        </div>
    </div>
    `,
};

export default showImage;
