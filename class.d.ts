/// <reference types="node" />
/**
 * Created by user on 2019/1/21/021.
 */
import { IMdconfMeta, IMdconfMetaOptionsNovelSite, IOptionsParse, parse, stringify } from './index';
import { EnumNovelStatus } from './lib/const';
export declare type INodeNovelInfoOptions = IOptionsParse & {};
export declare class NodeNovelInfo<T extends IMdconfMeta> {
    raw: T;
    constructor(mdconf: T, options?: INodeNovelInfoOptions, ...argv: any[]);
    static fixOptions(options?: INodeNovelInfoOptions): Readonly<IOptionsParse> & import("mdconf2").IOptionsParse & {
        chk?: boolean;
        throw?: boolean;
        removeRawData?: boolean;
        lowCheckLevel?: boolean;
    };
    static create<T extends IMdconfMeta>(mdconf: T, options?: INodeNovelInfoOptions, ...argv: any[]): NodeNovelInfo<T>;
    static createFromString(input: string | Buffer, options?: INodeNovelInfoOptions, ...argv: any[]): NodeNovelInfo<IMdconfMeta>;
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
     * 取得發布網站或者出版社列表
     */
    publishers(): string[];
    sites(): {
        site: string;
        data: IMdconfMetaOptionsNovelSite;
    }[];
    status(): EnumNovelStatus | number;
    toJSON<R>(clone?: boolean): R;
    toJSON(clone?: boolean): T;
    stringify(): string;
    static parse: typeof parse;
    static stringify: typeof stringify;
}
export default NodeNovelInfo;
