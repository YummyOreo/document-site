import { Application } from "express";
import { document, user } from "../ts/routes/";

export function addRouts(app: Application) {
  app.use("/.netlify/functions/api/doc/", document.router);
  app.use("/.netlify/functions/api/user/", user.router);
}
