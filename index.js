"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdconf = require("mdconf");
exports.mdconf = mdconf;
const crlf_normalize_1 = require("crlf-normalize");
function mdconf_parse(data, options = {}) {
    let ret = mdconf(crlf_normalize_1.crlf(data.toString()));
    const old = ret;
    try {
        ret.novel.preface = (ret.novel.preface
            && ret.novel.preface.length
            && Array.isArray(ret.novel.preface)) ?
            ret.novel.preface.join(crlf_normalize_1.LF) : ret.novel.preface;
    }
    catch (e) {
    }
    ret.options = ret.options || {};
    ret.options.textlayout = Object.assign({}, ret.options.textlayout);
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
    if (!ret || !ret.novel || ret.novel.title) {
        return null;
    }
    return ret;
}
exports.chkInfo = chkInfo;
const self = require("./index");
exports.default = self;
