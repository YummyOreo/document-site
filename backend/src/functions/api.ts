import express from "express";
import serverless from "serverless-http";
import cors from "cors";

const app = express();
app.use(cors());
app.set("trust proxy", true);

const router = express.Router();

router.get("/", async (req, res) => {
  res.json("test");
});

app.use("/.netlify/functions/api/", router);

exports.handler = serverless(app);

export default app;
