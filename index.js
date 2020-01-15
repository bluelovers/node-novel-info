"use strict";
/**
 * Created by user on 2018/1/27/027.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./lib/const");
exports.deepmergeOptions = const_1.deepmergeOptions;
const mdconf2_1 = require("mdconf2");
exports.mdconf = mdconf2_1.mdconf;
const crlf_normalize_1 = require("crlf-normalize");
const deepmerge_plus_1 = __importDefault(require("deepmerge-plus"));
const array_hyper_unique_1 = require("array-hyper-unique");
const json_1 = __importDefault(require("./json"));
const env_bool_1 = require("env-bool");
exports.envVal = env_bool_1.envVal;
exports.envBool = env_bool_1.envBool;
const hex_lib_1 = require("hex-lib");
const chai_1 = require("chai");
const util_1 = require("./lib/util");
__export(require("./lib/util"));
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
    if (options.removeRawData) {
        options.oldParseApi = options.removeRawData;
    }
    if (options.disableKeyToLowerCase == null) {
        options.disableKeyToLowerCase = true;
    }
    let ret = mdconf2_1.parse(crlf_normalize_1.crlf(data.toString()), options);
    try {
        if (ret.novel && ret.novel.preface) {
            ret.novel.preface = (ret.novel.preface
                && ret.novel.preface.length
                && Array.isArray(ret.novel.preface)) ? ret.novel.preface.join(crlf_normalize_1.LF) : ret.novel.preface;
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
    data = _handleData(data, d2, ...argv);
    if (data.novel.preface && typeof data.novel.preface == 'string') {
        data.novel.preface = new mdconf2_1.RawObject(data.novel.preface, {});
    }
    if ('novel_status' in data.novel) {
        chai_1.expect(data.novel.novel_status).a('number');
        data.novel.novel_status = hex_lib_1.toHex(data.novel.novel_status, 4);
    }
    // @ts-ignore
    return data;
}
exports._handleDataForStringify = _handleDataForStringify;
exports.version = require("./package.json").version;
exports.mdconf_parse = parse;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7Ozs7O0FBRUgsdUNBQStDO0FBaUJ0QywyQkFqQkEsd0JBQWdCLENBaUJBO0FBaEJ6QixxQ0FBc0Y7QUFlN0UsaUJBZnFELGdCQUFNLENBZXJEO0FBZGYsbURBQTBDO0FBQzFDLG9FQUF1QztBQUN2QywyREFBa0Q7QUFDbEQsa0RBQTRCO0FBQzVCLHVDQUEyQztBQVlsQyxpQkFaQSxpQkFBTSxDQVlBO0FBQUUsa0JBWkEsa0JBQU8sQ0FZQTtBQVh4QixxQ0FBZ0M7QUFDaEMsK0JBQThCO0FBQzlCLHFDQUErQztBQUcvQyxnQ0FBMkI7QUFRZCxRQUFBLG1CQUFtQixHQUFrQjtJQUNqRCxhQUFhLEVBQUUsSUFBSTtJQUNuQixxQkFBcUIsRUFBRSxJQUFJO0NBQzNCLENBQUM7QUFFRixTQUFnQixTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUcsRUFBRSxHQUFHLElBQUk7SUFFM0MsSUFBSSxHQUFHLHVCQUF1QixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUVsRCxPQUFPLG1CQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsbUJBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUxELDhCQUtDO0FBTUQsU0FBZ0IsS0FBSyxDQUF3QixJQUFJLEVBQUUsVUFBeUIsRUFBRTtJQUU3RSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQ3pCO1FBQ0MsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0tBQzVDO0lBRUQsSUFBSSxPQUFPLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUN6QztRQUNDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7S0FDckM7SUFFRCxJQUFJLEdBQUcsR0FBRyxlQUFNLENBQUMscUJBQUksQ0FBQyxJQUFJ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QUMsT0FBTyxHQUFHLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMzRDtJQUVELElBQUksY0FBYyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQ2hDO1FBQ0MsYUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLGVBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM1RDtJQUVELGFBQWE7SUFDYixPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFsQkQsMERBa0JDO0FBRVksUUFBQSxPQUFPLEdBQVcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDO0FBRXBELFFBQUEsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUVsQyxrQkFBZSxPQUFtQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8xLzI3LzAyNy5cbiAqL1xuXG5pbXBvcnQgeyBkZWVwbWVyZ2VPcHRpb25zIH0gZnJvbSAnLi9saWIvY29uc3QnO1xuaW1wb3J0IHsgcGFyc2UgYXMgX3BhcnNlLCBzdHJpbmdpZnkgYXMgX3N0cmluZ2lmeSwgUmF3T2JqZWN0LCBtZGNvbmYgfSBmcm9tICdtZGNvbmYyJztcbmltcG9ydCB7IGNybGYsIExGIH0gZnJvbSAnY3JsZi1ub3JtYWxpemUnO1xuaW1wb3J0IGRlZXBtZXJnZSBmcm9tICdkZWVwbWVyZ2UtcGx1cyc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuaW1wb3J0IEpzb25NZCBmcm9tICcuL2pzb24nO1xuaW1wb3J0IHsgZW52VmFsLCBlbnZCb29sIH0gZnJvbSAnZW52LWJvb2wnO1xuaW1wb3J0IHsgdG9IZXggfSBmcm9tICdoZXgtbGliJztcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgY2hrSW5mbywgc29ydEtleXMgfSBmcm9tICcuL2xpYi91dGlsJztcbmltcG9ydCB7IElPcHRpb25zUGFyc2UsIElNZGNvbmZNZXRhIH0gZnJvbSAnLi9saWIvdHlwZXMnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi91dGlsJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3R5cGVzJztcbmV4cG9ydCB7IElNZGNvbmZNZXRhLCBJT3B0aW9uc1BhcnNlIH0gZnJvbSAnLi9saWIvdHlwZXMnO1xuXG5leHBvcnQgeyBtZGNvbmYgfVxuZXhwb3J0IHsgZGVlcG1lcmdlT3B0aW9ucyB9XG5leHBvcnQgeyBlbnZWYWwsIGVudkJvb2wgfVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnNQYXJzZTogSU9wdGlvbnNQYXJzZSA9IHtcblx0cmVtb3ZlUmF3RGF0YTogdHJ1ZSxcblx0ZGlzYWJsZUtleVRvTG93ZXJDYXNlOiB0cnVlLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeShkYXRhLCBkMj8sIC4uLmFyZ3YpOiBzdHJpbmdcbntcblx0ZGF0YSA9IF9oYW5kbGVEYXRhRm9yU3RyaW5naWZ5KGRhdGEsIGQyLCAuLi5hcmd2KTtcblxuXHRyZXR1cm4gX3N0cmluZ2lmeShkYXRhKSArIExGLnJlcGVhdCgyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlPFQgPSBJTWRjb25mTWV0YT4oZGF0YToge1xuXHR0b1N0cmluZygpOiBzdHJpbmcsXG59LCBvcHRpb25zPzogSU9wdGlvbnNQYXJzZSk6IFRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZTxUID0gSU1kY29uZk1ldGE+KGRhdGE6IHN0cmluZywgb3B0aW9ucz86IElPcHRpb25zUGFyc2UpOiBUXG5leHBvcnQgZnVuY3Rpb24gcGFyc2U8VCBleHRlbmRzIElNZGNvbmZNZXRhPihkYXRhLCBvcHRpb25zOiBJT3B0aW9uc1BhcnNlID0ge30pOiBUXG57XG5cdGlmIChvcHRpb25zLnJlbW92ZVJhd0RhdGEpXG5cdHtcblx0XHRvcHRpb25zLm9sZFBhcnNlQXBpID0gb3B0aW9ucy5yZW1vdmVSYXdEYXRhO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMuZGlzYWJsZUtleVRvTG93ZXJDYXNlID09IG51bGwpXG5cdHtcblx0XHRvcHRpb25zLmRpc2FibGVLZXlUb0xvd2VyQ2FzZSA9IHRydWU7XG5cdH1cblxuXHRsZXQgcmV0ID0gX3BhcnNlKGNybGYoZGF0YS50b1N0cmluZygpKSwgb3B0aW9ucykgYXMgSU1kY29uZk1ldGE7XG5cblx0dHJ5XG5cdHtcblx0XHRpZiAocmV0Lm5vdmVsICYmIHJldC5ub3ZlbC5wcmVmYWNlKVxuXHRcdHtcblx0XHRcdHJldC5ub3ZlbC5wcmVmYWNlID0gKHJldC5ub3ZlbC5wcmVmYWNlXG5cdFx0XHRcdCYmIHJldC5ub3ZlbC5wcmVmYWNlLmxlbmd0aFxuXHRcdFx0XHQmJiBBcnJheS5pc0FycmF5KHJldC5ub3ZlbC5wcmVmYWNlKSkgPyByZXQubm92ZWwucHJlZmFjZS5qb2luKExGKSA6IHJldC5ub3ZlbC5wcmVmYWNlXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0aWYgKCFvcHRpb25zLmxvd0NoZWNrTGV2ZWwgfHwgcmV0Lm9wdGlvbnMpXG5cdFx0e1xuXHRcdFx0cmV0Lm9wdGlvbnMgPSBkZWVwbWVyZ2UocmV0Lm9wdGlvbnMgfHwge30sIHtcblxuXHRcdFx0XHR0ZXh0bGF5b3V0OiB7fSxcblxuXHRcdFx0fSwgZGVlcG1lcmdlT3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cdGNhdGNoIChlKVxuXHR7XG5cdFx0Y29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMuY2hrIHx8IG9wdGlvbnMuY2hrID09IG51bGwpXG5cdHtcblx0XHRyZXQgPSBjaGtJbmZvKHJldCwgb3B0aW9ucyk7XG5cdH1cblxuXHRpZiAob3B0aW9ucy50aHJvdyB8fCBvcHRpb25zLnRocm93ID09IG51bGwpXG5cdHtcblx0XHRyZXQgPSBjaGtJbmZvKHJldCwge1xuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdHRocm93OiB0cnVlLFxuXHRcdH0pO1xuXG5cdFx0aWYgKCFyZXQpXG5cdFx0e1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3QgYSB2YWxpZCBub2RlLW5vdmVsLWluZm8gbWRjb25mJyk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHJldClcblx0e1xuXHRcdHJldCA9IHNvcnRLZXlzKHJldCk7XG5cblx0XHQvL2NvbnNvbGUubG9nKDc3Nyk7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaGFuZGxlRGF0YTxUIGV4dGVuZHMgSU1kY29uZk1ldGE+KGRhdGEsIGQyPywgLi4uYXJndik6IFRcbntcblx0Ly8gQHRzLWlnbm9yZVxuXHRkYXRhID0gSnNvbk1kLnRvTm92ZWxJbmZvKGRhdGEsIGQyIHx8IHt9LCB7XG5cdFx0bm92ZWw6IHtcblx0XHRcdHRhZ3M6IFtdLFxuXHRcdH0sXG5cdH0sIC4uLmFyZ3YpO1xuXG5cdGRhdGEgPSBzb3J0S2V5cyhkYXRhKTtcblx0ZGF0YS5ub3ZlbC50YWdzLnVuc2hpZnQoJ25vZGUtbm92ZWwnKTtcblx0ZGF0YS5ub3ZlbC50YWdzID0gYXJyYXlfdW5pcXVlKGRhdGEubm92ZWwudGFncyk7XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRyZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9oYW5kbGVEYXRhRm9yU3RyaW5naWZ5PFQgZXh0ZW5kcyBJTWRjb25mTWV0YT4oZGF0YSwgZDI/LCAuLi5hcmd2KTogVFxue1xuXHRkYXRhID0gX2hhbmRsZURhdGEoZGF0YSwgZDIsIC4uLmFyZ3YpO1xuXG5cdGlmIChkYXRhLm5vdmVsLnByZWZhY2UgJiYgdHlwZW9mIGRhdGEubm92ZWwucHJlZmFjZSA9PSAnc3RyaW5nJylcblx0e1xuXHRcdGRhdGEubm92ZWwucHJlZmFjZSA9IG5ldyBSYXdPYmplY3QoZGF0YS5ub3ZlbC5wcmVmYWNlLCB7fSk7XG5cdH1cblxuXHRpZiAoJ25vdmVsX3N0YXR1cycgaW4gZGF0YS5ub3ZlbClcblx0e1xuXHRcdGV4cGVjdChkYXRhLm5vdmVsLm5vdmVsX3N0YXR1cykuYSgnbnVtYmVyJyk7XG5cblx0XHRkYXRhLm5vdmVsLm5vdmVsX3N0YXR1cyA9IHRvSGV4KGRhdGEubm92ZWwubm92ZWxfc3RhdHVzLCA0KTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIGRhdGE7XG59XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uOiBzdHJpbmcgPSByZXF1aXJlKFwiLi9wYWNrYWdlLmpzb25cIikudmVyc2lvbjtcblxuZXhwb3J0IGNvbnN0IG1kY29uZl9wYXJzZSA9IHBhcnNlO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzIGFzIHR5cGVvZiBpbXBvcnQoJy4vaW5kZXgnKTtcbiJdfQ==