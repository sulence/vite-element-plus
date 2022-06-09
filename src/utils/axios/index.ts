// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import type { AxiosResponse } from "axios";
import axios from "axios";

import { ContentTypeEnum, RequestEnum, ResultEnum } from "../../enums/httpEnum";
import { VAxios } from "./Axios";
import { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";
import { RequestOptions, Result } from "./types";
import { deepMerge, setObjToUrlParams } from "../index";
import { isString, isUrl } from "../is";
import { formatRequestDate, joinTimestamp } from "./helper";
import { checkStatus } from "./checkStatus";
import { useGlobSetting } from "../../hooks/setting";
import { useUserStoreWithOut } from "@/store/modules/user";

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix || "";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestHook: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误的时候返回
    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error("请求出错，请稍候重试");
    }

    //  这里 code，result，message为 后台统一的字段，需要修改为项目自己的接口返回格式
    const { code, result, message } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess =
      data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;

    // 接口请求成功，直接返回结果
    if (hasSuccess && code === ResultEnum.SUCCESS) {
      return result;
    }
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let errorMsg = message;
    switch (code) {
      // 请求失败
      case ResultEnum.ERROR:
        errorMsg = "请求失败";
        break;
      // 登录超时
      case ResultEnum.TIMEOUT:
        errorMsg = "登录超时，请重新登录!";
        break;
    }
    throw new Error(errorMsg);
  },
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
      urlPrefix,
    } = options;

    const isUrlStr = isUrl(config.url as string);

    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    const data = config.data || false;

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        );
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, "data") &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    const userStore = useUserStoreWithOut();
    // 请求之前处理config
    const token = userStore.getToken;
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization =
        options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {};
    // TODO 此处要根据后端接口返回格式修改
    const msg: string =
      response && response.data && response.data.message
        ? response.data.message
        : "";
    const err: string = error.toString();

    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        throw new Error("接口请求超时，请刷新页面重试!");
      }
      if (err && err.includes("Network Error")) {
        throw new Error("网络异常! 请检查您的网络连接是否正常");
      }
    } catch (error) {
      throw new Error(error as any);
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg);
    } else {
      console.warn(error, "请求被取消！");
    }
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: "",
        timeout: 10 * 1000,

        // 接口前缀
        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: "message",
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
        withCredentials: false,
      },
      opt || {}
    )
  );
}

export const http = createAxios();
