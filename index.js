"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdconf = require("mdconf2");
exports.mdconf = mdconf;
const crlf_normalize_1 = require("crlf-normalize");
exports.crlf = crlf_normalize_1.crlf;
exports.LF = crlf_normalize_1.LF;
const lib_1 = require("./lib");
exports.array_unique = lib_1.array_unique;
const deepmerge = require("deepmerge-plus");
function stringify(data, ...argv) {
    return mdconf.stringify(data, ...argv);
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
        ret.options = deepmerge(ret.options || {}, {
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
    return ret;
}
exports.parse = parse;
function chkInfo(ret) {
    if (!ret || !ret.novel || !ret.novel.title) {
        return null;
    }
    if (ret.novel.tags) {
        if (typeof ret.novel.tags == 'string') {
            ret.novel.tags = [ret.novel.tags];
        }
        ret.novel.tags = lib_1.array_unique(ret.novel.tags);
    }
    if (ret.contribute) {
        if (typeof ret.contribute == 'string') {
            ret.contribute = [ret.contribute];
        }
        ret.contribute = lib_1.array_unique(ret.contribute);
    }
    ret.options = ret.options || {};
    return ret;
}
exports.chkInfo = chkInfo;
exports.mdconf_parse = parse;
const self = require("./index");
exports.default = self;
