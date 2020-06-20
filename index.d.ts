/**
 * Created by user on 2018/1/27/027.
 */
import { deepmergeOptions } from './lib/const';
import { mdconf } from 'mdconf2';
import { envVal, envBool } from 'env-bool';
import { IOptionsParse, IMdconfMeta } from './lib/types';
export * from './lib/util';
export * from './lib/types';
export { IMdconfMeta, IOptionsParse } from './lib/types';
export * from './version';
export { mdconf };
export { deepmergeOptions };
export { envVal, envBool };
export declare const defaultOptionsParse: IOptionsParse;
export declare function stringify(data: any, d2?: any, ...argv: any[]): string;
export declare function parse<T = IMdconfMeta>(data: {
    toString(): string;
}, options?: IOptionsParse): T;
export declare function parse<T = IMdconfMeta>(data: string, options?: IOptionsParse): T;
export declare function _handleData<T extends IMdconfMeta>(data: any, d2?: any, ...argv: any[]): T;
export declare function _handleDataForStringify<T extends IMdconfMeta>(data: any, d2?: any, ...argv: any[]): T;
export declare const mdconf_parse: typeof parse;
declare const _default: typeof import(".");
export default _default;
