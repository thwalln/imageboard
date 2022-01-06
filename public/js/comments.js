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
        // mounted - makes a GET request to retrieve all comments made about the image currently shown in the modal!
        console.log("FIRST LOG IN COMMENTS", this.imgId);
    },
    methods: {
        clickSubmit() {
            console.log("Submit button clicked");
            console.log("This", this);
            fetch("");
        },
        // when you click submit, you should make a POST request to insert the new comment in the database
        // do NOT use formData! (this is only necessary when you're sending a file along to the server). Instead, just pass the stringified JS object as the body.
        // upon success, your new comment should be added to the array of comments (this is what you retrieved when your comment component mounted).
    },
    template: `
        <input type="text" name="comment" placeholder="Comment"></input>
        <input type="text" name="username" placeholder="Username"></input>
        <button @click="clickSubmit">submit</button>
    `,
};

export default comments;
