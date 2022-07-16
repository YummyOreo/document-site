import * as express from "express";
import * as serverless from "serverless-http";
import addRouts from "../ts/api/router";
import cors from "cors";
import { client, connect } from "../ts/db/db";

const app = express();
app.use(cors());
app.set("trust proxy", true);

addRouts(app);

exports.handler = serverless(app);

connect()
  .then(() => {})
  .catch(console.error)
  .finally(() => client.close());

export default app;
