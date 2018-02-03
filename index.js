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
const moment = require("moment");
const isPlainObject = require("is-plain-object");
var Mdconf;
(function (Mdconf) {
    function stringify(data, level = 1, skip = []) {
        let rs1 = [];
        let rs2 = [];
        if (Array.isArray(data)) {
            data.forEach(function (value, index, array) {
                rs1.push(`- ${value}`);
            });
        }
        else if (typeof data == 'object') {
            for (let k in data) {
                if (skip.includes(k)) {
                    continue;
                }
                if (Array.isArray(data[k])) {
                    rs2.push('#'.repeat(level) + '' + k);
                    rs2.push(stringify(data[k], level + 1));
                }
                else if (isPlainObject(data[k])) {
                    rs2.push('#'.repeat(level) + '' + k);
                    rs2.push(stringify(data[k], level + 1));
                }
                else if (moment.isMoment(data[k])) {
                    rs1.push(`- ${k}: ${data[k].format()}`);
                }
                else {
                    rs1.push(`- ${k}: ${data[k]}`);
                }
            }
        }
        else {
            rs1.push(`- ${data}`);
        }
        return crlf_normalize_1.LF + (rs1.concat([''].concat(rs2)).join(crlf_normalize_1.LF)).replace(/^\n+|\s+$/g, '') + crlf_normalize_1.LF;
    }
    Mdconf.stringify = stringify;
    function parse(data, options = {}) {
        let ret = mdconf(crlf_normalize_1.crlf(data.toString()));
        try {
            if (ret.novel.preface) {
                ret.novel.preface = (ret.novel.preface
                    && ret.novel.preface.length
                    && Array.isArray(ret.novel.preface)) ?
                    ret.novel.preface.join(crlf_normalize_1.LF) : ret.novel.preface;
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
    Mdconf.parse = parse;
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
    Mdconf.chkInfo = chkInfo;
})(Mdconf = exports.Mdconf || (exports.Mdconf = {}));
exports.mdconf_parse = Mdconf.parse;
const self = require("./index");
exports.default = self;
