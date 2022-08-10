import { Component } from "../../types/classes.js";

export class FooterCompenent extends Component {
  name: string;
  html: string;
  css: string[];
  constructor() {
    super();
    this.name = "footer";
    this.html = "footer.html";
    this.css = ["footer.css"];
  }

  async run() {}
}
