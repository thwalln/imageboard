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
        fetch(`/comments/${this.imgId}.json`, {
            imgId: this.imgId,
        })
            .then((resp) => resp.json())
            .then(({ rows }) => {
                console.log(rows);
                this.comments = rows;
            })
            .catch(console.log);
    },
    methods: {
        clickSubmit() {
            fetch("/comment.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    comment: this.comment,
                    image_id: this.imgId,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data: ", data);
                    console.log("Comments array 1: ", this.comments);
                    this.comments.unshift(data);
                    console.log("Comments array 2: ", this.comments);
                })
                .catch(console.log);
        },
    },
    template: `<div>
        <div v-for="item in comments">
            <p>{{item.comment_text}} by {{item.username}} {{item.created_at}}</p>
        </div>
        <form>
            <input v-model="comment" type="text" name="comment" placeholder="Comment" class="input-dark">
            <input v-model="username" type="text" name="username" placeholder="Username" class="input-dark">
            <button @click.prevent="clickSubmit" class="button button-dark">Submit</button>
        </form>
    </div>
    `,
};

export default comments;
