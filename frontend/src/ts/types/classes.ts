import { Component } from "../components/compenent";

export default class PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  components: Component[];
  constructor(name: string = "") {}

  async run() {
    console.log(`Loaded page: ${this.name}`);
  }
}
