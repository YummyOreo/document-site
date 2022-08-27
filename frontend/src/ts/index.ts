import { component, componentAdapt } from "./components/component-controller";
import getPage from "./router/page-router";

customElements.define("custom-component", component);
customElements.define("custom-adapt-component", componentAdapt);

await getPage();
