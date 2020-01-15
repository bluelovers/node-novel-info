"use strict";
/**
 * Created by user on 2018/2/3/003.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crlf_normalize_1 = require("crlf-normalize");
const const_1 = require("./lib/const");
const deepmerge_plus_1 = __importDefault(require("deepmerge-plus"));
const moment_1 = __importDefault(require("moment"));
const index_1 = require("./index");
const array_hyper_unique_1 = require("array-hyper-unique");
const util_1 = require("./lib/util");
var JsonMd;
(function (JsonMd) {
    function stringify(json_data, options = {}) {
        let data = {
            tags: [],
            contribute: [],
        };
        {
            data = deepmerge_plus_1.default.all([data, json_data, data, options], const_1.deepmergeOptions);
            data.data = data.data || {};
            if (json_data.novel_date) {
                data.novel_date = json_data.novel_date;
            }
        }
        if (options.tags) {
            data.tags = data.tags.concat(options.tags);
        }
        if (data.data.type) {
            data.tags = data.tags.concat(data.data.type);
        }
        data.tags.push('node-novel');
        if (options.contribute) {
            data.contribute = data.contribute.concat(options.contribute);
        }
        data.tags = array_hyper_unique_1.array_unique(data.tags);
        data.contribute = array_hyper_unique_1.array_unique(data.contribute);
        data.tags.sort();
        if (data.novel_date && typeof data.novel_date !== 'string') {
            if (moment_1.default.isMoment(data.novel_date) || data.novel_date.format) {
                data.novel_date = data.novel_date.format();
            }
            else if (data.novel_date.toJSON) {
                data.novel_date = data.novel_date.toJSON();
            }
            else if (data.novel_date._a) {
                data.novel_date = moment_1.default(data.novel_date._a).local().format();
            }
            else {
                data.novel_date = data.novel_date.toString();
            }
        }
        data = util_1.sortKeys(data);
        let md = `\n# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- publisher: ${data.novel_publisher || ''}
- cover: ${data.novel_cover || data.data.cover_pic || ''}
- date: ${data.novel_date || ''}
- status: ${data.novel_status || ''}
`;
        md += index_1.stringify(data.novel, 2, [
            'title',
            'author',
            'source',
            'publisher',
            'cover',
            'date',
            'status',
            'preface',
            'tags'
        ]);
        md += `\n## preface

\`\`\`
${(data.novel_desc || data.data.desc || '').replace(/\`/g, '\\`')}
\`\`\`

## tags

- ${data.tags.join("\n- ")}
`;
        md += `\n# contribute

- ${data.contribute.join("\n- ")}
`;
        if (data.options) {
            md += `\n# options\n`;
            md += index_1.stringify(data.options, 2);
        }
        return crlf_normalize_1.LF + md.replace(/^\n+|\s+$/g, '') + crlf_normalize_1.LF;
    }
    JsonMd.stringify = stringify;
    function toNovelInfo(initData, inputData, ...argv) {
        let ret;
        let data = deepmerge_plus_1.default.all([
            {},
            inputData || {},
            ...argv,
        ], const_1.deepmergeOptions);
        let ls = [
            {
                novel: {
                    tags: [],
                    series: {
                        name: '',
                    },
                },
                contribute: [],
                options: {},
            },
            initData || {},
            {
                novel: data.novel,
                contribute: data.contribute,
                options: data.options,
            },
            {
                novel: {
                    title: data.novel_title,
                    author: data.novel_author,
                    date: data.novel_date,
                    preface: data.novel_desc,
                    status: data.novel_status,
                    publisher: data.novel_publisher,
                    cover: data.novel_cover,
                    // @ts-ignore
                    source: data.url && data.url.href ? data.url.href : data.url,
                    tags: data.tags,
                    series: {
                        name: data.novel_series_title || '',
                    },
                },
            },
            {
                novel: {
                    source: data.url && (typeof data.url == 'string' ?
                        data.url
                        // @ts-ignore
                        : data.url.href),
                },
            },
            {
                novel: {
                    source: data.url_data && (typeof data.url_data.url == 'string' ? data.url_data.url : data.url_data.url.href),
                },
            },
        ];
        //console.log(data);
        if (data.data) {
            ls.push({
                novel: {
                    title: data.data.g_lnovel_name,
                    author: data.data.author,
                    cover: data.data.cover_pic,
                    tags: data.data.type,
                    preface: data.data.desc,
                    date: data.data.lastupdate,
                },
            });
        }
        ret = deepmerge_plus_1.default.all([
            ...ls,
            {
                novel: {
                    title: '',
                    author: '',
                    date: '',
                    preface: '',
                    status: '',
                    publisher: '',
                    cover: '',
                    source: '',
                },
            },
        ], Object.assign({
            keyValueOrMode: true,
        }, const_1.deepmergeOptions));
        util_1.chkInfo(ret);
        if (ret.novel.source) {
            [
                /(wenku8)/,
                /(dmzj)/,
                /(dmzj)/,
                /(novel18)?\.(syosetu)/,
                /(alphapolis)/,
            ].forEach(function (r) {
                let m;
                if (m = r.exec(ret.novel.source)) {
                    ret.novel.tags = ret.novel.tags.concat(m.slice(1));
                }
            });
        }
        ret = util_1.sortKeys(ret);
        ret.novel.tags.unshift('node-novel');
        ret.novel.tags = array_hyper_unique_1.array_unique(ret.novel.tags);
        return ret;
    }
    JsonMd.toNovelInfo = toNovelInfo;
})(JsonMd = exports.JsonMd || (exports.JsonMd = {}));
exports.default = JsonMd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7OztBQUVILG1EQUEwQztBQUMxQyx1Q0FBK0M7QUFDL0Msb0VBQXVDO0FBQ3ZDLG9EQUE0QjtBQUM1QixtQ0FBc0Q7QUFDdEQsMkRBQWtEO0FBQ2xELHFDQUErQztBQUcvQyxJQUFjLE1BQU0sQ0F1Um5CO0FBdlJELFdBQWMsTUFBTTtJQXVDbkIsU0FBZ0IsU0FBUyxDQUFDLFNBQVMsRUFBRSxVQUFrQyxFQUFFO1FBRXhFLElBQUksSUFBSSxHQUFHO1lBQ1YsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsRUFBRTtTQUNzQyxDQUFDO1FBRXREO1lBQ0MsSUFBSSxHQUFHLHdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBRTVCLElBQUksU0FBUyxDQUFDLFVBQVUsRUFDeEI7Z0JBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO2FBQ3ZDO1NBQ0Q7UUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQ2hCO1lBQ0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNsQjtZQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVks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Q0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQWpJZSxrQkFBVyxjQWlJMUIsQ0FBQTtBQUVGLENBQUMsRUF2UmEsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBdVJuQjtBQUVELGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvMi8zLzAwMy5cbiAqL1xuXG5pbXBvcnQgeyBjcmxmLCBMRiB9IGZyb20gJ2NybGYtbm9ybWFsaXplJztcbmltcG9ydCB7IGRlZXBtZXJnZU9wdGlvbnMgfSBmcm9tICcuL2xpYi9jb25zdCc7XG5pbXBvcnQgZGVlcG1lcmdlIGZyb20gJ2RlZXBtZXJnZS1wbHVzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IHN0cmluZ2lmeSBhcyBNZGNvbmZTdHJpbmdpZnl9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcbmltcG9ydCB7IHNvcnRLZXlzLCBjaGtJbmZvIH0gZnJvbSAnLi9saWIvdXRpbCc7XG5pbXBvcnQgeyBJT3B0aW9uc1BhcnNlLCBJTWRjb25mTWV0YSB9IGZyb20gJy4vbGliL3R5cGVzJztcblxuZXhwb3J0IG1vZHVsZSBKc29uTWRcbntcblx0ZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uc1xuXHR7XG5cdFx0dGFncz86IHN0cmluZ1tdLFxuXHRcdGNvbnRyaWJ1dGU/OiBzdHJpbmdbXSxcblx0fVxuXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUpzb25tZERhdGFfdjEgZXh0ZW5kcyBJT3B0aW9uc1xuXHR7XG5cdFx0ZGF0YT86IHtcblx0XHRcdGNvdmVyX3BpYz86IHN0cmluZyxcblx0XHRcdGRlc2M/OiBzdHJpbmcsXG5cdFx0XHRhdXRob3I/OiBzdHJpbmcsXG5cdFx0XHRnX2xub3ZlbF9uYW1lPzogc3RyaW5nXG5cdFx0XHR0eXBlPzogc3RyaW5nW10sXG5cdFx0XHRsYXN0dXBkYXRlPzogc3RyaW5nLFxuXHRcdH0sXG5cblx0XHRub3ZlbF9kYXRlPyxcblx0XHRub3ZlbF90aXRsZT86IHN0cmluZyxcblx0XHRub3ZlbF9hdXRob3I/OiBzdHJpbmcsXG5cdFx0dXJsPzogc3RyaW5nLFxuXHRcdG5vdmVsX3B1Ymxpc2hlcj86IHN0cmluZyxcblx0XHRub3ZlbF9jb3Zlcj86IHN0cmluZyxcblx0XHRub3ZlbF9zdGF0dXM/OiBzdHJpbmcsXG5cblx0XHRub3ZlbF9zZXJpZXNfdGl0bGU/OiBzdHJpbmcsXG5cblx0XHRub3ZlbF9kZXNjPzogc3RyaW5nLFxuXG5cdFx0W2tleTogc3RyaW5nXTogYW55LFxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeShqc29uX2RhdGE6IElKc29ubWREYXRhX3YxLCBvcHRpb25zPzogSU1kY29uZk1ldGEgJiBJT3B0aW9ucyk6IHN0cmluZ1xuXHRleHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KGpzb25fZGF0YTogSU1kY29uZk1ldGEsIG9wdGlvbnM/OiBJTWRjb25mTWV0YSAmIElPcHRpb25zKTogc3RyaW5nXG5cdGV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkoanNvbl9kYXRhOiBQYXJ0aWFsPElKc29ubWREYXRhX3YxICYgSU1kY29uZk1ldGEgJiBJT3B0aW9ucz4sXG5cdFx0b3B0aW9ucz86IElNZGNvbmZNZXRhICYgSU9wdGlvbnNcblx0KTogc3RyaW5nXG5cdGV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkoanNvbl9kYXRhLCBvcHRpb25zOiBJTWRjb25mTWV0YSAmIElPcHRpb25zID0ge30pOiBzdHJpbmdcblx0e1xuXHRcdGxldCBkYXRhID0ge1xuXHRcdFx0dGFnczogW10sXG5cdFx0XHRjb250cmlidXRlOiBbXSxcblx0XHR9IGFzIFBhcnRpYWw8SU1kY29uZk1ldGEgJiBJSnNvbm1kRGF0YV92MSAmIElPcHRpb25zPjtcblxuXHRcdHtcblx0XHRcdGRhdGEgPSBkZWVwbWVyZ2UuYWxsKFtkYXRhLCBqc29uX2RhdGEsIGRhdGEsIG9wdGlvbnNdLCBkZWVwbWVyZ2VPcHRpb25zKTtcblx0XHRcdGRhdGEuZGF0YSA9IGRhdGEuZGF0YSB8fCB7fTtcblxuXHRcdFx0aWYgKGpzb25fZGF0YS5ub3ZlbF9kYXRlKVxuXHRcdFx0e1xuXHRcdFx0XHRkYXRhLm5vdmVsX2RhdGUgPSBqc29uX2RhdGEubm92ZWxfZGF0ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy50YWdzKVxuXHRcdHtcblx0XHRcdGRhdGEudGFncyA9IGRhdGEudGFncy5jb25jYXQob3B0aW9ucy50YWdzKTtcblx0XHR9XG5cdFx0aWYgKGRhdGEuZGF0YS50eXBlKVxuXHRcdHtcblx0XHRcdGRhdGEudGFncyA9IGRhdGEudGFncy5jb25jYXQoZGF0YS5kYXRhLnR5cGUpO1xuXHRcdH1cblxuXHRcdGRhdGEudGFncy5wdXNoKCdub2RlLW5vdmVsJyk7XG5cblx0XHRpZiAob3B0aW9ucy5jb250cmlidXRlKVxuXHRcdHtcblx0XHRcdGRhdGEuY29udHJpYnV0ZSA9IGRhdGEuY29udHJpYnV0ZS5jb25jYXQob3B0aW9ucy5jb250cmlidXRlKTtcblx0XHR9XG5cblx0XHRkYXRhLnRhZ3MgPSBhcnJheV91bmlxdWUoZGF0YS50YWdzKTtcblx0XHRkYXRhLmNvbnRyaWJ1dGUgPSBhcnJheV91bmlxdWUoZGF0YS5jb250cmlidXRlKTtcblxuXHRcdGRhdGEudGFncy5zb3J0KCk7XG5cblx0XHRpZiAoZGF0YS5ub3ZlbF9kYXRlICYmIHR5cGVvZiBkYXRhLm5vdmVsX2RhdGUgIT09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdGlmIChtb21lbnQuaXNNb21lbnQoZGF0YS5ub3ZlbF9kYXRlKSB8fCBkYXRhLm5vdmVsX2RhdGUuZm9ybWF0KVxuXHRcdFx0e1xuXHRcdFx0XHRkYXRhLm5vdmVsX2RhdGUgPSBkYXRhLm5vdmVsX2RhdGUuZm9ybWF0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChkYXRhLm5vdmVsX2RhdGUudG9KU09OKVxuXHRcdFx0e1xuXHRcdFx0XHRkYXRhLm5vdmVsX2RhdGUgPSBkYXRhLm5vdmVsX2RhdGUudG9KU09OKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChkYXRhLm5vdmVsX2RhdGUuX2EpXG5cdFx0XHR7XG5cdFx0XHRcdGRhdGEubm92ZWxfZGF0ZSA9IG1vbWVudChkYXRhLm5vdmVsX2RhdGUuX2EpLmxvY2FsKCkuZm9ybWF0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGRhdGEubm92ZWxfZGF0ZSA9IGRhdGEubm92ZWxfZGF0ZS50b1N0cmluZygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRhdGEgPSBzb3J0S2V5cyhkYXRhKTtcblxuXHRcdGxldCBtZCA9IGBcXG4jIG5vdmVsXG5cbi0gdGl0bGU6ICR7ZGF0YS5ub3ZlbF90aXRsZSB8fCBkYXRhLmRhdGEuZ19sbm92ZWxfbmFtZX1cbi0gYXV0aG9yOiAke2RhdGEubm92ZWxfYXV0aG9yIHx8IGRhdGEuZGF0YS5hdXRob3J9XG4tIHNvdXJjZTogJHtkYXRhLnVybCB8fCAnJ31cbi0gcHVibGlzaGVyOiAke2RhdGEubm92ZWxfcHVibGlzaGVyIHx8ICcnfVxuLSBjb3ZlcjogJHtkYXRhLm5vdmVsX2NvdmVyIHx8IGRhdGEuZGF0YS5jb3Zlcl9waWMgfHwgJyd9XG4tIGRhdGU6ICR7ZGF0YS5ub3ZlbF9kYXRlIHx8ICcnfVxuLSBzdGF0dXM6ICR7ZGF0YS5ub3ZlbF9zdGF0dXMgfHwgJyd9XG5gO1xuXG5cdFx0bWQgKz0gTWRjb25mU3RyaW5naWZ5KGRhdGEubm92ZWwsIDIsIFtcblx0XHRcdCd0aXRsZScsXG5cdFx0XHQnYXV0aG9yJyxcblx0XHRcdCdzb3VyY2UnLFxuXHRcdFx0J3B1Ymxpc2hlcicsXG5cdFx0XHQnY292ZXInLFxuXHRcdFx0J2RhdGUnLFxuXHRcdFx0J3N0YXR1cycsXG5cdFx0XHQncHJlZmFjZScsXG5cdFx0XHQndGFncydcblx0XHRdKTtcblxuXHRcdG1kICs9IGBcXG4jIyBwcmVmYWNlXG5cblxcYFxcYFxcYFxuJHsoZGF0YS5ub3ZlbF9kZXNjIHx8IGRhdGEuZGF0YS5kZXNjIHx8ICcnKS5yZXBsYWNlKC9cXGAvZywgJ1xcXFxgJyl9XG5cXGBcXGBcXGBcblxuIyMgdGFnc1xuXG4tICR7ZGF0YS50YWdzLmpvaW4oXCJcXG4tIFwiKX1cbmA7XG5cblx0XHRtZCArPSBgXFxuIyBjb250cmlidXRlXG5cbi0gJHtkYXRhLmNvbnRyaWJ1dGUuam9pbihcIlxcbi0gXCIpfVxuYDtcblxuXHRcdGlmIChkYXRhLm9wdGlvbnMpXG5cdFx0e1xuXHRcdFx0bWQgKz0gYFxcbiMgb3B0aW9uc1xcbmA7XG5cblx0XHRcdG1kICs9IE1kY29uZlN0cmluZ2lmeShkYXRhLm9wdGlvbnMsIDIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBMRiArIG1kLnJlcGxhY2UoL15cXG4rfFxccyskL2csICcnKSArIExGO1xuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHRvTm92ZWxJbmZvKGluaXREYXRhOiBQYXJ0aWFsPElNZGNvbmZNZXRhPiwgaW5wdXREYXRhOiBQYXJ0aWFsPElKc29ubWREYXRhX3YxICYgSU1kY29uZk1ldGEgJiBJT3B0aW9ucz4sIC4uLmFyZ3Y6IFBhcnRpYWw8SUpzb25tZERhdGFfdjEgJiBJTWRjb25mTWV0YSAmIElPcHRpb25zPltdKTogSU1kY29uZk1ldGFcblx0e1xuXHRcdGxldCByZXQ6IElNZGNvbmZNZXRhO1xuXG5cdFx0bGV0IGRhdGEgPSBkZWVwbWVyZ2UuYWxsKFtcblx0XHRcdHt9LFxuXHRcdFx0aW5wdXREYXRhIHx8IHt9LFxuXHRcdFx0Li4uYXJndixcblx0XHRdLCBkZWVwbWVyZ2VPcHRpb25zKTtcblxuXHRcdGxldCBsczogUGFydGlhbDxJSnNvbm1kRGF0YV92MSAmIElNZGNvbmZNZXRhICYgSU9wdGlvbnM+W10gPSBbXG5cdFx0XHR7XG5cdFx0XHRcdG5vdmVsOiB7XG5cdFx0XHRcdFx0dGFnczogW10sXG5cdFx0XHRcdFx0c2VyaWVzOiB7XG5cdFx0XHRcdFx0XHRuYW1lOiAnJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb250cmlidXRlOiBbXSxcblx0XHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHR9LFxuXHRcdFx0aW5pdERhdGEgfHwge30sXG5cdFx0XHR7XG5cdFx0XHRcdG5vdmVsOiBkYXRhLm5vdmVsLFxuXHRcdFx0XHRjb250cmlidXRlOiBkYXRhLmNvbnRyaWJ1dGUsXG5cdFx0XHRcdG9wdGlvbnM6IGRhdGEub3B0aW9ucyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5vdmVsOiB7XG5cdFx0XHRcdFx0dGl0bGU6IGRhdGEubm92ZWxfdGl0bGUsXG5cdFx0XHRcdFx0YXV0aG9yOiBkYXRhLm5vdmVsX2F1dGhvcixcblx0XHRcdFx0XHRkYXRlOiBkYXRhLm5vdmVsX2RhdGUsXG5cdFx0XHRcdFx0cHJlZmFjZTogZGF0YS5ub3ZlbF9kZXNjLFxuXHRcdFx0XHRcdHN0YXR1czogZGF0YS5ub3ZlbF9zdGF0dXMsXG5cdFx0XHRcdFx0cHVibGlzaGVyOiBkYXRhLm5vdmVsX3B1Ymxpc2hlcixcblx0XHRcdFx0XHRjb3ZlcjogZGF0YS5ub3ZlbF9jb3Zlcixcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0c291cmNlOiBkYXRhLnVybCAmJiBkYXRhLnVybC5ocmVmID8gZGF0YS51cmwuaHJlZiA6IGRhdGEudXJsLFxuXG5cdFx0XHRcdFx0dGFnczogZGF0YS50YWdzLFxuXG5cdFx0XHRcdFx0c2VyaWVzOiB7XG5cdFx0XHRcdFx0XHRuYW1lOiBkYXRhLm5vdmVsX3Nlcmllc190aXRsZSB8fCAnJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bm92ZWw6IHtcblx0XHRcdFx0XHRzb3VyY2U6IGRhdGEudXJsICYmICh0eXBlb2YgZGF0YS51cmwgPT0gJ3N0cmluZycgP1xuXHRcdFx0XHRcdFx0ZGF0YS51cmxcblx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdDogZGF0YS51cmwuaHJlZlxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRub3ZlbDoge1xuXHRcdFx0XHRcdHNvdXJjZTogZGF0YS51cmxfZGF0YSAmJiAodHlwZW9mIGRhdGEudXJsX2RhdGEudXJsID09ICdzdHJpbmcnID8gZGF0YS51cmxfZGF0YS51cmwgOiBkYXRhLnVybF9kYXRhLnVybC5ocmVmKSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XTtcblxuXHRcdC8vY29uc29sZS5sb2coZGF0YSk7XG5cblx0XHRpZiAoZGF0YS5kYXRhKVxuXHRcdHtcblx0XHRcdGxzLnB1c2goe1xuXHRcdFx0XHRub3ZlbDoge1xuXHRcdFx0XHRcdHRpdGxlOiBkYXRhLmRhdGEuZ19sbm92ZWxfbmFtZSxcblx0XHRcdFx0XHRhdXRob3I6IGRhdGEuZGF0YS5hdXRob3IsXG5cdFx0XHRcdFx0Y292ZXI6IGRhdGEuZGF0YS5jb3Zlcl9waWMsXG5cblx0XHRcdFx0XHR0YWdzOiBkYXRhLmRhdGEudHlwZSxcblxuXHRcdFx0XHRcdHByZWZhY2U6IGRhdGEuZGF0YS5kZXNjLFxuXG5cdFx0XHRcdFx0ZGF0ZTogZGF0YS5kYXRhLmxhc3R1cGRhdGUsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXQgPSBkZWVwbWVyZ2UuYWxsKFtcblx0XHRcdC4uLmxzLFxuXHRcdFx0e1xuXHRcdFx0XHRub3ZlbDoge1xuXHRcdFx0XHRcdHRpdGxlOiAnJyxcblx0XHRcdFx0XHRhdXRob3I6ICcnLFxuXHRcdFx0XHRcdGRhdGU6ICcnLFxuXHRcdFx0XHRcdHByZWZhY2U6ICcnLFxuXHRcdFx0XHRcdHN0YXR1czogJycsXG5cdFx0XHRcdFx0cHVibGlzaGVyOiAnJyxcblx0XHRcdFx0XHRjb3ZlcjogJycsXG5cdFx0XHRcdFx0c291cmNlOiAnJyxcblxuXHRcdFx0XHRcdC8vdGFnczogW10sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vY29udHJpYnV0ZTogW10sXG5cdFx0XHRcdC8vb3B0aW9uczoge30sXG5cdFx0XHR9LFxuXHRcdF0sIE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0a2V5VmFsdWVPck1vZGU6IHRydWUsXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0fSwgZGVlcG1lcmdlT3B0aW9ucykgYXMgZGVlcG1lcmdlLk9wdGlvbnMpO1xuXG5cdFx0Y2hrSW5mbyhyZXQpO1xuXG5cdFx0aWYgKHJldC5ub3ZlbC5zb3VyY2UpXG5cdFx0e1xuXHRcdFx0W1xuXHRcdFx0XHQvKHdlbmt1OCkvLFxuXHRcdFx0XHQvKGRtemopLyxcblx0XHRcdFx0LyhkbXpqKS8sXG5cdFx0XHRcdC8obm92ZWwxOCk/XFwuKHN5b3NldHUpLyxcblx0XHRcdFx0LyhhbHBoYXBvbGlzKS8sXG5cdFx0XHRdLmZvckVhY2goZnVuY3Rpb24gKHIpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBtO1xuXHRcdFx0XHRpZiAobSA9IHIuZXhlYyhyZXQubm92ZWwuc291cmNlKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldC5ub3ZlbC50YWdzID0gcmV0Lm5vdmVsLnRhZ3MuY29uY2F0KG0uc2xpY2UoMSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXQgPSBzb3J0S2V5cyhyZXQpO1xuXHRcdHJldC5ub3ZlbC50YWdzLnVuc2hpZnQoJ25vZGUtbm92ZWwnKTtcblx0XHRyZXQubm92ZWwudGFncyA9IGFycmF5X3VuaXF1ZShyZXQubm92ZWwudGFncyk7XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSnNvbk1kO1xuIl19