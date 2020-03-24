"use strict";
/**
 * Created by user on 2020/1/16.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHexValue = exports.chkInfo = exports.sortKeys = exports.getNovelTitleFromMeta = void 0;
const index_1 = require("./index");
const array_hyper_unique_1 = require("array-hyper-unique");
const env_bool_1 = require("env-bool");
const sort_object_keys2_1 = __importDefault(require("sort-object-keys2"));
const is_plain_object_1 = __importDefault(require("is-plain-object"));
function getNovelTitleFromMeta(meta) {
    if (meta === null || meta === void 0 ? void 0 : meta.novel) {
        let arr = [
            'title',
            'title_source',
            'title_jp',
            'title_ja',
            'title_zh',
            'title_tw',
            'title_cn',
        ].concat(index_1.filterByPrefixReturnKeys('title_', meta.novel))
            .reduce(function (a, key) {
            if (key in meta.novel) {
                a.push(meta.novel[key]);
            }
            return a;
        }, []);
        if (meta.novel.series) {
            arr.push(meta.novel.series.name);
            arr.push(meta.novel.series.name_short);
        }
        arr = array_hyper_unique_1.array_unique(arr.filter(v => v && ![
            'undefined',
            '長編 【連載】',
            '連載中',
        ].includes(v)));
        return arr;
    }
    return [];
}
exports.getNovelTitleFromMeta = getNovelTitleFromMeta;
function sortKeys(ret) {
    // @ts-ignore
    ret = sort_object_keys2_1.default(ret, [
        'novel',
        'contribute',
        'options',
    ]);
    sortSubKey('novel', [
        'title',
        'title_short',
        'title_zh',
        'title_zh1',
        'title_zh2',
        'title_en',
        'title_jp',
        'title_output',
        'title_other',
        'title_source',
        'author',
        'authors',
        'illust',
        'illusts',
        'source',
        'sources',
        'cover',
        'publisher',
        'publishers',
        'date',
        'status',
        'novel_status',
        'r18',
        'series',
        'preface',
        'tags',
    ]);
    sortSubKey(['novel', 'tags'], null, true);
    sortSubKey('contribute', null, true);
    sortSubKey('options');
    function sortSubKey(key, sortList, unique) {
        let obj = ret;
        let parent = obj;
        //console.log(obj, sortList);
        if (Array.isArray(key)) {
            //console.log(key);
            let _k;
            for (let value of key) {
                if (!(value in obj)) {
                    //console.log(value, parent);
                    return;
                }
                _k = value;
                parent = obj;
                obj = parent[value];
            }
            key = _k;
        }
        else if ((key in parent)) {
            obj = parent[key];
        }
        else {
            return;
        }
        if (Array.isArray(obj)) {
            obj.sort();
            parent[key] = obj;
            if (unique) {
                parent[key] = parent[key].filter(function (v) {
                    return v;
                });
                parent[key] = array_hyper_unique_1.array_unique(parent[key]);
                if (parent[key].length == 1 && (parent[key][0] === null || typeof parent[key][0] == 'undefined')) {
                    parent[key] = [];
                }
            }
            return;
        }
        if (is_plain_object_1.default(obj)) {
            parent[key] = sort_object_keys2_1.default(obj, sortList);
        }
    }
    // @ts-ignore
    return ret;
}
exports.sortKeys = sortKeys;
function chkInfo(ret, options = {}) {
    if (!ret
        || ((!options || !options.lowCheckLevel)
            && (!ret.novel || !ret.novel.title))) {
        if (options === null || options === void 0 ? void 0 : options.throw) {
            throw new TypeError(`novel${(ret.novel ? '.title' : '')} not exists.`);
        }
        return null;
    }
    if (ret.novel) {
        [
            'authors',
            'illusts',
            'tags',
            'sources',
            'publishers',
        ].forEach(k => {
            if (k in ret.novel) {
                ret.novel[k] = index_1.anyToArray(ret.novel[k], true);
            }
        });
        if ('novel_status' in ret.novel) {
            ret.novel.novel_status = env_bool_1.envVal(ret.novel.novel_status);
            if (isHexValue(ret.novel.novel_status)) {
                ret.novel.novel_status = Number(ret.novel.novel_status);
            }
        }
    }
    if ('contribute' in ret) {
        ret.contribute = index_1.anyToArray(ret.contribute, true);
    }
    if (!options.lowCheckLevel) {
        ret.options = ret.options || {};
    }
    if (ret.options) {
        if (typeof ret.options.textlayout === 'object') {
            Object.entries(ret.options.textlayout)
                .forEach(([k, v]) => ret.options.textlayout[k] = env_bool_1.envVal(v));
        }
        if (typeof ret.options.downloadOptions === 'object') {
            Object.entries(ret.options.downloadOptions)
                .forEach(([k, v]) => ret.options.downloadOptions[k] = env_bool_1.envVal(v));
        }
    }
    return ret;
}
exports.chkInfo = chkInfo;
function isHexValue(value) {
    return typeof value === 'string' && /^0x[\da-f]+$/i.test(value);
}
exports.isHexValue = isHexValue;
//# sourceMappingURL=util.js.map