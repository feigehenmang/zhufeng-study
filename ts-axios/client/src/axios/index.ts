import { Axios } from "./Axios";
import { CancelToken, isCancel } from "./CancelToken";
function createInstance(requestConfig: any) {
  const axios = new Axios(requestConfig);
  const instance: any = Axios.prototype.request.bind(axios);
  Object.assign(instance, axios);
  instance.CancelToken = new CancelToken();
  instance.isCancel = isCancel;
  return instance;
}
export * from "./type";
export default createInstance({});
