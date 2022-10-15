import * as express from "express";
import { checkPerms } from "../config/get";
import { config } from "../config/load";

export function requireAdmin(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log(config.admin);

  if (checkPerms("admin")) {
    return next();
  }

  res.status(401).send({
    status: 401,
    error: 'You have to have "ADMIN" permission to access this endpoint',
  });
}
