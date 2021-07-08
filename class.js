"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeNovelInfo = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2019/1/21/021.
 */
const index_1 = require("./index");
const bind_1 = (0, tslib_1.__importDefault)(require("lodash-decorators/bind"));
const lib_1 = require("./lib");
const cloneDeep_1 = (0, tslib_1.__importDefault)(require("lodash/cloneDeep"));
const util_1 = require("./lib/util");
const index_2 = require("./lib/index");
const defaultOptions = Object.freeze({});
class NodeNovelInfo {
    constructor(mdconf, options = defaultOptions, ...argv) {
        options = NodeNovelInfo.fixOptions(options);
        let ret = (0, cloneDeep_1.default)(mdconf);
        if (options.chk || options.chk == null) {
            ret = (0, util_1.chkInfo)(ret, options);
        }
        if (options.throw || options.throw == null) {
            ret = (0, util_1.chkInfo)(ret, options);
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
        let json = (0, index_1.parse)(input, options);
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
            if ((0, index_2.cb_title_filter)(v)) {
                return v;
            }
        }
        return this.titles()[0];
    }
    /**
     * 取得所有小說標題
     */
    titles() {
        return (0, util_1.getNovelTitleFromMeta)(this.raw)
            .filter(index_2.cb_title_filter);
    }
    /**
     * 取得系列名稱
     */
    series_titles() {
        var _a, _b, _c, _d;
        return (0, index_2.arr_filter)([
            (_b = (_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.series) === null || _b === void 0 ? void 0 : _b.name,
            (_d = (_c = this.raw.novel) === null || _c === void 0 ? void 0 : _c.series) === null || _d === void 0 ? void 0 : _d.name_short,
        ].concat([]))
            .filter(index_2.cb_title_filter);
    }
    /**
     * 取得作者列表
     */
    authors() {
        var _a;
        return (0, index_2.arr_filter)([
            (_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.author,
        ].concat(this.raw.novel.authors || []));
    }
    /**
     * 取得繪師列表
     */
    illusts() {
        let novel = this.raw.novel;
        let arr = (0, index_2.arr_filter)([
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
        return (0, index_2.arr_filter)(arr).filter(index_2.cb_title_filter);
    }
    /**
     * 取得標籤列表
     */
    tags() {
        var _a;
        return (0, index_2.arr_filter)(((_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.tags) || []);
    }
    /**
     * 取得貢獻者/翻譯者列表
     */
    contributes() {
        return (0, index_2.arr_filter)(this.raw.contribute || []);
    }
    /**
     * 取得發布網站名稱或者出版社名稱列表
     */
    publishers() {
        var _a;
        return (0, index_2.arr_filter)([
            (_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.publisher,
        ].concat(this.raw.novel.publishers || []));
    }
    /**
     * 取得發布或者來源網址
     */
    sources() {
        return (0, index_2.arr_filter)((0, lib_1.filterByPrefixReturnValues)(/^source(?:_.+)?$/, this.raw.novel)
            .concat(this.raw.novel.sources || []));
    }
    /**
     * 小說來源的網站資料(請查閱 novel-downloader)
     */
    sites() {
        return (0, index_2.arr_filter)(Object.entries(this.raw.options || {})
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
        var _a;
        return (_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.novel_status;
    }
    toJSON(clone) {
        if (clone) {
            return (0, cloneDeep_1.default)(this.raw);
        }
        // @ts-ignore
        return this.raw;
    }
    stringify() {
        return (0, index_1.stringify)(this.raw);
    }
}
NodeNovelInfo.parse = index_1.parse;
NodeNovelInfo.stringify = index_1.stringify;
(0, tslib_1.__decorate)([
    bind_1.default,
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], NodeNovelInfo, "fixOptions", null);
(0, tslib_1.__decorate)([
    bind_1.default,
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], NodeNovelInfo, "create", null);
(0, tslib_1.__decorate)([
    bind_1.default,
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], NodeNovelInfo, "createFromString", null);
exports.NodeNovelInfo = NodeNovelInfo;
exports.default = NodeNovelInfo;
//# sourceMappingURL=class.js.map