import * as express from "express";
import * as serverless from "serverless-http";
import addRouts from "../ts/api/router";
import cors from "cors";
import { client, connect } from "../ts/db/db";
import { getCollection } from "../ts/db/collections/records";

const app = express();
app.use(cors());
app.set("trust proxy", true);

addRouts(app);

console.log("test");
exports.handler = serverless(app);

export default app;
