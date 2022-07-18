import * as mainController from "../../controllers/main-controller";

import * as express from "express";
import { client, connect } from "../../db/db";
import { getCollection } from "../../db/collections/records";

const router = express.Router();

router.get("/", async (req, res) => {
  await mainController.hello(req, res);
});

export default router;
