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
exports.NodeNovelInfo = void 0;
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
let NodeNovelInfo = /** @class */ (() => {
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
            var _a, _b, _c, _d;
            return index_2.arr_filter([
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
            return index_2.arr_filter([
                (_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.author,
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
            var _a;
            return index_2.arr_filter(((_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.tags) || []);
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
            var _a;
            return index_2.arr_filter([
                (_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.publisher,
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
            var _a;
            return (_a = this.raw.novel) === null || _a === void 0 ? void 0 : _a.novel_status;
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
    return NodeNovelInfo;
})();
exports.NodeNovelInfo = NodeNovelInfo;
exports.default = NodeNovelInfo;
//# sourceMappingURL=class.js.map