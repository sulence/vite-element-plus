import { withInstall } from "@/utils";

import sidebarItem from "./SidebarItem.vue";
import sidebarItemLink from "./SidebarItemLink.vue";
import sidebarLogo from "./SidebarLogo.vue";

export const SidebarItem = withInstall(sidebarItem);
export const SidebarItemLink = withInstall(sidebarItemLink);
export const SidebarLogo = withInstall(sidebarLogo);
