import * as mdconf from 'mdconf2';
import { crlf } from 'crlf-normalize';
import { array_unique } from './lib';
export interface IMdconfMeta {
    novel: {
        title: string;
        author: string;
        cover: string;
        preface: string;
        tags: string[];
        date: string;
        status: string;
        source: string;
        publisher?: string;
    };
    contribute: string[];
    options?: {
        textlayout?: {
            allow_lf2?: boolean;
        };
        [key: string]: any;
    };
}
export { mdconf, array_unique, crlf };
export interface IOptions {
    chk?: boolean;
    throw?: boolean;
}
export declare function mdconf_parse(data: {
    toString(): string;
}, options?: IOptions): IMdconfMeta;
export declare function mdconf_parse(data: string, options?: IOptions): IMdconfMeta;
export declare function chkInfo(ret: IMdconfMeta): IMdconfMeta;
import * as self from './index';
export default self;
