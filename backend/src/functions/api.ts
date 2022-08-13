import express from "express";
import serverless from "serverless-http";
import cors from "cors";

import { document } from "../ts/routes/";

const app = express();
app.use(cors());
app.set("trust proxy", true);

app.use("/.netlify/functions/api/doc/", document.router);

exports.handler = serverless(app);

export default app;
