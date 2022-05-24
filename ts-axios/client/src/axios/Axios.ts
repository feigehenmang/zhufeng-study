import { AxiosRequestConfig, AxiosResponse } from "./type";
import parseHeaders from "parse-headers";
import qs from "qs";
export class Axios {
  constructor(config: any) {}
  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest<T>(config);
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
