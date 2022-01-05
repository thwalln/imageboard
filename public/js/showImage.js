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
    methods: {
        clickSelectedImg() {
            console.log("click click click");
            this.$emit("close");
        },
    },
    template: `<div id="selectedImg">
        <img :src="url">
        <h1>{{title}}</h1>
        <h4>{{description}}</h4>
        <p>Uploaded by {{username}} on {{created_at}}</p>
        <button @click="clickSelectedImg">Close</button>
    </div>
    
    `,
};

export default showImage;
