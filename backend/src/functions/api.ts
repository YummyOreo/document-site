import express from "express";
import serverless from "serverless-http";
import addRouts from "../ts/api/router";
import hello from "../ts/api/routes/hello";
import main from "../ts/api/routes/main";

const app = express();

addRouts(app);

exports.handler = serverless(app);
export default app;
