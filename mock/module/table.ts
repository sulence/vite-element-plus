import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../index";

export default [
  {
    url: "/getTableList",
    timeout: 1000,
    method: "get",
    response: () => {
      return resultSuccess({
        data: {
          dataList: [
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
          ],
          pageNum: 1,
          pageSize: 10,
          total: 2000,
        },
      });
    },
  },
] as MockMethod[];
