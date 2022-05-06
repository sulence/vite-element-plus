import { createApp } from "vue";
import App from "@/App.vue";

import { withInstall } from "@/utils";

import svgIcon from "./index.vue";

export const SvgIcon = withInstall(svgIcon);

const app = createApp(App);
// register globally
app.component("SvgIcon", SvgIcon);
