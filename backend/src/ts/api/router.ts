import example from "./routes/example";
import { Application } from "express";

function addRouts(app: Application) {
  app.use("/.netlify/functions/api/example", example);
}

export default addRouts;
