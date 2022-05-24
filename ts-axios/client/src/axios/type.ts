export type Upper<T> = T extends string ? Uppercase<T> | T : never;
export type Method = Upper<"get" | "post" | "delete" | "put">;
export interface AxiosRequestConfig {
  url: string;
  method: Method;
  params: any;
}
export interface AxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  request: any;
  headers: Record<string, string | string[]>;
  config: AxiosRequestConfig;
}
