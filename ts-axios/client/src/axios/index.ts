import { Axios } from "./Axios";
function createInstance(requestConfig: any) {
  const axios = new Axios(requestConfig);
  const instance: any = Axios.prototype.request.bind(axios);
  Object.assign(instance, axios);
  return instance;
}
export * from "./type";
export default createInstance({});
