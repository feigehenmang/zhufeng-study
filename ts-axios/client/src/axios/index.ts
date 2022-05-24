import { Axios } from "./Axios";
function createInstance(requestConfig: any) {
  const axios = new Axios(requestConfig);
  const instance = Axios.prototype.request.bind(axios);
  return instance;
}

export default createInstance({});
