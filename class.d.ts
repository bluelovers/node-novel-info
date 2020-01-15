/// <reference types="node" />
/**
 * Created by user on 2019/1/21/021.
 */
import { parse, stringify } from './index';
import { EnumNovelStatus } from './lib/const';
import { IOptionsParse, IMdconfMeta, IMdconfMetaOptionsNovelSite } from './lib/types';
export declare type INodeNovelInfoOptions = IOptionsParse & {};
export declare class NodeNovelInfo<T extends IMdconfMeta> {
    raw: T;
    pathMain?: string;
    novelID?: string;
    constructor(mdconf: T, options?: INodeNovelInfoOptions, ...argv: any[]);
    static fixOptions(options?: INodeNovelInfoOptions): Readonly<IOptionsParse> & import("mdconf2").IOptionsParse & {
        chk?: boolean;
        throw?: boolean;
        removeRawData?: boolean;
        lowCheckLevel?: boolean;
    };
    static create<T extends IMdconfMeta>(mdconf: T, options?: INodeNovelInfoOptions, ...argv: any[]): NodeNovelInfo<T>;
    static createFromString(input: string | Buffer, options?: INodeNovelInfoOptions, ...argv: any[]): NodeNovelInfo<IMdconfMeta>;
    protected _pathMain_base(): {
        is_out: boolean;
        pathMain_base: string;
    };
    get is_out(): boolean;
    get pathMain_base(): string;
    /**
     * 取得小說標題
     */
    title(...titles: string[]): string;
    /**
     * 取得所有小說標題
     */
    titles(): string[];
    /**
     * 取得系列名稱
     */
    series_titles(): string[];
    /**
     * 取得作者列表
     */
    authors(): string[];
    /**
     * 取得繪師列表
     */
    illusts(): string[];
    /**
     * 取得標籤列表
     */
    tags(): string[];
    /**
     * 取得貢獻者/翻譯者列表
     */
    contributes(): string[];
    /**
     * 取得發布網站名稱或者出版社名稱列表
     */
    publishers(): string[];
    /**
     * 取得發布或者來源網址
     */
    sources(): string[];
    /**
     * 小說來源的網站資料(請查閱 novel-downloader)
     */
    sites(): {
        site: string;
        data: IMdconfMetaOptionsNovelSite;
    }[];
    /**
     * 取得小說狀態
     */
    status(): EnumNovelStatus | number;
    toJSON<R>(clone?: boolean): R;
    toJSON(clone?: boolean): T;
    stringify(): string;
    static parse: typeof parse;
    static stringify: typeof stringify;
}
export default NodeNovelInfo;
