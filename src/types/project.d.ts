import { PermissionModeEnum } from "@/enums/appEnum";

export interface ProjectConfig {
  // Whether to display the logo
  showLogo: boolean;
  //
  collapsed: boolean;
  //
  showTagsView: boolean;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Permission mode
  permissionMode: PermissionModeEnum;
}
