"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdconf = require("mdconf2");
exports.mdconf = mdconf;
const crlf_normalize_1 = require("crlf-normalize");
exports.crlf = crlf_normalize_1.crlf;
const lib_1 = require("./lib");
exports.array_unique = lib_1.array_unique;
function mdconf_parse(data, options = {}) {
    let ret = mdconf(crlf_normalize_1.crlf(data.toString()));
    try {
        if (ret.novel.preface) {
            ret.novel.preface = (ret.novel.preface
                && ret.novel.preface.length
                && Array.isArray(ret.novel.preface)) ?
                ret.novel.preface.join(crlf_normalize_1.LF) : ret.novel.preface;
        }
        ret.options = ret.options || {};
        ret.options.textlayout = Object.assign({}, ret.options.textlayout);
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
exports.mdconf_parse = mdconf_parse;
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
const self = require("./index");
exports.default = self;
