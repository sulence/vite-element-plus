export interface PanelGroupItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  type: string;
  action: string;
}

export const panelGroupList: PanelGroupItem[] = [
  {
    title: "访问数",
    icon: "peoples",
    value: 2000,
    total: 120000,
    type: "success",
    action: "月",
  },
  {
    title: "成交额",
    icon: "money",
    value: 20000,
    total: 500000,
    type: "info",
    action: "月",
  },
  {
    title: "下载数",
    icon: "message",
    value: 8000,
    total: 120000,
    type: "danger",
    action: "周",
  },
  {
    title: "成交数",
    icon: "shopping",
    value: 5000,
    total: 50000,
    type: "warning",
    action: "年",
  },
];
