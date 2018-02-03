import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique } from './lib';
export { mdconf, array_unique, crlf, LF };
export declare module Mdconf {
    interface IMdconfMeta {
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
    interface IOptions {
        chk?: boolean;
        throw?: boolean;
    }
    function stringify(data: any, level?: number, skip?: any[]): string;
    function parse(data: {
        toString(): string;
    }, options?: IOptions): IMdconfMeta;
    function parse(data: string, options?: IOptions): IMdconfMeta;
    function chkInfo(ret: IMdconfMeta): IMdconfMeta;
}
export interface IMdconfMeta extends Mdconf.IMdconfMeta {
}
export declare const mdconf_parse: typeof self.Mdconf.parse;
import * as self from './index';
export default self;
