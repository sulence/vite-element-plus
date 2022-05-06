import { withInstall } from "@/utils";

import appMain from "./AppMain.vue";
import navbar from "./Navbar.vue";
// import settings from "./Settings/index.vue";
import sidebar from "./Sidebar/index.vue";
import tagsView from "./TagsView/index.vue";

export const AppMain = withInstall(appMain);
export const Navbar = withInstall(navbar);
// export const Settings = withInstall(settings);
export const Sidebar = withInstall(sidebar);
export const TagsView = withInstall(tagsView);
