import { Application } from "express";
import { document } from "../ts/routes/";

export function addRouts(app: Application) {
  app.use("/.netlify/functions/api/doc/", document.router);
}
