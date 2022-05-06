import { PermissionModeEnum } from "@/enums/appEnum";

export interface AppConfig {
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

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  isReload: boolean;
}
