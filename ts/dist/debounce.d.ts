export interface DebounceOptions {
    immediate?: boolean;
}
export declare function debounce(fn: (...args: any[]) => void, wait: number, options?: DebounceOptions): (this: any, ...args: any[]) => void;
