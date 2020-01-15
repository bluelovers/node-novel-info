/**
 * Created by user on 2020/1/16.
 */
import { IOptionsParse, IMdconfMeta } from './types';
export declare function getNovelTitleFromMeta(meta: IMdconfMeta): string[];
export declare function sortKeys<T extends IMdconfMeta>(ret: T): T;
export declare function chkInfo(ret: IMdconfMeta, options?: IOptionsParse): IMdconfMeta;
