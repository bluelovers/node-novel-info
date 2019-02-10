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
        return arr_filter([
            this.raw.novel && this.raw.novel.illust,
        ].concat(this.raw.novel.illusts || []));
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
    return v && ![
        '連載中',
        '長編 【連載】',
        'undefined',
        'null',
    ].includes(v);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBUWlCO0FBQ2pCLG1EQUFrQztBQUNsQywrQkFBa0U7QUFHbEUsOENBQStDO0FBSy9DLE1BQU0sY0FBYyxHQUFvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTFFLE1BQWEsYUFBYTtJQUl6QixZQUFZLE1BQVMsRUFBRSxVQUFpQyxjQUFjLEVBQUUsR0FBRyxJQUFJO1FBRTlFLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxHQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBd0IsTUFBUyxFQUFFLFVBQWlDLGNBQWMs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QyxJQUFJLElBQUk7WUFDcEIsYUFBYTtlQUNWLENBQUMsSUFBSSxNQUFNO1lBQ2QsYUFBYTtlQUNWLENBQUMsSUFBSSxXQUFXLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsQ0FBUztJQUVqQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ1osS0FBSztRQUNMLFNBQVM7UUFDVCxXQUFXO1FBQ1gsTUFBTTtLQUNOLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvMS8yMS8wMjEuXG4gKi9cbmltcG9ydCB7XG5cdGNoa0luZm8sXG5cdGdldE5vdmVsVGl0bGVGcm9tTWV0YSxcblx0SU1kY29uZk1ldGEsXG5cdElNZGNvbmZNZXRhT3B0aW9uc05vdmVsU2l0ZSxcblx0SU9wdGlvbnNQYXJzZSxcblx0cGFyc2UsXG5cdHN0cmluZ2lmeSxcbn0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgYmluZCBmcm9tICdiaW5kLWRlY29yYXRvcic7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUsIGRlZXBtZXJnZSwgZGVlcG1lcmdlT3B0aW9ucyB9IGZyb20gJy4vbGliJztcbmltcG9ydCB7IEVudW1Ob3ZlbFN0YXR1cyB9IGZyb20gJy4vbGliL2NvbnN0JztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCBjbG9uZURlZXAgPSByZXF1aXJlKCdsb2Rhc2gvY2xvbmVEZWVwJyk7XG5pbXBvcnQgeyB0b0hleCB9IGZyb20gJ2hleC1saWInO1xuXG5leHBvcnQgdHlwZSBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBJT3B0aW9uc1BhcnNlICYge307XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBSZWFkb25seTxJTm9kZU5vdmVsSW5mb09wdGlvbnM+ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG5cbmV4cG9ydCBjbGFzcyBOb2RlTm92ZWxJbmZvPFQgZXh0ZW5kcyBJTWRjb25mTWV0YT5cbntcblx0cmF3OiBUO1xuXG5cdGNvbnN0cnVjdG9yKG1kY29uZjogVCwgb3B0aW9uczogSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gZGVmYXVsdE9wdGlvbnMsIC4uLmFyZ3YpXG5cdHtcblx0XHRvcHRpb25zID0gTm9kZU5vdmVsSW5mby5maXhPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0bGV0IHJldDogVCA9IGNsb25lRGVlcChtZGNvbmYpO1xuXG5cdFx0aWYgKG9wdGlvbnMuY2hrIHx8IG9wdGlvbnMuY2hrID09IG51bGwpXG5cdFx0e1xuXHRcdFx0cmV0ID0gY2hrSW5mbyhyZXQsIG9wdGlvbnMpIGFzIFQ7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMudGhyb3cgfHwgb3B0aW9ucy50aHJvdyA9PSBudWxsKVxuXHRcdHtcblx0XHRcdHJldCA9IGNoa0luZm8ocmV0LCBvcHRpb25zKSBhcyBUO1xuXG5cdFx0XHRpZiAoIXJldClcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3QgYSB2YWxpZCBOb3ZlbEluZm8gZGF0YScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucmF3ID0gcmV0O1xuXHR9XG5cblx0QGJpbmRcblx0c3RhdGljIGZpeE9wdGlvbnMob3B0aW9ucz86IElOb2RlTm92ZWxJbmZvT3B0aW9ucylcblx0e1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyB8fCB7fSlcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBjcmVhdGU8VCBleHRlbmRzIElNZGNvbmZNZXRhPihtZGNvbmY6IFQsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKG1kY29uZiwgb3B0aW9ucywgLi4uYXJndilcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdGlmICh0eXBlb2YgaW5wdXQgIT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0aW5wdXQgPSBpbnB1dC50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMgPSB0aGlzLmZpeE9wdGlvbnMob3B0aW9ucyk7XG5cblx0XHRsZXQganNvbiA9IHBhcnNlKGlucHV0LCBvcHRpb25zKTtcblxuXHRcdHJldHVybiB0aGlzLmNyZWF0ZShqc29uLCBvcHRpb25zLCAuLi5hcmd2KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfmiYDmnInlsI/oqqrmqJnpoYxcblx0ICovXG5cdHRpdGxlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGdldE5vdmVsVGl0bGVGcm9tTWV0YSh0aGlzLnJhdylcblx0XHRcdC5maWx0ZXIoY2JfdGl0bGVfZmlsdGVyKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+ezu+WIl+WQjeeosVxuXHQgKi9cblx0c2VyaWVzX3RpdGxlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuc2VyaWVzICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcy5uYW1lLFxuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuc2VyaWVzICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcy5uYW1lX3Nob3J0LFxuXHRcdF0uY29uY2F0KFtdKSlcblx0XHRcdC5maWx0ZXIoY2JfdGl0bGVfZmlsdGVyKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+S9nOiAheWIl+ihqFxuXHQgKi9cblx0YXV0aG9ycygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuYXV0aG9yLFxuXHRcdF0uY29uY2F0KHRoaXMucmF3Lm5vdmVsLmF1dGhvcnMgfHwgW10pKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+e5quW4q+WIl+ihqFxuXHQgKi9cblx0aWxsdXN0cygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuaWxsdXN0LFxuXHRcdF0uY29uY2F0KHRoaXMucmF3Lm5vdmVsLmlsbHVzdHMgfHwgW10pKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+aomeexpOWIl+ihqFxuXHQgKi9cblx0dGFncygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIodGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwudGFncyB8fCBbXSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfosqLnjbvogIUv57+76K2v6ICF5YiX6KGoXG5cdCAqL1xuXHRjb250cmlidXRlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIodGhpcy5yYXcuY29udHJpYnV0ZSB8fCBbXSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfnmbzluIPntrLnq5nmiJbogIXlh7rniYjnpL7liJfooahcblx0ICovXG5cdHB1Ymxpc2hlcnMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnB1Ymxpc2hlcixcblx0XHRdLmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5wdWJsaXNoZXJzIHx8IFtdKSlcblx0fVxuXG5cdHNpdGVzKClcblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKE9iamVjdC5lbnRyaWVzKHRoaXMucmF3Lm9wdGlvbnMgfHwge30pXG5cdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChscywgW3NpdGUsIGRhdGFdKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZGF0YSAmJiAoJ25vdmVsX2lkJyBpbiBkYXRhKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxzLnB1c2goe1xuXHRcdFx0XHRcdFx0c2l0ZSxcblx0XHRcdFx0XHRcdGRhdGEsXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBscztcblx0XHRcdH0sIFtdIGFzIHtcblx0XHRcdFx0c2l0ZTogc3RyaW5nLFxuXHRcdFx0XHRkYXRhOiBJTWRjb25mTWV0YU9wdGlvbnNOb3ZlbFNpdGUsXG5cdFx0XHR9W10pKTtcblx0fVxuXG5cdHN0YXR1cygpOiBFbnVtTm92ZWxTdGF0dXMgfCBudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5ub3ZlbF9zdGF0dXMpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMucmF3Lm5vdmVsLm5vdmVsX3N0YXR1c1xuXHRcdH1cblx0fVxuXG5cdHRvSlNPTjxSPihjbG9uZT86IGJvb2xlYW4pOiBSXG5cdHRvSlNPTihjbG9uZT86IGJvb2xlYW4pOiBUXG5cdHRvSlNPTihjbG9uZT86IGJvb2xlYW4pOiBUXG5cdHtcblx0XHRpZiAoY2xvbmUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNsb25lRGVlcCh0aGlzLnJhdyk7XG5cdFx0fVxuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiB0aGlzLnJhdztcblx0fVxuXG5cdHN0cmluZ2lmeSgpXG5cdHtcblx0XHRyZXR1cm4gc3RyaW5naWZ5KHRoaXMucmF3KVxuXHR9XG5cblx0c3RhdGljIHBhcnNlID0gcGFyc2U7XG5cdHN0YXRpYyBzdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVOb3ZlbEluZm9cblxuZnVuY3Rpb24gYXJyX2ZpbHRlcjxUPihhcnI6IFRbXSlcbntcblx0cmV0dXJuIGFycmF5X3VuaXF1ZShhcnIpLmZpbHRlcih2ID0+XG5cdHtcblx0XHRyZXR1cm4gdiAmJiB2ICE9IG51bGxcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdCYmIHYgIT0gJ251bGwnXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHQmJiB2ICE9ICd1bmRlZmluZWQnXG5cdH0pO1xufVxuXG5mdW5jdGlvbiBjYl90aXRsZV9maWx0ZXIodjogc3RyaW5nKVxue1xuXHRyZXR1cm4gdiAmJiAhW1xuXHRcdCfpgKPovInkuK0nLFxuXHRcdCfplbfnt6gg44CQ6YCj6LyJ44CRJyxcblx0XHQndW5kZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdF0uaW5jbHVkZXModilcbn1cbiJdfQ==