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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBUWlCO0FBQ2pCLG1EQUFrQztBQUNsQywrQkFBa0U7QUFHbEUsOENBQStDO0FBSy9DLE1BQU0sY0FBYyxHQUFvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTFFLE1BQWEsYUFBYTtJQUl6QixZQUFZLE1BQVMsRUFBRSxVQUFpQyxjQUFjLEVBQUUsR0FBRyxJQUFJO1FBRTlFLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxHQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBd0IsTUFBUyxFQUFFLFVBQWlDLGNBQWMs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UTtJQUU5QixPQUFPLGtCQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBRW5DLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJO1lBQ3BCLGFBQWE7ZUFDVixDQUFDLElBQUksTUFBTTtZQUNkLGFBQWE7ZUFDVixDQUFDLElBQUksV0FBVyxDQUFBO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLENBQVM7SUFFakMsT0FBTyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckMsS0FBSztRQUNMLFNBQVM7UUFDVCxXQUFXO1FBQ1gsTUFBTTtRQUNOLEVBQUU7S0FDRixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS8xLzIxLzAyMS5cbiAqL1xuaW1wb3J0IHtcblx0Y2hrSW5mbyxcblx0Z2V0Tm92ZWxUaXRsZUZyb21NZXRhLFxuXHRJTWRjb25mTWV0YSxcblx0SU1kY29uZk1ldGFPcHRpb25zTm92ZWxTaXRlLFxuXHRJT3B0aW9uc1BhcnNlLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxufSBmcm9tICcuL2luZGV4JztcbmltcG9ydCBiaW5kIGZyb20gJ2JpbmQtZGVjb3JhdG9yJztcbmltcG9ydCB7IGFycmF5X3VuaXF1ZSwgZGVlcG1lcmdlLCBkZWVwbWVyZ2VPcHRpb25zIH0gZnJvbSAnLi9saWInO1xuaW1wb3J0IHsgRW51bU5vdmVsU3RhdHVzIH0gZnJvbSAnLi9saWIvY29uc3QnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IGNsb25lRGVlcCA9IHJlcXVpcmUoJ2xvZGFzaC9jbG9uZURlZXAnKTtcbmltcG9ydCB7IHRvSGV4IH0gZnJvbSAnaGV4LWxpYic7XG5cbmV4cG9ydCB0eXBlIElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IElPcHRpb25zUGFyc2UgJiB7fTtcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IFJlYWRvbmx5PElOb2RlTm92ZWxJbmZvT3B0aW9ucz4gPSBPYmplY3QuZnJlZXplKHt9KTtcblxuZXhwb3J0IGNsYXNzIE5vZGVOb3ZlbEluZm88VCBleHRlbmRzIElNZGNvbmZNZXRhPlxue1xuXHRyYXc6IFQ7XG5cblx0Y29uc3RydWN0b3IobWRjb25mOiBULCBvcHRpb25zOiBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdG9wdGlvbnMgPSBOb2RlTm92ZWxJbmZvLmZpeE9wdGlvbnMob3B0aW9ucyk7XG5cblx0XHRsZXQgcmV0OiBUID0gY2xvbmVEZWVwKG1kY29uZik7XG5cblx0XHRpZiAob3B0aW9ucy5jaGsgfHwgb3B0aW9ucy5jaGsgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRyZXQgPSBjaGtJbmZvKHJldCwgb3B0aW9ucykgYXMgVDtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy50aHJvdyB8fCBvcHRpb25zLnRocm93ID09IG51bGwpXG5cdFx0e1xuXHRcdFx0cmV0ID0gY2hrSW5mbyhyZXQsIG9wdGlvbnMpIGFzIFQ7XG5cblx0XHRcdGlmICghcmV0KVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHZhbGlkIE5vdmVsSW5mbyBkYXRhJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5yYXcgPSByZXQ7XG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgZml4T3B0aW9ucyhvcHRpb25zPzogSU5vZGVOb3ZlbEluZm9PcHRpb25zKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zIHx8IHt9KVxuXHR9XG5cblx0QGJpbmRcblx0c3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgSU1kY29uZk1ldGE+KG1kY29uZjogVCwgb3B0aW9uczogSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gZGVmYXVsdE9wdGlvbnMsIC4uLmFyZ3YpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMobWRjb25mLCBvcHRpb25zLCAuLi5hcmd2KVxuXHR9XG5cblx0QGJpbmRcblx0c3RhdGljIGNyZWF0ZUZyb21TdHJpbmcoaW5wdXQ6IHN0cmluZyB8IEJ1ZmZlciwgb3B0aW9ucz86IElOb2RlTm92ZWxJbmZvT3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdGlmICh0eXBlb2YgaW5wdXQgIT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0aW5wdXQgPSBpbnB1dC50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMgPSB0aGlzLmZpeE9wdGlvbnMob3B0aW9ucyk7XG5cblx0XHRsZXQganNvbiA9IHBhcnNlKGlucHV0LCBvcHRpb25zKTtcblxuXHRcdHJldHVybiB0aGlzLmNyZWF0ZShqc29uLCBvcHRpb25zLCAuLi5hcmd2KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpflsI/oqqrmqJnpoYxcblx0ICovXG5cdHRpdGxlKC4uLnRpdGxlczogc3RyaW5nW10pOiBzdHJpbmdcblx0e1xuXHRcdGxldCBub3ZlbCA9IHRoaXMucmF3Lm5vdmVsO1xuXG5cdFx0bGV0IGFyciA9IFtcblx0XHRcdG5vdmVsLnRpdGxlX291dHB1dCxcblx0XHRcdG5vdmVsLnRpdGxlX3poLFxuXHRcdFx0bm92ZWwudGl0bGVfc2hvcnQsXG5cdFx0XHRub3ZlbC50aXRsZV90dyxcblx0XHRcdG5vdmVsLnRpdGxlX3NvdXJjZSxcblx0XHRcdG5vdmVsLnRpdGxlX2pwLFxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0bm92ZWwudGl0bGVfamEsXG5cdFx0XHRub3ZlbC50aXRsZV9jbixcblx0XHRcdC4uLnRpdGxlcyxcblx0XHRdO1xuXG5cdFx0Zm9yIChsZXQgdiBvZiBhcnIpXG5cdFx0e1xuXHRcdFx0aWYgKGNiX3RpdGxlX2ZpbHRlcih2KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHY7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMudGl0bGVzKClbMF1cblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfmiYDmnInlsI/oqqrmqJnpoYxcblx0ICovXG5cdHRpdGxlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGdldE5vdmVsVGl0bGVGcm9tTWV0YSh0aGlzLnJhdylcblx0XHRcdC5maWx0ZXIoY2JfdGl0bGVfZmlsdGVyKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+ezu+WIl+WQjeeosVxuXHQgKi9cblx0c2VyaWVzX3RpdGxlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuc2VyaWVzICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcy5uYW1lLFxuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuc2VyaWVzICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcy5uYW1lX3Nob3J0LFxuXHRcdF0uY29uY2F0KFtdKSlcblx0XHRcdC5maWx0ZXIoY2JfdGl0bGVfZmlsdGVyKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+S9nOiAheWIl+ihqFxuXHQgKi9cblx0YXV0aG9ycygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuYXV0aG9yLFxuXHRcdF0uY29uY2F0KHRoaXMucmF3Lm5vdmVsLmF1dGhvcnMgfHwgW10pKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+e5quW4q+WIl+ihqFxuXHQgKi9cblx0aWxsdXN0cygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0bGV0IG5vdmVsID0gdGhpcy5yYXcubm92ZWw7XG5cblx0XHRsZXQgYXJyID0gYXJyX2ZpbHRlcihbXG5cdFx0XHQnaWxsdXN0Jyxcblx0XHRcdCdpbGx1c3RzJyxcblx0XHRdXG5cdFx0XHQuY29uY2F0KE9iamVjdC5rZXlzKG5vdmVsKSlcblx0XHRcdC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGtleTogc3RyaW5nKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoa2V5LmluZGV4T2YoJ2lsbHVzdCcpID09PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YS5wdXNoKGtleSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhXG5cdFx0XHR9LCBbXSBhcyBzdHJpbmdbXSkpXG5cdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChhOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCB2ID0gbm92ZWxba2V5XTtcblxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh2KSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGEucHVzaCguLi52KVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGEucHVzaCh2KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdH0sIFtdKSBhcyBzdHJpbmdbXVxuXHRcdDtcblxuXHRcdHJldHVybiBhcnJfZmlsdGVyKGFycikuZmlsdGVyKGNiX3RpdGxlX2ZpbHRlcilcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfmqJnnsaTliJfooahcblx0ICovXG5cdHRhZ3MoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnRhZ3MgfHwgW10pXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X6LKi54276ICFL+e/u+itr+iAheWIl+ihqFxuXHQgKi9cblx0Y29udHJpYnV0ZXMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKHRoaXMucmF3LmNvbnRyaWJ1dGUgfHwgW10pXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X55m85biD57ay56uZ5oiW6ICF5Ye654mI56S+5YiX6KGoXG5cdCAqL1xuXHRwdWJsaXNoZXJzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihbXG5cdFx0XHR0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5wdWJsaXNoZXIsXG5cdFx0XS5jb25jYXQodGhpcy5yYXcubm92ZWwucHVibGlzaGVycyB8fCBbXSkpXG5cdH1cblxuXHRzaXRlcygpXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihPYmplY3QuZW50cmllcyh0aGlzLnJhdy5vcHRpb25zIHx8IHt9KVxuXHRcdFx0LnJlZHVjZShmdW5jdGlvbiAobHMsIFtzaXRlLCBkYXRhXSlcblx0XHRcdHtcblx0XHRcdFx0aWYgKGRhdGEgJiYgKCdub3ZlbF9pZCcgaW4gZGF0YSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRscy5wdXNoKHtcblx0XHRcdFx0XHRcdHNpdGUsXG5cdFx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbHM7XG5cdFx0XHR9LCBbXSBhcyB7XG5cdFx0XHRcdHNpdGU6IHN0cmluZyxcblx0XHRcdFx0ZGF0YTogSU1kY29uZk1ldGFPcHRpb25zTm92ZWxTaXRlLFxuXHRcdFx0fVtdKSk7XG5cdH1cblxuXHRzdGF0dXMoKTogRW51bU5vdmVsU3RhdHVzIHwgbnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwubm92ZWxfc3RhdHVzKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLnJhdy5ub3ZlbC5ub3ZlbF9zdGF0dXNcblx0XHR9XG5cdH1cblxuXHR0b0pTT048Uj4oY2xvbmU/OiBib29sZWFuKTogUlxuXHR0b0pTT04oY2xvbmU/OiBib29sZWFuKTogVFxuXHR0b0pTT04oY2xvbmU/OiBib29sZWFuKTogVFxuXHR7XG5cdFx0aWYgKGNsb25lKVxuXHRcdHtcblx0XHRcdHJldHVybiBjbG9uZURlZXAodGhpcy5yYXcpO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gdGhpcy5yYXc7XG5cdH1cblxuXHRzdHJpbmdpZnkoKVxuXHR7XG5cdFx0cmV0dXJuIHN0cmluZ2lmeSh0aGlzLnJhdylcblx0fVxuXG5cdHN0YXRpYyBwYXJzZSA9IHBhcnNlO1xuXHRzdGF0aWMgc3RyaW5naWZ5ID0gc3RyaW5naWZ5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlTm92ZWxJbmZvXG5cbmZ1bmN0aW9uIGFycl9maWx0ZXI8VD4oYXJyOiBUW10pXG57XG5cdHJldHVybiBhcnJheV91bmlxdWUoYXJyKS5maWx0ZXIodiA9PlxuXHR7XG5cdFx0cmV0dXJuIHYgJiYgdiAhPSBudWxsXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHQmJiB2ICE9ICdudWxsJ1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0JiYgdiAhPSAndW5kZWZpbmVkJ1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gY2JfdGl0bGVfZmlsdGVyKHY6IHN0cmluZylcbntcblx0cmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2ICYmICFbXG5cdFx0J+mAo+i8ieS4rScsXG5cdFx0J+mVt+e3qCDjgJDpgKPovInjgJEnLFxuXHRcdCd1bmRlZmluZWQnLFxuXHRcdCdudWxsJyxcblx0XHQnJyxcblx0XS5pbmNsdWRlcyh2LnRyaW0oKSlcbn1cbiJdfQ==