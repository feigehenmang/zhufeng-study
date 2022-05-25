export class Cancel {
  constructor(public message: string) {}
}
export class CancelToken {
  resolve: any;
  source() {
    return {
      token: new Promise((resolve) => {
        this.resolve = resolve;
      }),
      cancel: (message: string) => {
        // console.log(message, this.resolve);
        this.resolve(new Cancel(message));
      },
    };
  }
}
export function isCancel(err: any) {
  return err instanceof Cancel;
}
