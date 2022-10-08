import * as express from "express";
import { getCollection } from "../db/collections/documents";
import * as sanitizeHtml from "sanitize-html";
import { Author, Doc } from "../../../types/BackendTypes";
import { currentUser } from "../auth/user";

export async function make(req: express.Request, res: express.Response) {
  await check(req).then((error) => {
    if (error != "") {
      res.status(400).send({ error, status: 400 });
    }
  });

  if (res.headersSent) return;

  const title = req.query["title"].toString();
  const dangerBody = req.body;

  let body = sanitizeHtml(dangerBody);
  body += " ";

  const author: Author = {
    name: currentUser.getName(),
    id: currentUser.getId(),
  };

  const document: Doc = { title, body, author };

  getCollection()
    .insertOne(document)
    .then((document) => {
      res.status(201).send({
        id: document.insertedId.toString(),
      });
    })
    .catch(() => {
      res.status(500).send({
        error:
          "There was a internal error trying to make your document. If this keeps happening, please contact the devs.",
        status: 500,
      });
    });
}

async function check(req: express.Request): Promise<string> {
  if (req.headers["content-type"] != "text/plain") {
    return 'Please set the "content-type" header to "text/plain"';
  }

  if (!("title" in req.query)) {
    return "Plese provide a title in the query params";
  }

  if (req.query["title"] == "") {
    return "Plese provide a title";
  }

  if (req.body == "") {
    return "Please provide a body";
  }

  if (
    (await getCollection().find({ title: req.query["title"] }).toArray())
      .length > 0
  ) {
    return "A document with that title already exists";
  }

  if (req.body.length > 20000) {
    return `Your document is too long. Please reduce your document by: ${
      req.body.length - 20000
    } characters`;
  }
  if (req.query["title"].toString().length > 40) {
    return `Your title is too long. Please reduce your title by: ${
      req.query["title"].toString().length - 40
    } characters`;
  }

  return "";
}
