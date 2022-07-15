import express from "express";
import serverless from "serverless-http";
import router from "../ts/routes/main";

const app = express();

app.use("/.netlify/functions/api", router);

exports.handler = serverless(app);
export default app;
