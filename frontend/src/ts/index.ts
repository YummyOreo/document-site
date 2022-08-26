import { component } from "./components/component-controller";
import getPage from "./router/page-router";

customElements.define("custom-component", component);

await getPage();
