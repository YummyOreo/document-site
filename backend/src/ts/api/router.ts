import { hello } from "../controllers/main-controller";
import main from "./routes/main";
import { Application } from "express";

function addRouts(app: Application) {
  app.use("/.netlify/functions/api", main);
  app.use("/.netlify/functions/api/hello", hello);
}

export default addRouts;
