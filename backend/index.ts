import express from "express";
const app = express();
const port = 3000;

import EndpointController from "@controllers/endpoint-controller";

const root = { root: __dirname.replace("backend", "") };
const htmlPath = "frontend/static/html/pages";
const htmlFiles = { index: htmlPath + "/index.html" };

const endpoint: EndpointController = new EndpointController(app);

app.get("/", (req, res) => {
  res.sendFile(htmlFiles["index"], root);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
