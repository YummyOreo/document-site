import express from "express";
import { Paths } from "./src/ts/constants/paths";
const app = express();
const port = 3000;

import EndpointController from "./src/ts/controller/endpoint-controller";

const root = { root: Paths["root"] };
console.log(Paths["root"]);

const htmlPath = Paths["pages"];
const htmlFiles = { index: htmlPath + "/index.html" };

const endpoint: EndpointController = new EndpointController(app);

app.get("/", (req, res) => {
  res.sendFile(htmlFiles["index"], root);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
