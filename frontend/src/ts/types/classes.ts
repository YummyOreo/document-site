export default class Page {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor(name: string = "") {}

  async run() {
    console.log(`Loaded page: ${this.name}`);
  }
}
