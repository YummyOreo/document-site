import express from "express";
import * as mainController from "../controllers/main-controller";

const router = express.Router();

router.get("/", async (req, res) => {
  await mainController.hello(req, res);
});

export default router;
