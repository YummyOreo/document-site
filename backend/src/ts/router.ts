import { Application } from "express";
import { document, user, groups } from "../ts/routes/";

export function addRouts(app: Application) {
  app.use("/.netlify/functions/api/doc/", document.router);
  app.use("/.netlify/functions/api/user/", user.router);
  app.use("/.netlify/functions/api/groups/", groups.router);
}
