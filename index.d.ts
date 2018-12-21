/**
 * Created by user on 2018/1/27/027.
 */
import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmerge, deepmergeOptions } from './lib';
import { envVal, envBool } from 'env-bool';
export { mdconf, array_unique, crlf, LF };
export { deepmerge, deepmergeOptions };
export { envVal, envBool };
export declare type INumber = number | string;
export interface IMdconfMetaOptionsNovelSite {
    novel_id?: INumber;
    url?: string;
    [key: string]: any;
}
export interface IMdconfMeta {
    novel?: {
        title?: string;
        title_source?: string;
        title_short?: string;
        title_output?: string;
        title_zh?: string;
        title_cn?: string;
        title_tw?: string;
        title_en?: string;
        title_jp?: string;
        author?: string;
        authors?: string[];
        cover?: string;
        illust?: string[];
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
        sources?: string[];
        publisher?: string;
    };
    contribute?: string[];
    options?: {
        dmzj?: IMdconfMetaOptionsNovelSite;
        kakuyomu?: IMdconfMetaOptionsNovelSite;
        wenku8?: IMdconfMetaOptionsNovelSite;
        webqxs?: IMdconfMetaOptionsNovelSite;
        syosetu?: IMdconfMetaOptionsNovelSite & {
            txtdownload_id: INumber;
        };
        novel?: {
            pattern?: string;
            [key: string]: any;
        };
        textlayout?: {
            allow_lf2?: boolean;
            [key: string]: any;
        };
        [key: string]: any;
    };
    link?: string[];
}
export interface IOptionsParse extends mdconf.IOptionsParse {
    chk?: boolean;
    throw?: boolean;
    removeRawData?: boolean;
    /**
     * 允許殘缺不合法的 meta info
     */
    lowCheckLevel?: boolean;
}
export declare const defaultOptionsParse: IOptionsParse;
export declare function stringify(data: any, d2?: any, ...argv: any[]): string;
export declare function parse(data: {
    toString(): string;
}, options?: IOptionsParse): IMdconfMeta;
export declare function parse(data: string, options?: IOptionsParse): IMdconfMeta;
export declare function sortKeys(ret: IMdconfMeta): IMdconfMeta;
export declare function chkInfo(ret: IMdconfMeta, options?: IOptionsParse): IMdconfMeta;
export declare const version: string;
import * as self from './index';
export import mdconf_parse = self.parse;
export default self;
