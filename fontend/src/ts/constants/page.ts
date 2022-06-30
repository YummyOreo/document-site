import $ = require("jquery");

export class Page {
    name: string;
    path: Array<string>;
    constructor(name: string, path: Array<string>) {
        this.name = name;
        this.path = path;
    }

    start() {
        console.log(`Starting ${this.name}`);
        $(document).prop('title', this.name);
    }

    update() {}
}