import { component } from "./components/component-controller";
import getPage from "./router/page-router";
import { auth, user } from "./store";
import { getUserInformation } from "./user/info";

customElements.define("custom-component", component);

getLocalStorage();

await getUserInformation();

console.log(user);

await getPage();

function getLocalStorage() {
  auth.name = localStorage.getItem("name");
  auth.token = localStorage.getItem("token");
  if (auth.token) auth.signedIn = true;
}
