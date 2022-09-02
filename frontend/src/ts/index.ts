import { component } from "./components/component-controller";
import getPage from "./router/page-router";
import { auth } from "./store";

customElements.define("custom-component", component);

getLocalStorage();

await getPage();

function getLocalStorage() {
  auth.name = localStorage.getItem("name");
  auth.token = localStorage.getItem("token");
  if (auth.token) auth.signedIn = true;
}
