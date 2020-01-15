import { IOptionsParse as _IOptionsParse } from 'mdconf2';
import { EnumNovelStatus } from './const';
export declare type INumber = number | string;
export declare type IOptionsParse = _IOptionsParse & {
    chk?: boolean;
    throw?: boolean;
    /**
     * 清除還原用的資料類型
     */
    removeRawData?: boolean;
    /**
     * 允許殘缺不合法的 meta info
     */
    lowCheckLevel?: boolean;
};
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
        /**
         * 作者
         */
        author?: string;
        /**
         * 作者列表
         */
        authors?: string[];
        /**
         * 封面圖
         */
        cover?: string;
        /**
         * 繪師
         */
        illust?: string;
        /**
         * 繪師列表
         */
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
        /**
         * 發布或者來源網址
         */
        source?: string;
        /**
         * 發布或者來源網址列表
         */
        sources?: string[];
        /**
         * 發布網站名稱或者出版社名稱
         */
        publisher?: string;
        /**
         * 發布網站名稱或者出版社名稱列表
         */
        publishers?: string[];
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
        /**
         * 提供給打包與整理腳本使用的設定值
         */
        textlayout?: IMdconfMetaOptionsBase & {
            /**
             * 是否允許每一行之間有一個空行
             */
            allow_lf2?: boolean;
            /**
             * 是否允許每一行之間有兩個空行
             */
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
