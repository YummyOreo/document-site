import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { addRouts } from "../ts/router";

const app = express();
app.use(cors());
app.set("trust proxy", true);

addRouts(app);

exports.handler = serverless(app);

export default app;
