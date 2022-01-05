const showImage = {
    data() {
        return {
            title: "",
            username: "",
            description: "",
            url: "",
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
            })
            .catch(console.log);
    },
    methods: {},
    template: `<img :src="url">
    `,
};

export default showImage;
