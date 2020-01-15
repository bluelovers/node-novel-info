/**
 * Created by user on 2018/1/28/028.
 */
declare type IFilterPatternFn<T extends unknown> = ((key: string, value: T | unknown) => boolean);
declare type IFilterPattern<T extends unknown> = IFilterPatternFn<T> | string | RegExp;
declare type IEntries<T extends unknown> = [string, T][];
export declare function _prefix_to_fn<T extends unknown>(prefix: IFilterPattern<T>): IFilterPatternFn<T>;
export declare function filterByPrefix<T extends unknown>(prefix: IFilterPattern<T>, obj: {
    [k: string]: T | unknown;
}, options?: {
    ignore?: IFilterPattern<T>;
}): IEntries<T>;
export declare function filterByPrefixReturnKeys<T extends unknown>(prefix: IFilterPattern<T>, obj: {
    [k: string]: T | unknown;
}, options?: {
    ignore?: IFilterPattern<T>;
}): string[];
export declare function filterByPrefixReturnValues<T extends unknown>(prefix: IFilterPattern<T>, obj: {
    [k: string]: T | unknown;
}, options?: {
    ignore?: IFilterPattern<T>;
}): T[];
export declare function arr_filter<T>(arr: T[]): T[];
export declare function cb_title_filter(v: string): boolean;
export declare function anyToArray<T = string>(input: T | T[], unique?: boolean): T[];
export {};
