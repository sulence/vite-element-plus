export interface MenuChildrenList {
  icon: string;
  name: string;
  component: string;
  id: number;
  parentId: number;
}
export interface MenuList {
  icon: string;
  name: string;
  component: string;
  id: number;
  parentId: number;
  children?: MenuChildrenList[];
}

export const list: MenuList[] = [
  {
    icon: "system",
    name: "系统管理",
    component: "LAYOUT",
    id: 11,
    parentId: 0,
  },
  {
    icon: "system",
    name: "菜单管理",
    component: "System/Menu",
    id: 101,
    parentId: 11,
  },
];
