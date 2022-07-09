import express from "express";
const app = express();
const port = 3000;

import EndpointController from "./src/ts/controller/endpoint-controller";

const endpoint: EndpointController = new EndpointController(app);

app.get("/api", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
