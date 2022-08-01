import { Component } from "../../types/classes.js";

export class ExamlpeCompenent extends Component {
  name: string;
  html: string;
  css: string[];
  constructor() {
    super();
    this.name = "example";
    this.html = "example.html";
  }

  async run() {
    console.log("Hello from example component");
  }
}
