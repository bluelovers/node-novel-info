"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/1/21/021.
 */
const index_1 = require("./index");
const bind_decorator_1 = require("bind-decorator");
const lib_1 = require("./lib");
const cloneDeep = require("lodash/cloneDeep");
const defaultOptions = Object.freeze({});
class NodeNovelInfo {
    constructor(mdconf, options = defaultOptions, ...argv) {
        options = NodeNovelInfo.fixOptions(options);
        let ret = cloneDeep(mdconf);
        if (options.chk || options.chk == null) {
            ret = index_1.chkInfo(ret, options);
        }
        if (options.throw || options.throw == null) {
            ret = index_1.chkInfo(ret, options);
            if (!ret) {
                throw new Error('not a valid NovelInfo data');
            }
        }
        this.raw = ret;
    }
    static fixOptions(options) {
        return Object.assign({}, defaultOptions, options || {});
    }
    static create(mdconf, options = defaultOptions, ...argv) {
        return new this(mdconf, options, ...argv);
    }
    static createFromString(input, options, ...argv) {
        if (typeof input != 'string') {
            input = input.toString();
        }
        options = this.fixOptions(options);
        let json = index_1.parse(input, options);
        return this.create(json, options, ...argv);
    }
    _pathMain_base() {
        let is_out = null;
        let pathMain_base = undefined;
        if (this.pathMain != null) {
            let _m = this.pathMain.match(/^(.+?)(_out)?$/);
            is_out = !!_m[2];
            pathMain_base = _m[1];
        }
        return {
            is_out,
            pathMain_base,
        };
    }
    get is_out() {
        return this._pathMain_base().is_out;
    }
    get pathMain_base() {
        return this._pathMain_base().pathMain_base;
    }
    /**
     * 取得小說標題
     */
    title(...titles) {
        let novel = this.raw.novel;
        let arr = [
            novel.title_output,
            novel.title_zh,
            novel.title_short,
            novel.title_tw,
            ...titles,
            novel.title,
            novel.title_source,
            novel.title_jp,
            // @ts-ignore
            novel.title_ja,
            novel.title_cn,
        ];
        for (let v of arr) {
            if (cb_title_filter(v)) {
                return v;
            }
        }
        return this.titles()[0];
    }
    /**
     * 取得所有小說標題
     */
    titles() {
        return index_1.getNovelTitleFromMeta(this.raw)
            .filter(cb_title_filter);
    }
    /**
     * 取得系列名稱
     */
    series_titles() {
        return arr_filter([
            this.raw.novel && this.raw.novel.series && this.raw.novel.series.name,
            this.raw.novel && this.raw.novel.series && this.raw.novel.series.name_short,
        ].concat([]))
            .filter(cb_title_filter);
    }
    /**
     * 取得作者列表
     */
    authors() {
        return arr_filter([
            this.raw.novel && this.raw.novel.author,
        ].concat(this.raw.novel.authors || []));
    }
    /**
     * 取得繪師列表
     */
    illusts() {
        let novel = this.raw.novel;
        let arr = arr_filter([
            'illust',
            'illusts',
        ]
            .concat(Object.keys(novel))
            .reduce(function (a, key) {
            if (key.indexOf('illust') === 0) {
                a.push(key);
            }
            return a;
        }, []))
            .reduce(function (a, key) {
            let v = novel[key];
            if (Array.isArray(v)) {
                a.push(...v);
            }
            else {
                a.push(v);
            }
            return a;
        }, []);
        return arr_filter(arr).filter(cb_title_filter);
    }
    /**
     * 取得標籤列表
     */
    tags() {
        return arr_filter(this.raw.novel && this.raw.novel.tags || []);
    }
    /**
     * 取得貢獻者/翻譯者列表
     */
    contributes() {
        return arr_filter(this.raw.contribute || []);
    }
    /**
     * 取得發布網站名稱或者出版社名稱列表
     */
    publishers() {
        return arr_filter([
            this.raw.novel && this.raw.novel.publisher,
        ].concat(this.raw.novel.publishers || []));
    }
    /**
     * 取得發布或者來源網址
     */
    sources() {
        return arr_filter(lib_1.filterByPrefixReturnValues(/^source(?:_.+)?$/, this.raw.novel)
            .concat(this.raw.novel.sources || []));
    }
    /**
     * 小說來源的網站資料(請查閱 novel-downloader)
     */
    sites() {
        return arr_filter(Object.entries(this.raw.options || {})
            .reduce(function (ls, [site, data]) {
            if (data && ('novel_id' in data)) {
                ls.push({
                    site,
                    data,
                });
            }
            return ls;
        }, []));
    }
    /**
     * 取得小說狀態
     */
    status() {
        if (this.raw.novel && this.raw.novel.novel_status) {
            return this.raw.novel.novel_status;
        }
    }
    toJSON(clone) {
        if (clone) {
            return cloneDeep(this.raw);
        }
        // @ts-ignore
        return this.raw;
    }
    stringify() {
        return index_1.stringify(this.raw);
    }
}
NodeNovelInfo.parse = index_1.parse;
NodeNovelInfo.stringify = index_1.stringify;
__decorate([
    bind_decorator_1.default
], NodeNovelInfo, "fixOptions", null);
__decorate([
    bind_decorator_1.default
], NodeNovelInfo, "create", null);
__decorate([
    bind_decorator_1.default
], NodeNovelInfo, "createFromString", null);
exports.NodeNovelInfo = NodeNovelInfo;
exports.default = NodeNovelInfo;
function arr_filter(arr) {
    return lib_1.array_unique(arr).filter(v => {
        return v && v != null
            // @ts-ignore
            && v != 'null'
            // @ts-ignore
            && v != 'undefined';
    });
}
function cb_title_filter(v) {
    return typeof v === 'string' && v && ![
        '連載中',
        '長編 【連載】',
        'undefined',
        'null',
        '',
    ].includes(v.trim());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBUWlCO0FBQ2pCLG1EQUFrQztBQUNsQywrQkFBOEc7QUFHOUcsOENBQStDO0FBSy9DLE1BQU0sY0FBYyxHQUFvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTFFLE1BQWEsYUFBYTtJQU96QixZQUFZLE1BQVMsRUFBRSxVQUFpQyxjQUFjLEVBQUUsR0FBRyxJQUFJO1FBRTlFLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxHQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBd0IsTUFBUyxFQUFFLFVBQWlDLGNBQWMs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QVMsZUFBZSxDQUFDLENBQVM7SUFFakMsT0FBTyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckMsS0FBSztRQUNMLFNBQVM7UUFDVCxXQUFXO1FBQ1gsTUFBTTtRQUNOLEVBQUU7S0FDRixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS8xLzIxLzAyMS5cbiAqL1xuaW1wb3J0IHtcblx0Y2hrSW5mbyxcblx0Z2V0Tm92ZWxUaXRsZUZyb21NZXRhLFxuXHRJTWRjb25mTWV0YSxcblx0SU1kY29uZk1ldGFPcHRpb25zTm92ZWxTaXRlLFxuXHRJT3B0aW9uc1BhcnNlLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxufSBmcm9tICcuL2luZGV4JztcbmltcG9ydCBiaW5kIGZyb20gJ2JpbmQtZGVjb3JhdG9yJztcbmltcG9ydCB7IGFycmF5X3VuaXF1ZSwgZGVlcG1lcmdlLCBkZWVwbWVyZ2VPcHRpb25zLCBmaWx0ZXJCeVByZWZpeCwgZmlsdGVyQnlQcmVmaXhSZXR1cm5WYWx1ZXMgfSBmcm9tICcuL2xpYic7XG5pbXBvcnQgeyBFbnVtTm92ZWxTdGF0dXMgfSBmcm9tICcuL2xpYi9jb25zdCc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgY2xvbmVEZWVwID0gcmVxdWlyZSgnbG9kYXNoL2Nsb25lRGVlcCcpO1xuaW1wb3J0IHsgdG9IZXggfSBmcm9tICdoZXgtbGliJztcblxuZXhwb3J0IHR5cGUgSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gSU9wdGlvbnNQYXJzZSAmIHt9O1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogUmVhZG9ubHk8SU5vZGVOb3ZlbEluZm9PcHRpb25zPiA9IE9iamVjdC5mcmVlemUoe30pO1xuXG5leHBvcnQgY2xhc3MgTm9kZU5vdmVsSW5mbzxUIGV4dGVuZHMgSU1kY29uZk1ldGE+XG57XG5cdHJhdzogVDtcblxuXHRwYXRoTWFpbj86IHN0cmluZztcblx0bm92ZWxJRD86IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcihtZGNvbmY6IFQsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0b3B0aW9ucyA9IE5vZGVOb3ZlbEluZm8uZml4T3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdGxldCByZXQ6IFQgPSBjbG9uZURlZXAobWRjb25mKTtcblxuXHRcdGlmIChvcHRpb25zLmNoayB8fCBvcHRpb25zLmNoayA9PSBudWxsKVxuXHRcdHtcblx0XHRcdHJldCA9IGNoa0luZm8ocmV0LCBvcHRpb25zKSBhcyBUO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnRocm93IHx8IG9wdGlvbnMudGhyb3cgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRyZXQgPSBjaGtJbmZvKHJldCwgb3B0aW9ucykgYXMgVDtcblxuXHRcdFx0aWYgKCFyZXQpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IGEgdmFsaWQgTm92ZWxJbmZvIGRhdGEnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnJhdyA9IHJldDtcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBmaXhPcHRpb25zKG9wdGlvbnM/OiBJTm9kZU5vdmVsSW5mb09wdGlvbnMpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMgfHwge30pXG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgY3JlYXRlPFQgZXh0ZW5kcyBJTWRjb25mTWV0YT4obWRjb25mOiBULCBvcHRpb25zOiBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcyhtZGNvbmYsIG9wdGlvbnMsIC4uLmFyZ3YpXG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgY3JlYXRlRnJvbVN0cmluZyhpbnB1dDogc3RyaW5nIHwgQnVmZmVyLCBvcHRpb25zPzogSU5vZGVOb3ZlbEluZm9PcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0aWYgKHR5cGVvZiBpbnB1dCAhPSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnRvU3RyaW5nKCk7XG5cdFx0fVxuXG5cdFx0b3B0aW9ucyA9IHRoaXMuZml4T3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdGxldCBqc29uID0gcGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuY3JlYXRlKGpzb24sIG9wdGlvbnMsIC4uLmFyZ3YpO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9wYXRoTWFpbl9iYXNlKClcblx0e1xuXHRcdGxldCBpc19vdXQ6IGJvb2xlYW4gPSBudWxsO1xuXHRcdGxldCBwYXRoTWFpbl9iYXNlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cblx0XHRpZiAodGhpcy5wYXRoTWFpbiAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGxldCBfbSA9IHRoaXMucGF0aE1haW4ubWF0Y2goL14oLis/KShfb3V0KT8kLyk7XG5cblx0XHRcdGlzX291dCA9ICEhX21bMl07XG5cdFx0XHRwYXRoTWFpbl9iYXNlID0gX21bMV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGlzX291dCxcblx0XHRcdHBhdGhNYWluX2Jhc2UsXG5cdFx0fVxuXHR9XG5cblx0Z2V0IGlzX291dCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGF0aE1haW5fYmFzZSgpLmlzX291dDtcblx0fVxuXG5cdGdldCBwYXRoTWFpbl9iYXNlKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXRoTWFpbl9iYXNlKCkucGF0aE1haW5fYmFzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpflsI/oqqrmqJnpoYxcblx0ICovXG5cdHRpdGxlKC4uLnRpdGxlczogc3RyaW5nW10pOiBzdHJpbmdcblx0e1xuXHRcdGxldCBub3ZlbCA9IHRoaXMucmF3Lm5vdmVsO1xuXG5cdFx0bGV0IGFyciA9IFtcblx0XHRcdG5vdmVsLnRpdGxlX291dHB1dCxcblx0XHRcdG5vdmVsLnRpdGxlX3poLFxuXHRcdFx0bm92ZWwudGl0bGVfc2hvcnQsXG5cdFx0XHRub3ZlbC50aXRsZV90dyxcblxuXHRcdFx0Li4udGl0bGVzLFxuXHRcdFx0bm92ZWwudGl0bGUsXG5cblx0XHRcdG5vdmVsLnRpdGxlX3NvdXJjZSxcblxuXHRcdFx0bm92ZWwudGl0bGVfanAsXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRub3ZlbC50aXRsZV9qYSxcblx0XHRcdG5vdmVsLnRpdGxlX2NuLFxuXHRcdF07XG5cblx0XHRmb3IgKGxldCB2IG9mIGFycilcblx0XHR7XG5cdFx0XHRpZiAoY2JfdGl0bGVfZmlsdGVyKHYpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gdjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy50aXRsZXMoKVswXVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+aJgOacieWwj+iqquaomemhjFxuXHQgKi9cblx0dGl0bGVzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gZ2V0Tm92ZWxUaXRsZUZyb21NZXRhKHRoaXMucmF3KVxuXHRcdFx0LmZpbHRlcihjYl90aXRsZV9maWx0ZXIpXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X57O75YiX5ZCN56ixXG5cdCAqL1xuXHRzZXJpZXNfdGl0bGVzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihbXG5cdFx0XHR0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5zZXJpZXMgJiYgdGhpcy5yYXcubm92ZWwuc2VyaWVzLm5hbWUsXG5cdFx0XHR0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5zZXJpZXMgJiYgdGhpcy5yYXcubm92ZWwuc2VyaWVzLm5hbWVfc2hvcnQsXG5cdFx0XS5jb25jYXQoW10pKVxuXHRcdFx0LmZpbHRlcihjYl90aXRsZV9maWx0ZXIpXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X5L2c6ICF5YiX6KGoXG5cdCAqL1xuXHRhdXRob3JzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihbXG5cdFx0XHR0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5hdXRob3IsXG5cdFx0XS5jb25jYXQodGhpcy5yYXcubm92ZWwuYXV0aG9ycyB8fCBbXSkpXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X57mq5bir5YiX6KGoXG5cdCAqL1xuXHRpbGx1c3RzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRsZXQgbm92ZWwgPSB0aGlzLnJhdy5ub3ZlbDtcblxuXHRcdGxldCBhcnIgPSBhcnJfZmlsdGVyKFtcblx0XHRcdCdpbGx1c3QnLFxuXHRcdFx0J2lsbHVzdHMnLFxuXHRcdF1cblx0XHRcdC5jb25jYXQoT2JqZWN0LmtleXMobm92ZWwpKVxuXHRcdFx0LnJlZHVjZShmdW5jdGlvbiAoYSwga2V5OiBzdHJpbmcpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChrZXkuaW5kZXhPZignaWxsdXN0JykgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhLnB1c2goa2V5KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdH0sIFtdIGFzIHN0cmluZ1tdKSlcblx0XHRcdC5yZWR1Y2UoZnVuY3Rpb24gKGE6IHN0cmluZ1tdLCBrZXk6IHN0cmluZylcblx0XHRcdHtcblx0XHRcdFx0bGV0IHYgPSBub3ZlbFtrZXldO1xuXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHYpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YS5wdXNoKC4uLnYpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YS5wdXNoKHYpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0fSwgW10pIGFzIHN0cmluZ1tdXG5cdFx0O1xuXG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoYXJyKS5maWx0ZXIoY2JfdGl0bGVfZmlsdGVyKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+aomeexpOWIl+ihqFxuXHQgKi9cblx0dGFncygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIodGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwudGFncyB8fCBbXSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfosqLnjbvogIUv57+76K2v6ICF5YiX6KGoXG5cdCAqL1xuXHRjb250cmlidXRlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIodGhpcy5yYXcuY29udHJpYnV0ZSB8fCBbXSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfnmbzluIPntrLnq5nlkI3nqLHmiJbogIXlh7rniYjnpL7lkI3nqLHliJfooahcblx0ICovXG5cdHB1Ymxpc2hlcnMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnB1Ymxpc2hlcixcblx0XHRdLmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5wdWJsaXNoZXJzIHx8IFtdKSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfnmbzluIPmiJbogIXkvobmupDntrLlnYBcblx0ICovXG5cdHNvdXJjZXMoKVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoZmlsdGVyQnlQcmVmaXhSZXR1cm5WYWx1ZXM8c3RyaW5nPigvXnNvdXJjZSg/Ol8uKyk/JC8sIHRoaXMucmF3Lm5vdmVsKVxuXHRcdFx0LmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5zb3VyY2VzIHx8IFtdKSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlsI/oqqrkvobmupDnmoTntrLnq5nos4fmlpko6KuL5p+l6ZaxIG5vdmVsLWRvd25sb2FkZXIpXG5cdCAqL1xuXHRzaXRlcygpXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihPYmplY3QuZW50cmllcyh0aGlzLnJhdy5vcHRpb25zIHx8IHt9KVxuXHRcdFx0LnJlZHVjZShmdW5jdGlvbiAobHMsIFtzaXRlLCBkYXRhXSlcblx0XHRcdHtcblx0XHRcdFx0aWYgKGRhdGEgJiYgKCdub3ZlbF9pZCcgaW4gZGF0YSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRscy5wdXNoKHtcblx0XHRcdFx0XHRcdHNpdGUsXG5cdFx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbHM7XG5cdFx0XHR9LCBbXSBhcyB7XG5cdFx0XHRcdHNpdGU6IHN0cmluZyxcblx0XHRcdFx0ZGF0YTogSU1kY29uZk1ldGFPcHRpb25zTm92ZWxTaXRlLFxuXHRcdFx0fVtdKSk7XG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X5bCP6Kqq54uA5oWLXG5cdCAqL1xuXHRzdGF0dXMoKTogRW51bU5vdmVsU3RhdHVzIHwgbnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwubm92ZWxfc3RhdHVzKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLnJhdy5ub3ZlbC5ub3ZlbF9zdGF0dXNcblx0XHR9XG5cdH1cblxuXHR0b0pTT048Uj4oY2xvbmU/OiBib29sZWFuKTogUlxuXHR0b0pTT04oY2xvbmU/OiBib29sZWFuKTogVFxuXHR0b0pTT04oY2xvbmU/OiBib29sZWFuKTogVFxuXHR7XG5cdFx0aWYgKGNsb25lKVxuXHRcdHtcblx0XHRcdHJldHVybiBjbG9uZURlZXAodGhpcy5yYXcpO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gdGhpcy5yYXc7XG5cdH1cblxuXHRzdHJpbmdpZnkoKVxuXHR7XG5cdFx0cmV0dXJuIHN0cmluZ2lmeSh0aGlzLnJhdylcblx0fVxuXG5cdHN0YXRpYyBwYXJzZSA9IHBhcnNlO1xuXHRzdGF0aWMgc3RyaW5naWZ5ID0gc3RyaW5naWZ5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlTm92ZWxJbmZvXG5cbmZ1bmN0aW9uIGFycl9maWx0ZXI8VD4oYXJyOiBUW10pXG57XG5cdHJldHVybiBhcnJheV91bmlxdWUoYXJyKS5maWx0ZXIodiA9PlxuXHR7XG5cdFx0cmV0dXJuIHYgJiYgdiAhPSBudWxsXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHQmJiB2ICE9ICdudWxsJ1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0JiYgdiAhPSAndW5kZWZpbmVkJ1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gY2JfdGl0bGVfZmlsdGVyKHY6IHN0cmluZylcbntcblx0cmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2ICYmICFbXG5cdFx0J+mAo+i8ieS4rScsXG5cdFx0J+mVt+e3qCDjgJDpgKPovInjgJEnLFxuXHRcdCd1bmRlZmluZWQnLFxuXHRcdCdudWxsJyxcblx0XHQnJyxcblx0XS5pbmNsdWRlcyh2LnRyaW0oKSlcbn1cbiJdfQ==