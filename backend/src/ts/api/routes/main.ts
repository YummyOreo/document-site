import * as mainController from "../../controllers/main-controller";
import * as express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  await mainController.hello(req, res);
});

export default router;
