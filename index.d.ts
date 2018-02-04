import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique } from './lib';
export { mdconf, array_unique, crlf, LF };
export interface IMdconfMeta {
    novel?: {
        title?: string;
        author?: string;
        cover?: string;
        preface?: string;
        tags?: string[];
        date?: string;
        status?: string;
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
export interface IOptions extends mdconf.IOptionsParse {
    chk?: boolean;
    throw?: boolean;
    removeRawData?: boolean;
}
export declare function stringify(data: any, ...argv: any[]): string;
export declare function parse(data: {
    toString(): string;
}, options?: IOptions): IMdconfMeta;
export declare function parse(data: string, options?: IOptions): IMdconfMeta;
export declare function chkInfo(ret: IMdconfMeta): IMdconfMeta;
export declare const mdconf_parse: typeof self.parse;
import * as self from './index';
export default self;
