const firstComponent = {
    data() {
        return {
            heading: "first component",
            greetee: "",
            count: 1,
        };
    },
    mounted() {
        console.log("first component just mounted");
        this.greetee = "onion";
    },
    methods: {
        increaseCount() {
            this.count++;
        },
    },
    template: `<div>
        <h1>Hello {{heading}}</h1>
        <h2>Helloooooooo {{greetee}}</h2>
        <h2>Count: {{count}}</h2>
        <h3 @click="increaseCount">count up </h3>
    </div>`,
};

export default firstComponent;
