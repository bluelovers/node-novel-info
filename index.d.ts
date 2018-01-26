import * as mdconf from 'mdconf';
export interface IMdconfMeta {
    novel: {
        title: string;
        author: string;
        cover: string;
        preface: string;
        tags: string[];
        date: string;
        status: string;
        publisher?: string;
    };
    contribute: string[];
    options?: {
        textlayout?: {
            allow_lf2?: boolean;
        };
    };
}
export { mdconf };
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
