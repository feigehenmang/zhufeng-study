import { AxiosRequestConfig, AxiosResponse } from "./type";
import parseHeaders from "parse-headers";
import qs from "qs";
import {
  AxiosInterceptorManager,
  Interceptor,
} from "./AxiosInterceptorManager";
export class Axios {
  interceptors = {
    request: new AxiosInterceptorManager(),
    response: new AxiosInterceptorManager(),
  };
  constructor(config: any) {}
  request<T = any>(config: AxiosRequestConfig): Promise<any> {
    const chain: Interceptor[] = [
      {
        onFullfilled: this.dispatchRequest,
      },
    ];
    this.interceptors.request.stack.forEach((interceptor) => {
      interceptor && chain.unshift(interceptor);
    });
    this.interceptors.response.stack.forEach((interceptor) => {
      interceptor && chain.push(interceptor);
    });
    let promise = Promise.resolve(config);
    while (chain.length) {
      let { onFullfilled, onRejected } = chain.shift()!;
      promise = promise.then(onFullfilled, onRejected);
    }
    return promise;
    // return this.dispatchRequest<T>(config);
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      const params = config.params ? qs.stringify(config.params) : "";
      const url = config.url.includes("?")
        ? config.url + "&" + params
        : config.url + "?" + params;
      request.open(config.method, url, true);
      request.responseType = "json";
      request.onreadystatechange = function () {
        if (request.readyState == 4) {
          // console.log(request.status);
          if (request.status >= 200 && request.status < 300) {
            const response: AxiosResponse<T> = {
              data: request.response || request.responseText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              status: request.status,
              statusText: request.statusText,
              config: config,
              request: request,
            };
            resolve(response);
          } else {
            reject();
          }
        }
      };
      request.send();
    });
  }
}
