"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/1/21/021.
 */
const index_1 = require("./index");
const bind_1 = __importDefault(require("lodash-decorators/bind"));
const lib_1 = require("./lib");
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const util_1 = require("./lib/util");
const index_2 = require("./lib/index");
const defaultOptions = Object.freeze({});
class NodeNovelInfo {
    constructor(mdconf, options = defaultOptions, ...argv) {
        options = NodeNovelInfo.fixOptions(options);
        let ret = cloneDeep_1.default(mdconf);
        if (options.chk || options.chk == null) {
            ret = util_1.chkInfo(ret, options);
        }
        if (options.throw || options.throw == null) {
            ret = util_1.chkInfo(ret, options);
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
            if (index_2.cb_title_filter(v)) {
                return v;
            }
        }
        return this.titles()[0];
    }
    /**
     * 取得所有小說標題
     */
    titles() {
        return util_1.getNovelTitleFromMeta(this.raw)
            .filter(index_2.cb_title_filter);
    }
    /**
     * 取得系列名稱
     */
    series_titles() {
        return index_2.arr_filter([
            this.raw.novel && this.raw.novel.series && this.raw.novel.series.name,
            this.raw.novel && this.raw.novel.series && this.raw.novel.series.name_short,
        ].concat([]))
            .filter(index_2.cb_title_filter);
    }
    /**
     * 取得作者列表
     */
    authors() {
        return index_2.arr_filter([
            this.raw.novel && this.raw.novel.author,
        ].concat(this.raw.novel.authors || []));
    }
    /**
     * 取得繪師列表
     */
    illusts() {
        let novel = this.raw.novel;
        let arr = index_2.arr_filter([
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
        return index_2.arr_filter(arr).filter(index_2.cb_title_filter);
    }
    /**
     * 取得標籤列表
     */
    tags() {
        return index_2.arr_filter(this.raw.novel && this.raw.novel.tags || []);
    }
    /**
     * 取得貢獻者/翻譯者列表
     */
    contributes() {
        return index_2.arr_filter(this.raw.contribute || []);
    }
    /**
     * 取得發布網站名稱或者出版社名稱列表
     */
    publishers() {
        return index_2.arr_filter([
            this.raw.novel && this.raw.novel.publisher,
        ].concat(this.raw.novel.publishers || []));
    }
    /**
     * 取得發布或者來源網址
     */
    sources() {
        return index_2.arr_filter(lib_1.filterByPrefixReturnValues(/^source(?:_.+)?$/, this.raw.novel)
            .concat(this.raw.novel.sources || []));
    }
    /**
     * 小說來源的網站資料(請查閱 novel-downloader)
     */
    sites() {
        return index_2.arr_filter(Object.entries(this.raw.options || {})
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
            return cloneDeep_1.default(this.raw);
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
    bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NodeNovelInfo, "fixOptions", null);
__decorate([
    bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], NodeNovelInfo, "create", null);
__decorate([
    bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], NodeNovelInfo, "createFromString", null);
exports.NodeNovelInfo = NodeNovelInfo;
exports.default = NodeNovelInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBQTJDO0FBQzNDLGtFQUEwQztBQUMxQywrQkFBbUQ7QUFFbkQsaUVBQXlDO0FBQ3pDLHFDQUE0RDtBQUM1RCx1Q0FBMEQ7QUFLMUQsTUFBTSxjQUFjLEdBQW9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFMUUsTUFBYSxhQUFhO0lBT3pCLFlBQVksTUFBUyxFQUFFLFVBQWlDLGNBQWMsRUFBRSxHQUFHLElBQUk7UUFFOUUsT0FBTyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUMsSUFBSSxHQUFHLEdBQU0sbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGNBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGNBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFD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RWpDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxFQUNoQztnQkFDQyxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNQLElBQUk7b0JBQ0osSUFBSTtpQkFDSixDQUFDLENBQUE7YUFDRjtZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQyxFQUFFLEVBR0EsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBRUwsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQ2pEO1lBQ0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUE7U0FDbEM7SUFDRixDQUFDO0lBSUQsTUFBTSxDQUFDLEtBQWU7UUFFckIsSUFBSSxLQUFLLEVBQ1Q7WUFDQyxPQUFPLG1CQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUQsU0FBUztRQUVSLE9BQU8saUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDM0IsQ0FBQzs7QUFFTSxtQkFBSyxHQUFHLGFBQUssQ0FBQztBQUNkLHVCQUFTLEdBQUcsaUJBQVMsQ0FBQztBQTFQN0I7SUFEQyxjQUFJOzs7O3FDQUlKO0FBR0Q7SUFEQyxjQUFJOzs7O2lDQUlKO0FBR0Q7SUFEQyxjQUFJOzs7OzJDQWFKO0FBeERGLHNDQTJSQztBQUVELGtCQUFlLGFBQWEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvMS8yMS8wMjEuXG4gKi9cbmltcG9ydCB7IHBhcnNlLCBzdHJpbmdpZnkgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCBiaW5kIGZyb20gJ2xvZGFzaC1kZWNvcmF0b3JzL2JpbmQnO1xuaW1wb3J0IHsgZmlsdGVyQnlQcmVmaXhSZXR1cm5WYWx1ZXMgfSBmcm9tICcuL2xpYic7XG5pbXBvcnQgeyBFbnVtTm92ZWxTdGF0dXMgfSBmcm9tICcuL2xpYi9jb25zdCc7XG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC9jbG9uZURlZXAnO1xuaW1wb3J0IHsgZ2V0Tm92ZWxUaXRsZUZyb21NZXRhLCBjaGtJbmZvIH0gZnJvbSAnLi9saWIvdXRpbCc7XG5pbXBvcnQgeyBjYl90aXRsZV9maWx0ZXIsIGFycl9maWx0ZXIgfSBmcm9tICcuL2xpYi9pbmRleCc7XG5pbXBvcnQgeyBJT3B0aW9uc1BhcnNlLCBJTWRjb25mTWV0YSwgSU1kY29uZk1ldGFPcHRpb25zTm92ZWxTaXRlIH0gZnJvbSAnLi9saWIvdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBJT3B0aW9uc1BhcnNlICYge307XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBSZWFkb25seTxJTm9kZU5vdmVsSW5mb09wdGlvbnM+ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG5cbmV4cG9ydCBjbGFzcyBOb2RlTm92ZWxJbmZvPFQgZXh0ZW5kcyBJTWRjb25mTWV0YT5cbntcblx0cmF3OiBUO1xuXG5cdHBhdGhNYWluPzogc3RyaW5nO1xuXHRub3ZlbElEPzogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKG1kY29uZjogVCwgb3B0aW9uczogSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gZGVmYXVsdE9wdGlvbnMsIC4uLmFyZ3YpXG5cdHtcblx0XHRvcHRpb25zID0gTm9kZU5vdmVsSW5mby5maXhPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0bGV0IHJldDogVCA9IGNsb25lRGVlcChtZGNvbmYpO1xuXG5cdFx0aWYgKG9wdGlvbnMuY2hrIHx8IG9wdGlvbnMuY2hrID09IG51bGwpXG5cdFx0e1xuXHRcdFx0cmV0ID0gY2hrSW5mbyhyZXQsIG9wdGlvbnMpIGFzIFQ7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMudGhyb3cgfHwgb3B0aW9ucy50aHJvdyA9PSBudWxsKVxuXHRcdHtcblx0XHRcdHJldCA9IGNoa0luZm8ocmV0LCBvcHRpb25zKSBhcyBUO1xuXG5cdFx0XHRpZiAoIXJldClcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3QgYSB2YWxpZCBOb3ZlbEluZm8gZGF0YScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucmF3ID0gcmV0O1xuXHR9XG5cblx0QGJpbmRcblx0c3RhdGljIGZpeE9wdGlvbnMob3B0aW9ucz86IElOb2RlTm92ZWxJbmZvT3B0aW9ucylcblx0e1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyB8fCB7fSlcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBjcmVhdGU8VCBleHRlbmRzIElNZGNvbmZNZXRhPihtZGNvbmY6IFQsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKG1kY29uZiwgb3B0aW9ucywgLi4uYXJndilcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG9wdGlvbnM/OiBJTm9kZU5vdmVsSW5mb09wdGlvbnMsIC4uLmFyZ3YpXG5cdHtcblx0XHRpZiAodHlwZW9mIGlucHV0ICE9ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdGlucHV0ID0gaW5wdXQudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHRvcHRpb25zID0gdGhpcy5maXhPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0bGV0IGpzb24gPSBwYXJzZShpbnB1dCwgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gdGhpcy5jcmVhdGUoanNvbiwgb3B0aW9ucywgLi4uYXJndik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX3BhdGhNYWluX2Jhc2UoKVxuXHR7XG5cdFx0bGV0IGlzX291dDogYm9vbGVhbiA9IG51bGw7XG5cdFx0bGV0IHBhdGhNYWluX2Jhc2U6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuXHRcdGlmICh0aGlzLnBhdGhNYWluICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0bGV0IF9tID0gdGhpcy5wYXRoTWFpbi5tYXRjaCgvXiguKz8pKF9vdXQpPyQvKTtcblxuXHRcdFx0aXNfb3V0ID0gISFfbVsyXTtcblx0XHRcdHBhdGhNYWluX2Jhc2UgPSBfbVsxXTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aXNfb3V0LFxuXHRcdFx0cGF0aE1haW5fYmFzZSxcblx0XHR9XG5cdH1cblxuXHRnZXQgaXNfb3V0KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXRoTWFpbl9iYXNlKCkuaXNfb3V0O1xuXHR9XG5cblx0Z2V0IHBhdGhNYWluX2Jhc2UoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhdGhNYWluX2Jhc2UoKS5wYXRoTWFpbl9iYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+Wwj+iqquaomemhjFxuXHQgKi9cblx0dGl0bGUoLi4udGl0bGVzOiBzdHJpbmdbXSk6IHN0cmluZ1xuXHR7XG5cdFx0bGV0IG5vdmVsID0gdGhpcy5yYXcubm92ZWw7XG5cblx0XHRsZXQgYXJyID0gW1xuXHRcdFx0bm92ZWwudGl0bGVfb3V0cHV0LFxuXHRcdFx0bm92ZWwudGl0bGVfemgsXG5cdFx0XHRub3ZlbC50aXRsZV9zaG9ydCxcblx0XHRcdG5vdmVsLnRpdGxlX3R3LFxuXG5cdFx0XHQuLi50aXRsZXMsXG5cdFx0XHRub3ZlbC50aXRsZSxcblxuXHRcdFx0bm92ZWwudGl0bGVfc291cmNlLFxuXG5cdFx0XHRub3ZlbC50aXRsZV9qcCxcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdG5vdmVsLnRpdGxlX2phLFxuXHRcdFx0bm92ZWwudGl0bGVfY24sXG5cdFx0XTtcblxuXHRcdGZvciAobGV0IHYgb2YgYXJyKVxuXHRcdHtcblx0XHRcdGlmIChjYl90aXRsZV9maWx0ZXIodikpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB2O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnRpdGxlcygpWzBdXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X5omA5pyJ5bCP6Kqq5qiZ6aGMXG5cdCAqL1xuXHR0aXRsZXMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBnZXROb3ZlbFRpdGxlRnJvbU1ldGEodGhpcy5yYXcpXG5cdFx0XHQuZmlsdGVyKGNiX3RpdGxlX2ZpbHRlcilcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfns7vliJflkI3nqLFcblx0ICovXG5cdHNlcmllc190aXRsZXMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcyAmJiB0aGlzLnJhdy5ub3ZlbC5zZXJpZXMubmFtZSxcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnNlcmllcyAmJiB0aGlzLnJhdy5ub3ZlbC5zZXJpZXMubmFtZV9zaG9ydCxcblx0XHRdLmNvbmNhdChbXSkpXG5cdFx0XHQuZmlsdGVyKGNiX3RpdGxlX2ZpbHRlcilcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfkvZzogIXliJfooahcblx0ICovXG5cdGF1dGhvcnMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLmF1dGhvcixcblx0XHRdLmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5hdXRob3JzIHx8IFtdKSlcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpfnuarluKvliJfooahcblx0ICovXG5cdGlsbHVzdHMoKTogc3RyaW5nW11cblx0e1xuXHRcdGxldCBub3ZlbCA9IHRoaXMucmF3Lm5vdmVsO1xuXG5cdFx0bGV0IGFyciA9IGFycl9maWx0ZXIoW1xuXHRcdFx0J2lsbHVzdCcsXG5cdFx0XHQnaWxsdXN0cycsXG5cdFx0XVxuXHRcdFx0LmNvbmNhdChPYmplY3Qua2V5cyhub3ZlbCkpXG5cdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChhLCBrZXk6IHN0cmluZylcblx0XHRcdHtcblx0XHRcdFx0aWYgKGtleS5pbmRleE9mKCdpbGx1c3QnKSA9PT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGEucHVzaChrZXkpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0fSwgW10gYXMgc3RyaW5nW10pKVxuXHRcdFx0LnJlZHVjZShmdW5jdGlvbiAoYTogc3RyaW5nW10sIGtleTogc3RyaW5nKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgdiA9IG5vdmVsW2tleV07XG5cblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodikpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhLnB1c2goLi4udilcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhLnB1c2godilcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhXG5cdFx0XHR9LCBbXSkgYXMgc3RyaW5nW11cblx0XHQ7XG5cblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihhcnIpLmZpbHRlcihjYl90aXRsZV9maWx0ZXIpXG5cdH1cblxuXHQvKipcblx0ICog5Y+W5b6X5qiZ57Gk5YiX6KGoXG5cdCAqL1xuXHR0YWdzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcih0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC50YWdzIHx8IFtdKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+iyoueNu+iAhS/nv7vora/ogIXliJfooahcblx0ICovXG5cdGNvbnRyaWJ1dGVzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcih0aGlzLnJhdy5jb250cmlidXRlIHx8IFtdKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+eZvOW4g+e2suermeWQjeeoseaIluiAheWHuueJiOekvuWQjeeoseWIl+ihqFxuXHQgKi9cblx0cHVibGlzaGVycygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwucHVibGlzaGVyLFxuXHRcdF0uY29uY2F0KHRoaXMucmF3Lm5vdmVsLnB1Ymxpc2hlcnMgfHwgW10pKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWPluW+l+eZvOW4g+aIluiAheS+hua6kOe2suWdgFxuXHQgKi9cblx0c291cmNlcygpXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihmaWx0ZXJCeVByZWZpeFJldHVyblZhbHVlczxzdHJpbmc+KC9ec291cmNlKD86Xy4rKT8kLywgdGhpcy5yYXcubm92ZWwpXG5cdFx0XHQuY29uY2F0KHRoaXMucmF3Lm5vdmVsLnNvdXJjZXMgfHwgW10pKVxuXHR9XG5cblx0LyoqXG5cdCAqIOWwj+iqquS+hua6kOeahOe2suermeizh+aWmSjoq4vmn6XplrEgbm92ZWwtZG93bmxvYWRlcilcblx0ICovXG5cdHNpdGVzKClcblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKE9iamVjdC5lbnRyaWVzKHRoaXMucmF3Lm9wdGlvbnMgfHwge30pXG5cdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChscywgW3NpdGUsIGRhdGFdKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZGF0YSAmJiAoJ25vdmVsX2lkJyBpbiBkYXRhKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxzLnB1c2goe1xuXHRcdFx0XHRcdFx0c2l0ZSxcblx0XHRcdFx0XHRcdGRhdGEsXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBscztcblx0XHRcdH0sIFtdIGFzIHtcblx0XHRcdFx0c2l0ZTogc3RyaW5nLFxuXHRcdFx0XHRkYXRhOiBJTWRjb25mTWV0YU9wdGlvbnNOb3ZlbFNpdGUsXG5cdFx0XHR9W10pKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDlj5blvpflsI/oqqrni4DmhYtcblx0ICovXG5cdHN0YXR1cygpOiBFbnVtTm92ZWxTdGF0dXMgfCBudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5ub3ZlbF9zdGF0dXMpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMucmF3Lm5vdmVsLm5vdmVsX3N0YXR1c1xuXHRcdH1cblx0fVxuXG5cdHRvSlNPTjxSPihjbG9uZT86IGJvb2xlYW4pOiBSXG5cdHRvSlNPTihjbG9uZT86IGJvb2xlYW4pOiBUXG5cdHRvSlNPTihjbG9uZT86IGJvb2xlYW4pOiBUXG5cdHtcblx0XHRpZiAoY2xvbmUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNsb25lRGVlcCh0aGlzLnJhdyk7XG5cdFx0fVxuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiB0aGlzLnJhdztcblx0fVxuXG5cdHN0cmluZ2lmeSgpXG5cdHtcblx0XHRyZXR1cm4gc3RyaW5naWZ5KHRoaXMucmF3KVxuXHR9XG5cblx0c3RhdGljIHBhcnNlID0gcGFyc2U7XG5cdHN0YXRpYyBzdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVOb3ZlbEluZm9cbiJdfQ==