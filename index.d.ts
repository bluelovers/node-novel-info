import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmerge, deepmergeOptions } from './lib';
export { mdconf, array_unique, crlf, LF };
export { deepmerge, deepmergeOptions };
export interface IMdconfMeta {
    novel?: {
        title?: string;
        title_short?: string;
        author?: string;
        cover?: string;
        preface?: string;
        tags?: string[];
        date?: string;
        status?: string;
        r18?: string;
        series?: {
            name?: string;
            name_short?: string;
            position?: number;
        };
        source?: string;
        publisher?: string;
    };
    contribute?: string[];
    options?: {
        textlayout?: {
            allow_lf2?: boolean;
        };
        [key: string]: any;
    };
}
export interface IOptionsParse extends mdconf.IOptionsParse {
    chk?: boolean;
    throw?: boolean;
    removeRawData?: boolean;
}
export declare const defaultOptionsParse: IOptionsParse;
export declare function stringify(data: any, d2?: any, ...argv: any[]): string;
export declare function parse(data: {
    toString(): string;
}, options?: IOptionsParse): IMdconfMeta;
export declare function parse(data: string, options?: IOptionsParse): IMdconfMeta;
export declare function sortKeys(ret: IMdconfMeta): self.IMdconfMeta;
export declare function chkInfo(ret: IMdconfMeta): IMdconfMeta;
export declare const mdconf_parse: typeof self.parse;
import * as self from './index';
export default self;
