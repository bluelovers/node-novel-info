"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdconf = require("mdconf2");
exports.mdconf = mdconf;
const crlf_normalize_1 = require("crlf-normalize");
exports.crlf = crlf_normalize_1.crlf;
exports.LF = crlf_normalize_1.LF;
const lib_1 = require("./lib");
exports.array_unique = lib_1.array_unique;
exports.deepmerge = lib_1.deepmerge;
exports.deepmergeOptions = lib_1.deepmergeOptions;
const isPlainObject = require("is-plain-object");
const sortObjectKeys = require("sort-object-keys2");
const json_1 = require("./json");
exports.defaultOptionsParse = {
    removeRawData: true,
};
function stringify(data, d2, ...argv) {
    data = json_1.default.toNovelInfo(data, d2 || {}, {
        novel: {
            tags: [],
        },
    }, ...argv);
    data = sortKeys(data);
    data.novel.tags.unshift('node-novel');
    data.novel.tags = lib_1.array_unique(data.novel.tags);
    if (data.novel.preface && typeof data.novel.preface == 'string') {
        data.novel.preface = new mdconf.RawObject(data.novel.preface, {});
    }
    return mdconf.stringify(data) + crlf_normalize_1.LF.repeat(2);
}
exports.stringify = stringify;
function parse(data, options = {}) {
    if (options.removeRawData) {
        options.oldParseApi = options.removeRawData;
    }
    let ret = mdconf.parse(crlf_normalize_1.crlf(data.toString()), options);
    try {
        if (ret.novel.preface) {
            ret.novel.preface = (ret.novel.preface
                && ret.novel.preface.length
                && Array.isArray(ret.novel.preface)) ? ret.novel.preface.join(crlf_normalize_1.LF) : ret.novel.preface;
        }
        ret.options = lib_1.deepmerge(ret.options || {}, {
            textlayout: {},
        }, lib_1.deepmergeOptions);
    }
    catch (e) {
        console.error(e.toString());
    }
    if (options.chk || options.chk == null) {
        ret = chkInfo(ret);
    }
    if (options.throw || options.throw == null) {
        ret = chkInfo(ret);
        if (!ret) {
            throw new Error('mdconf_parse');
        }
    }
    if (ret) {
        ret = sortKeys(ret);
    }
    return ret;
}
exports.parse = parse;
function sortKeys(ret) {
    ret = sortObjectKeys(ret, [
        'novel',
        'contribute',
        'options',
    ]);
    sortSubKey('novel', [
        'title',
        'title_short',
        'title_zh',
        'title_en',
        'title_jp',
        'author',
        'source',
        'cover',
        'publisher',
        'date',
        'status',
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
        if (Array.isArray(key)) {
            let _k;
            for (let value of key) {
                if (!(value in obj)) {
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
                parent[key] = lib_1.array_unique(parent[key]);
                if (parent[key].length == 1 && (parent[key][0] === null || typeof parent[key][0] == 'undefined')) {
                    parent[key] = [];
                }
            }
            return;
        }
        if (isPlainObject(obj)) {
            parent[key] = sortObjectKeys(obj, sortList);
        }
    }
    return ret;
}
exports.sortKeys = sortKeys;
function chkInfo(ret, options = {}) {
    if (!ret
        || ((!options || !options.lowCheckLevel)
            && (!ret.novel || !ret.novel.title))) {
        return null;
    }
    if (ret.novel && ('tags' in ret.novel)) {
        if (typeof ret.novel.tags == 'string') {
            ret.novel.tags = [ret.novel.tags];
        }
        ret.novel.tags = lib_1.array_unique(ret.novel.tags || []);
    }
    if ('contribute' in ret) {
        if (typeof ret.contribute == 'string') {
            ret.contribute = [ret.contribute];
        }
        ret.contribute = lib_1.array_unique(ret.contribute || []);
    }
    ret.options = ret.options || {};
    return ret;
}
exports.chkInfo = chkInfo;
exports.mdconf_parse = parse;
const self = require("./index");
exports.default = self;
