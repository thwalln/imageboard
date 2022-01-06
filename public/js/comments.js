const comments = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    props: ["imgId"],
    mounted() {
        fetch("/comments/:id", {});
    },
    methods: {},
    template: `
        <input type="text" name="comment" placeholder="Comment"></input>
        <input type="text" name="username" placeholder="Username"></input>
        <button>submit</button>
    `,
};

export default comments;
