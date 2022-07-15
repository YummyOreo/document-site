import express from "express";
import serverless from "serverless-http";
import addRouts from "../ts/api/router";
import cors from "cors";

const app = express();
app.use(cors());

addRouts(app);

exports.handler = serverless(app);
export default app;
