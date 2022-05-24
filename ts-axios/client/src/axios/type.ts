export type Upper<T> = T extends string ? Uppercase<T> | T : never;
export type Method = Upper<"get" | "post" | "delete" | "put">;
export interface AxiosRequestConfig {
  url: string;
  method: Method;
  params: any;
  headers?: Record<string, string | string[]>;
}
export type AxiosResponse<T = any> = T extends any
  ? {
      data: T;
      status: number;
      statusText: string;
      request: any;
      headers: Record<string, string | string[]>;
      config: AxiosRequestConfig;
    }
  : never;

// export type AxiosResponse<T> = Wrapper<SourceAxiosResponse<T>>;

// export type Wrapper<T> = T extends any ? T : never;
