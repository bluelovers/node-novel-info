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
        /**
         * 原始標題
         */
        title_source?: string;
        /**
         * 簡短標題
         * 如果 title_output 不存在 這個則會作為輸出 epub 的檔名備選之一
         */
        title_short?: string;
        /**
         * 輸出 epub 的檔名
         */
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
        /**
         * 封面圖
         */
        cover?: string;
        /**
         * 繪師
         */
        illust?: string;
        illusts?: string[];
        /**
         * 簡介
         */
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
        /**
         * 小說狀態 flag
         */
        novel_status?: EnumNovelStatus | number;
    };
    /**
     * 翻譯 校對 整合 ...等 貢獻者 或 其他
     */
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
        /**
         * novel-downloader
         */
        downloadOptions?: IMdconfMetaOptionsBase & {
            noFirePrefix?: boolean;
            noFilePadend?: boolean;
            filePrefixMode?: number;
            startIndex?: number;
        };
    };
    link?: string[];
}
export declare type IOptionsParse = mdconf.IOptionsParse & {
    chk?: boolean;
    throw?: boolean;
    removeRawData?: boolean;
    /**
     * 允許殘缺不合法的 meta info
     */
    lowCheckLevel?: boolean;
};
export declare const defaultOptionsParse: IOptionsParse;
export declare function stringify(data: any, d2?: any, ...argv: any[]): string;
export declare function parse<T = IMdconfMeta>(data: {
    toString(): string;
}, options?: IOptionsParse): T;
export declare function parse<T = IMdconfMeta>(data: string, options?: IOptionsParse): T;
export declare function sortKeys(ret: IMdconfMeta): IMdconfMeta;
export declare function chkInfo(ret: IMdconfMeta, options?: IOptionsParse): IMdconfMeta;
export declare function getNovelTitleFromMeta(meta: IMdconfMeta): string[];
export declare const version: string;
export declare const mdconf_parse: typeof parse;
declare const _default: typeof import(".");
export default _default;
