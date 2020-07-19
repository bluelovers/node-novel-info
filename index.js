"use strict";
/**
 * Created by user on 2018/1/27/027.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdconf_parse = exports._handleDataForStringify = exports._handleData = exports.parse = exports.stringify = exports.defaultOptionsParse = exports.envBool = exports.envVal = exports.deepmergeOptions = exports.mdconf = void 0;
const const_1 = require("./lib/const");
Object.defineProperty(exports, "deepmergeOptions", { enumerable: true, get: function () { return const_1.deepmergeOptions; } });
const mdconf2_1 = require("mdconf2");
Object.defineProperty(exports, "mdconf", { enumerable: true, get: function () { return mdconf2_1.mdconf; } });
const crlf_normalize_1 = require("crlf-normalize");
const deepmerge_plus_1 = __importDefault(require("deepmerge-plus"));
const array_hyper_unique_1 = require("array-hyper-unique");
const json_1 = __importDefault(require("./json"));
const env_bool_1 = require("env-bool");
Object.defineProperty(exports, "envVal", { enumerable: true, get: function () { return env_bool_1.envVal; } });
Object.defineProperty(exports, "envBool", { enumerable: true, get: function () { return env_bool_1.envBool; } });
const hex_lib_1 = require("hex-lib");
const chai_1 = require("chai");
const util_1 = require("./lib/util");
__exportStar(require("./lib/util"), exports);
__exportStar(require("./lib/types"), exports);
__exportStar(require("./version"), exports);
exports.defaultOptionsParse = {
    removeRawData: true,
    disableKeyToLowerCase: true,
};
function stringify(data, d2, ...argv) {
    data = _handleDataForStringify(data, d2, ...argv);
    return mdconf2_1.stringify(data) + crlf_normalize_1.LF.repeat(2);
}
exports.stringify = stringify;
function parse(data, options = {}) {
    var _a;
    if (options.removeRawData) {
        options.oldParseApi = options.removeRawData;
    }
    if (options.disableKeyToLowerCase == null) {
        options.disableKeyToLowerCase = true;
    }
    let ret = mdconf2_1.parse(crlf_normalize_1.crlf(data.toString()), options);
    try {
        if ((_a = ret.novel) === null || _a === void 0 ? void 0 : _a.preface) {
            ret.novel.preface = (Array.isArray(ret.novel.preface)) ? ret.novel.preface.join(crlf_normalize_1.LF) : ret.novel.preface;
        }
        if (!options.lowCheckLevel || ret.options) {
            ret.options = deepmerge_plus_1.default(ret.options || {}, {
                textlayout: {},
            }, const_1.deepmergeOptions);
        }
    }
    catch (e) {
        console.error(e.toString());
    }
    if (options.chk || options.chk == null) {
        ret = util_1.chkInfo(ret, options);
    }
    if (options.throw || options.throw == null) {
        ret = util_1.chkInfo(ret, {
            ...options,
            throw: true,
        });
        if (!ret) {
            throw new Error('not a valid node-novel-info mdconf');
        }
    }
    if (ret) {
        ret = util_1.sortKeys(ret);
        //console.log(777);
    }
    // @ts-ignore
    return ret;
}
exports.parse = parse;
function _handleData(data, d2, ...argv) {
    // @ts-ignore
    data = json_1.default.toNovelInfo(data, d2 || {}, {
        novel: {
            tags: [],
        },
    }, ...argv);
    data = util_1.sortKeys(data);
    data.novel.tags.unshift('node-novel');
    data.novel.tags = array_hyper_unique_1.array_unique(data.novel.tags);
    // @ts-ignore
    return data;
}
exports._handleData = _handleData;
function _handleDataForStringify(data, d2, ...argv) {
    var _a;
    data = _handleData(data, d2, ...argv);
    if (typeof ((_a = data.novel) === null || _a === void 0 ? void 0 : _a.preface) == 'string') {
        data.novel.preface = new mdconf2_1.RawObject(data.novel.preface, {});
    }
    if ('novel_status' in data.novel && !util_1.isHexValue(data.novel.novel_status)) {
        chai_1.expect(data.novel.novel_status).a('number');
        data.novel.novel_status = hex_lib_1.toHex(data.novel.novel_status, 4);
    }
    // @ts-ignore
    return data;
}
exports._handleDataForStringify = _handleDataForStringify;
exports.mdconf_parse = parse;
exports.default = exports;
//# sourceMappingURL=index.js.map