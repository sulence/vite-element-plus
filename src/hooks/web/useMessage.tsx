
import { ElMessage as Message, ElNotification } from 'element-plus';

import type { NotificationProps } from "element-plus";

export interface NotifyApi {
  info(config: NotificationProps): void;
  success(config: NotificationProps): void;
  error(config: NotificationProps): void;
  warning(config: NotificationProps): void;
  close(key: String): void;
  destroy(): void;
}


/**
 * @description: message
 */
 export function useMessage() {
  return {
    createMessage: Message,
    notification: ElNotification,
  };
}
