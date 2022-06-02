import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, pagination, paginationSearch } from "../index";

const list = [
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
  {
    address: "上海 上海市",
    age: 23,
    avatar: "http://dummyimage.com/100x100/f2cb79&text=阎秀兰",
    createTime: "1975-03-20 07:04:50",
    email: "n.omvcfvs@lkbdphu.bo",
    gender: 2,
    id: "64504141135305171351",
    idCard: "64504141135305171351",
    status: 1,
    username: "钱秀英",
  },
];

export default [
  {
    url: "/getTableList",
    timeout: 1000,
    method: "get",
    response: ({ query }) => {
      const { pageNum, pageSize, username } = query;
      let rows = [];
      let total = list.length;
      if (username) {
        const searchData = paginationSearch(pageNum, pageSize, list, username);

        const { searchTotal, searchRows } = searchData;
        total = searchTotal;
        rows = searchRows;
      } else {
        rows = pagination(pageNum, pageSize, list);
      }
      return resultSuccess({
        rows: rows,
        total: total,
        query,
      });
    },
  },
] as MockMethod[];
