const showImage = {
    data() {
        return {
            heading: "Hello there",
        };
    },
    props: ["imgId"],
    mounted() {
        console.log("imgId in showImage.js", this.imgId);
    },
    methods: {},
    template: `<h1>
    {{heading}}
    </h1>
    `,
};

export default showImage;
