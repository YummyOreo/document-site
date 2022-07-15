import { hello } from "../controllers/main-controller";
import main from "./routes/main";

function addRouts(app) {
  app.use("/.netlify/functions/api", main);
  app.use("/.netlify/functions/api/hello", hello);
}

export default addRouts;
