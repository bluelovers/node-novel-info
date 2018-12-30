/**
 * Created by user on 2018/1/27/027.
 */
import { EnumNovelStatus } from './lib/const';
import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmerge, deepmergeOptions } from './lib';
import { envVal, envBool } from 'env-bool';
export { mdconf, array_unique, crlf, LF };
export { deepmerge, deepmergeOptions };
export { envVal, envBool };
export declare type INumber = number | string;
export interface IMdconfMetaOptionsBase<T = any> {
    [key: string]: T;
}
export interface IMdconfMetaOptionsNovelSite extends IMdconfMetaOptionsBase {
    novel_id?: INumber;
    url?: string;
}
export interface IMdconfMeta {
    novel?: {
        title?: string;
        title_source?: string;
        title_short?: string;
        title_output?: string;
        title_other?: string;
        title_zh1?: string;
        title_zh2?: string;
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
        novel_status?: EnumNovelStatus;
    };
    contribute?: string[];
    options?: IMdconfMetaOptionsBase & {
        dmzj?: IMdconfMetaOptionsNovelSite;
        kakuyomu?: IMdconfMetaOptionsNovelSite;
        wenku8?: IMdconfMetaOptionsNovelSite;
        webqxs?: IMdconfMetaOptionsNovelSite;
        syosetu?: IMdconfMetaOptionsNovelSite & {
            txtdownload_id: INumber;
        };
        novel?: IMdconfMetaOptionsBase & {
            pattern?: string;
        };
        textlayout?: IMdconfMetaOptionsBase & {
            allow_lf2?: boolean;
            allow_lf3?: boolean;
        };
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
export declare function getNovelTitleFromMeta(meta: IMdconfMeta): string[];
export declare const version: string;
import * as self from './index';
export import mdconf_parse = self.parse;
export default self;
