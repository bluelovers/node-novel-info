import { IMdconfMeta } from './index';
declare module JsonMd {
    interface IOptions {
        tags?: string[];
        contribute?: string[];
    }
    interface IJsonmdData_v1 extends IOptions {
        data?: {
            cover_pic?: string;
            desc?: string;
            author?: string;
            g_lnovel_name?: string;
            type?: string[];
        };
        novel_date?: any;
        novel_title?: string;
        novel_author?: string;
        url?: string;
        novel_publisher?: string;
        novel_cover?: string;
        novel_status?: string;
        novel_desc?: string;
        [key: string]: any;
    }
    function stringify(json_data: IJsonmdData_v1, options?: IMdconfMeta & IOptions): string;
    function stringify(json_data: IMdconfMeta, options?: IMdconfMeta & IOptions): string;
    function stringify(json_data: Partial<IJsonmdData_v1 & IMdconfMeta & IOptions>, options?: IMdconfMeta & IOptions): string;
    function toNovelInfo(initData: Partial<IMdconfMeta>, inputData: Partial<IJsonmdData_v1 & IMdconfMeta & IOptions>, ...argv: Partial<IJsonmdData_v1 & IMdconfMeta & IOptions>[]): IMdconfMeta;
}
export { JsonMd };
export default JsonMd;
