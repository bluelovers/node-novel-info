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
    static createFromString(input: string | Buffer, options: INodeNovelInfoOptions, ...argv: any[]): NodeNovelInfo<IMdconfMeta>;
    titles(): string[];
    authors(): string[];
    illusts(): string[];
    tags(): string[];
    contributes(): string[];
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
