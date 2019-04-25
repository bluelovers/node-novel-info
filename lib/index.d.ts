/**
 * Created by user on 2018/1/28/028.
 */
import deepmerge = require('deepmerge-plus');
import deepmergeNS from 'deepmerge-plus/core';
import moment = require('moment');
import mdconf = require('mdconf2');
import { array_unique } from 'array-hyper-unique';
export { deepmerge, moment, mdconf };
export { array_unique };
export declare const deepmergeOptions: deepmergeNS.Options;
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
declare const _default: typeof import(".");
export default _default;
