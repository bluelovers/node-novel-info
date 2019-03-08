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
            novel.title_source,
            novel.title_jp,
            // @ts-ignore
            novel.title_ja,
            novel.title_cn,
            ...titles,
            novel.title,
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
     * 取得發布網站或者出版社列表
     */
    publishers() {
        return arr_filter([
            this.raw.novel && this.raw.novel.publisher,
        ].concat(this.raw.novel.publishers || []));
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBUWlCO0FBQ2pCLG1EQUFrQztBQUNsQywrQkFBa0U7QUFHbEUsOENBQStDO0FBSy9DLE1BQU0sY0FBYyxHQUFvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTFFLE1BQWEsYUFBYTtJQUl6QixZQUFZLE1BQVMsRUFBRSxVQUFpQyxjQUFjLEVBQUUsR0FBRyxJQUFJO1FBRTlFLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxHQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBd0IsTUFBUyxFQUFFLFVBQWlDLGNBQWMs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QixTQUFTLFVBQVUsQ0FBSSxHQUFRO0lBRTlCLE9BQU8sa0JBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFFbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUk7WUFDcEIsYUFBYTtlQUNWLENBQUMsSUFBSSxNQUFNO1lBQ2QsYUFBYTtlQUNWLENBQUMsSUFBSSxXQUFXLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsQ0FBUztJQUVqQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQyxLQUFLO1FBQ0wsU0FBUztRQUNULFdBQVc7UUFDWCxNQUFNO1FBQ04sRUFBRTtLQUNGLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzEvMjEvMDIxLlxuICovXG5pbXBvcnQge1xuXHRjaGtJbmZvLFxuXHRnZXROb3ZlbFRpdGxlRnJvbU1ldGEsXG5cdElNZGNvbmZNZXRhLFxuXHRJTWRjb25mTWV0YU9wdGlvbnNOb3ZlbFNpdGUsXG5cdElPcHRpb25zUGFyc2UsXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG59IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IGJpbmQgZnJvbSAnYmluZC1kZWNvcmF0b3InO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlLCBkZWVwbWVyZ2UsIGRlZXBtZXJnZU9wdGlvbnMgfSBmcm9tICcuL2xpYic7XG5pbXBvcnQgeyBFbnVtTm92ZWxTdGF0dXMgfSBmcm9tICcuL2xpYi9jb25zdCc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgY2xvbmVEZWVwID0gcmVxdWlyZSgnbG9kYXNoL2Nsb25lRGVlcCcpO1xuaW1wb3J0IHsgdG9IZXggfSBmcm9tICdoZXgtbGliJztcblxuZXhwb3J0IHR5cGUgSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gSU9wdGlvbnNQYXJzZSAmIHt9O1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogUmVhZG9ubHk8SU5vZGVOb3ZlbEluZm9PcHRpb25zPiA9IE9iamVjdC5mcmVlemUoe30pO1xuXG5leHBvcnQgY2xhc3MgTm9kZU5vdmVsSW5mbzxUIGV4dGVuZHMgSU1kY29uZk1ldGE+XG57XG5cdHJhdzogVDtcblxuXHRjb25zdHJ1Y3RvcihtZGNvbmY6IFQsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0b3B0aW9ucyA9IE5vZGVOb3ZlbEluZm8uZml4T3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdGxldCByZXQ6IFQgPSBjbG9uZURlZXAobWRjb25mKTtcblxuXHRcdGlmIChvcHRpb25zLmNoayB8fCBvcHRpb25zLmNoayA9PSBudWxsKVxuXHRcdHtcblx0XHRcdHJldCA9IGNoa0luZm8ocmV0LCBvcHRpb25zKSBhcyBUO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnRocm93IHx8IG9wdGlvbnMudGhyb3cgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRyZXQgPSBjaGtJbmZvKHJldCwgb3B0aW9ucykgYXMgVDtcblxuXHRcdFx0aWYgKCFyZXQpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IGEgdmFsaWQgTm92ZWxJbmZvIGRhdGEnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnJhdyA9IHJldDtcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBmaXhPcHRpb25zKG9wdGlvbnM/OiBJTm9kZU5vdmVsSW5mb09wdGlvbnMpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMgfHwge30pXG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgY3JlYXRlPFQgZXh0ZW5kcyBJTWRjb25mTWV0YT4obWRjb25mOiBULCBvcHRpb25zOiBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcyhtZGNvbmYsIG9wdGlvbnMsIC4uLmFyZ3YpXG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgY3JlYXRlRnJvbVN0cmluZyhpbnB1dDogc3RyaW5nIHwgQnVmZmVyLCBvcHRpb25zPzogSU5vZGVOb3ZlbEluZm9PcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0aWYgKHR5cGVvZiBpbnB1dCAhPSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnRvU3RyaW5nKCk7XG5cdFx0fVxuXG5cdFx0b3B0aW9ucyA9IHRoaXMuZml4T3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdGxldCBqc29uID0gcGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuY3JlYXRlKGpzb24sIG9wdGlvbnMsIC4uLmFyZ3YpO1xuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+Wwj+iqquaomemhjFxuXHQgKi9cblx0dGl0bGUoLi4udGl0bGVzOiBzdHJpbmdbXSk6IHN0cmluZ1xuXHR7XG5cdFx0bGV0IG5vdmVsID0gdGhpcy5yYXcubm92ZWw7XG5cblx0XHRsZXQgYXJyID0gW1xuXHRcdFx0bm92ZWwudGl0bGVfb3V0cHV0LFxuXHRcdFx0bm92ZWwudGl0bGVfemgsXG5cdFx0XHRub3ZlbC50aXRsZV9zaG9ydCxcblx0XHRcdG5vdmVsLnRpdGxlX3R3LFxuXHRcdFx0bm92ZWwudGl0bGVfc291cmNlLFxuXHRcdFx0bm92ZWwudGl0bGVfanAsXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRub3ZlbC50aXRsZV9qYSxcblx0XHRcdG5vdmVsLnRpdGxlX2NuLFxuXHRcdFx0Li4udGl0bGVzLFxuXHRcdFx0bm92ZWwudGl0bGUsXG5cdFx0XTtcblxuXHRcdGZvciAobGV0IHYgb2YgYXJyKVxuXHRcdHtcblx0XHRcdGlmIChjYl90aXRsZV9maWx0ZXIodikpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB2O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnRpdGxlcygpWzBdXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X5omA5pyJ5bCP6Kqq5qiZ6aGMXG5cdCAqL1xuXHR0aXRsZXMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBnZXROb3ZlbFRpdGxlRnJvbU1ldGEodGhpcy5yYXcpXG5cdFx0XHQuZmlsdGVyKGNiX3RpdGxlX2ZpbHRlcilcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfns7vliJflkI3nqLFcblx0ICovXG5cdHNlcmllc190aXRsZXMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcyAmJiB0aGlzLnJhdy5ub3ZlbC5zZXJpZXMubmFtZSxcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcyAmJiB0aGlzLnJhdy5ub3ZlbC5zZXJpZXMubmFtZV9zaG9ydCxcblx0XHRdLmNvbmNhdChbXSkpXG5cdFx0XHQuZmlsdGVyKGNiX3RpdGxlX2ZpbHRlcilcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfkvZzogIXliJfooahcblx0ICovXG5cdGF1dGhvcnMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLmF1dGhvcixcblx0XHRdLmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5hdXRob3JzIHx8IFtdKSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfnuarluKvliJfooahcblx0ICovXG5cdGlsbHVzdHMoKTogc3RyaW5nW11cblx0e1xuXHRcdGxldCBub3ZlbCA9IHRoaXMucmF3Lm5vdmVsO1xuXG5cdFx0bGV0IGFyciA9IGFycl9maWx0ZXIoW1xuXHRcdFx0J2lsbHVzdCcsXG5cdFx0XHQnaWxsdXN0cycsXG5cdFx0XVxuXHRcdFx0LmNvbmNhdChPYmplY3Qua2V5cyhub3ZlbCkpXG5cdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChhLCBrZXk6IHN0cmluZylcblx0XHRcdHtcblx0XHRcdFx0aWYgKGtleS5pbmRleE9mKCdpbGx1c3QnKSA9PT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGEucHVzaChrZXkpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0fSwgW10gYXMgc3RyaW5nW10pKVxuXHRcdFx0LnJlZHVjZShmdW5jdGlvbiAoYTogc3RyaW5nW10sIGtleTogc3RyaW5nKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgdiA9IG5vdmVsW2tleV07XG5cblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodikpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhLnB1c2goLi4udilcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhLnB1c2godilcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhXG5cdFx0XHR9LCBbXSkgYXMgc3RyaW5nW11cblx0XHQ7XG5cblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihhcnIpLmZpbHRlcihjYl90aXRsZV9maWx0ZXIpXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X5qiZ57Gk5YiX6KGoXG5cdCAqL1xuXHR0YWdzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcih0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC50YWdzIHx8IFtdKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+iyoueNu+iAhS/nv7vora/ogIXliJfooahcblx0ICovXG5cdGNvbnRyaWJ1dGVzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcih0aGlzLnJhdy5jb250cmlidXRlIHx8IFtdKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+eZvOW4g+e2suermeaIluiAheWHuueJiOekvuWIl+ihqFxuXHQgKi9cblx0cHVibGlzaGVycygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwucHVibGlzaGVyLFxuXHRcdF0uY29uY2F0KHRoaXMucmF3Lm5vdmVsLnB1Ymxpc2hlcnMgfHwgW10pKVxuXHR9XG5cblx0c2l0ZXMoKVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoT2JqZWN0LmVudHJpZXModGhpcy5yYXcub3B0aW9ucyB8fCB7fSlcblx0XHRcdC5yZWR1Y2UoZnVuY3Rpb24gKGxzLCBbc2l0ZSwgZGF0YV0pXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChkYXRhICYmICgnbm92ZWxfaWQnIGluIGRhdGEpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bHMucHVzaCh7XG5cdFx0XHRcdFx0XHRzaXRlLFxuXHRcdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxzO1xuXHRcdFx0fSwgW10gYXMge1xuXHRcdFx0XHRzaXRlOiBzdHJpbmcsXG5cdFx0XHRcdGRhdGE6IElNZGNvbmZNZXRhT3B0aW9uc05vdmVsU2l0ZSxcblx0XHRcdH1bXSkpO1xuXHR9XG5cblx0c3RhdHVzKCk6IEVudW1Ob3ZlbFN0YXR1cyB8IG51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLm5vdmVsX3N0YXR1cylcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5yYXcubm92ZWwubm92ZWxfc3RhdHVzXG5cdFx0fVxuXHR9XG5cblx0dG9KU09OPFI+KGNsb25lPzogYm9vbGVhbik6IFJcblx0dG9KU09OKGNsb25lPzogYm9vbGVhbik6IFRcblx0dG9KU09OKGNsb25lPzogYm9vbGVhbik6IFRcblx0e1xuXHRcdGlmIChjbG9uZSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2xvbmVEZWVwKHRoaXMucmF3KTtcblx0XHR9XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmV0dXJuIHRoaXMucmF3O1xuXHR9XG5cblx0c3RyaW5naWZ5KClcblx0e1xuXHRcdHJldHVybiBzdHJpbmdpZnkodGhpcy5yYXcpXG5cdH1cblxuXHRzdGF0aWMgcGFyc2UgPSBwYXJzZTtcblx0c3RhdGljIHN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTm9kZU5vdmVsSW5mb1xuXG5mdW5jdGlvbiBhcnJfZmlsdGVyPFQ+KGFycjogVFtdKVxue1xuXHRyZXR1cm4gYXJyYXlfdW5pcXVlKGFycikuZmlsdGVyKHYgPT5cblx0e1xuXHRcdHJldHVybiB2ICYmIHYgIT0gbnVsbFxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0JiYgdiAhPSAnbnVsbCdcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdCYmIHYgIT0gJ3VuZGVmaW5lZCdcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGNiX3RpdGxlX2ZpbHRlcih2OiBzdHJpbmcpXG57XG5cdHJldHVybiB0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdiAmJiAhW1xuXHRcdCfpgKPovInkuK0nLFxuXHRcdCfplbfnt6gg44CQ6YCj6LyJ44CRJyxcblx0XHQndW5kZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0JycsXG5cdF0uaW5jbHVkZXModi50cmltKCkpXG59XG4iXX0=