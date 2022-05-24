export type Interceptor = {
  onFullfilled: (...args: any[]) => any;
  onRejected?: (...args: any[]) => any;
};
export class AxiosInterceptorManager {
  public stack: Array<Interceptor | null> = [];
  use(onFullfilled: any, onRejected: any) {
    this.stack.push({
      onFullfilled,
      onRejected,
    });
  }
  eject(index: number) {
    if (this.stack[index]) {
      this.stack[index] = null;
    }
  }
}
