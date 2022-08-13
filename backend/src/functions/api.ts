import express, { Application } from "express";
import serverless from "serverless-http";
import cors from "cors";

import { document } from "../ts/routes/";

const app = express();
app.use(cors());
app.set("trust proxy", true);

addRouts(app);

exports.handler = serverless(app);

export default app;

export function addRouts(app: Application) {
  app.use("/.netlify/functions/api/doc/", document.router);
}
