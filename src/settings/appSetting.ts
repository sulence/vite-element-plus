import { PermissionModeEnum } from "@/enums/appEnum";
import { AppConfig } from "@/types/app";

const setting: AppConfig = {
  // Whether to display the logo
  showLogo: true,
  // Menu collapse
  collapsed: false,
  //
  showTagsView: true,
  // Permission mode
  permissionMode: PermissionModeEnum.BACK,
  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,
};

export default setting;
