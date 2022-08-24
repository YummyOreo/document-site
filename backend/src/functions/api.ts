import * as express from "express";
import * as serverless from "serverless-http";
import cors from "cors";
import { addRouts } from "../ts/router";

import * as bodyParser from "body-parser";

const app = express();

app.use(cors());
app.set("trust proxy", true);

app.use(bodyParser.text());
app.use(bodyParser.json());
// add more body parsers, it will only parse it if it matches the content type

addRouts(app);

exports.handler = serverless(app);

export default app;
