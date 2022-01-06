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
    <form>
            <input v-model="comment" type="text" name="comment" placeholder="Comment"></input>
            <input v-model="username" type="text" name="username" placeholder="Username"></input>
            <button @click.prevent="clickSubmit" >submit</button>
        </form>

        <div v-for="item in comments">
            <p>{{item.comment_text}} by {{item.username}} on {{item.created_at}}</p>
        </div>
    </div>
    `,
};

export default comments;
