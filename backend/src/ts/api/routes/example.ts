import * as mainController from "../../controllers/example-controller";
import * as express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  await mainController.getExample(req, res);
});

export default router;
